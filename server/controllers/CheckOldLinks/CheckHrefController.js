const puppeteer = require("puppeteer");
const { models} = require('../models');

exports.checkHref = async (req, res) => {
 // Define an array of collection names or database connections
 const collections = [
    { name: "CTModel", model: models.CT },
    { name: "H4Model", model: models.H4 },
    { name: "CanModel", model: models.Can },
    { name: "THModel", model: models.TH },
    { name: "TPlusModel", model: models.TPlus },
    { name: "FAOModel", model: models.FAO },
    { name: "FPModel", model: models.FP },
    { name: "SCModel", model: models.SC },
    { name: "TWModel", model: models.TW },
    { name: "VEModel", model: models.VE }
  ];
  

  // Create an object to store results for each collection
  const results = {};

  // Function to extract href and text from anchor elements
  async function extractLinks(page) {
    return await page.$$eval('a', (links) =>
      links.map((link) => ({
        href: link.getAttribute('href'),
        text: link.textContent.trim(),
        rel: link.getAttribute('rel'),
      }))
    );
  }

  for (const collection of collections) {
    console.log("start")
    const topEntries = await collection.model.find({});

    const collectionResults = [];

    for (let entry of topEntries) {
     if(entry.PublishedLink){
      const websiteLink = entry.PublishedLink;
      const hrefToCheck = entry.LTE;
      const anchorText = entry.AnchorText;
      const DF = entry.DF;
      let anchorTextGot = '';
      let relStatus = 'no change in rel';
      let anchorStatus = 'no change in anchor';
      let status = entry.Status;
      let docId = `${collection.name}_${entry._id}`;

      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();

      try {
        const response = await page.goto(websiteLink);

        if (response && response.status() !== 200) {
          status = `${response.status()} server issue`;
          collectionResults.push(`Status changed for ${websiteLink} - ${status}`);
          await collection.model.findByIdAndUpdate(entry._id, { Status: status });
        
          // Check if the document was previously saved
          const isDocSaved = await models.SavedDocuments.exists({ docId });  
          console.log(!isDocSaved)
          if (!isDocSaved) {
            console.log("here")
            const doc = {
              websiteName: collection.name,
              rowID: entry._id,
              status: status,
              PublishedLink: entry.PublishedLink
            };
            try {
              const savedDoc = await models.checkLinks.create(doc);
              console.log(`Saved document with _id: ${savedDoc._id}`);
        
              // Add the docId to the SavedDocuments collection to mark it as saved
              await models.SavedDocuments.create({ docId });
            } catch (error) {
              console.error(error);
              // Handle the error here
            }
          }
        }

         else {
          // Extract all href attributes and anchor text from anchor elements on the page
          const links = await extractLinks(page);

          // Check if the hrefToCheck is present among the extracted hrefs
          links.some((link) => {
            if (link.href !== null) {
              const normalizedHrefToCheck = hrefToCheck.toLowerCase().trim().replace(/\/$/, '');
              const normalizedHref = link.href.toLowerCase().trim().replace(/\/$/, '');

              if (normalizedHref === normalizedHrefToCheck) {
                anchorTextGot = link.text;

                // Check the rel attribute and DF value
                if (DF === 'YES' && link.rel && link.rel.includes('nofollow')) {
                  relStatus = 'link changed to nofollow';
                } else if (DF === 'NO' && link.rel && link.rel.includes('nofollow')) {
                  relStatus = 'no change in rel';
                }

                // Check for a change in anchor text
                if (anchorText !== anchorTextGot) {
                  anchorStatus = `change in anchor from ${anchorText} to ${anchorTextGot}`;
                  console.log(anchorStatus)
                }
              } else {
                status = "link not present";
              }
            }
          });

              // Combine the status of rel and anchor text
              status = `${relStatus} and ${anchorStatus}`;
              console.log(status)
              if (status !== 'no change in rel and no change in anchor') {
                const isDocSaved = await models.SavedDocuments.exists({ docId });
              
                if (!isDocSaved) {
                  collectionResults.push(`Status changed for ${websiteLink} - ${status}`);
                  await collection.model.findByIdAndUpdate(entry._id, { Status: status });
              
                  // Create a document for the changed row
                  const doc = {
                    websiteName: collection.name,
                    rowID: entry._id,
                    status: status,
                    anchorText: anchorText,
                    newAnchor: anchorTextGot,
                    PublishedLink: entry.PublishedLink
                  };
              
                  try {
                    const savedDoc = await models.checkLinks.create(doc);
                    console.log(`Saved document with _id: ${savedDoc._id}`);
              
                    // Add the docId to the SavedDocuments collection to mark it as saved
                    await models.SavedDocuments.create({ docId });
                  } catch (error) {
                    console.error(error);
                    // Handle the error here
                  }
                }
          }
        }
      } catch (error) {
        console.error(error);
        status = `${error.message} server issue`;
        console.log(`Status changed for ${websiteLink} - ${status}`);
        await collection.model.findByIdAndUpdate(entry._id, { Status: status });
      } finally {
        await browser.close();
      }
     }
    }

    // Store the results for this collection in the results object
    results[collection.name] = collectionResults;
  }
  console.log("completed")
  res.json(results);
};
