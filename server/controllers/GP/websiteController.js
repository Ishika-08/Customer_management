const {CTModel,H4Model,CanModel,THModel, TPlusModel,FAOModel, FPModel, SCModel, TWModel, VEModel} = require("../../models/Website/CT");
const ExtraContentsModel = require("../../models/Content/ExtraContent")

const website = {
    CT: CTModel,
    H4: H4Model,
    Can: CanModel,
    TH: THModel,
    TPlus: TPlusModel,
    FAO: FAOModel,
    FP: FPModel,
    SC: SCModel,
    TW: TWModel,
    VE: VEModel
  };

// Search for a domain name in all website tables
exports.findWebsiteByDomain = (req, res) => {
  const { domain } = req.params;
  const foundWebsites = [];

  // Create an array of Promises to search for the domain in all website tables
  const searchPromises = Object.entries(website).map(([websiteName, model]) => {
    return model.find({ PublishedLink: { $regex: `.*${domain}.*` } })
      .then((results) => {
        if (results.length > 0) {
          console.log(results)
          foundWebsites.push(websiteName);
        }
      });
  });

  // Execute all Promises and handle the results
  Promise.all(searchPromises)
    .then(() => {
      if (foundWebsites.length > 0) {
        res.json({ websitesFound: foundWebsites });
      } else {
        res.status(404).json({ error: "No matching websites found" });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

//to get topics for a website from ExtraContents table
exports.getTopics = (req,res) =>{
  const {site} = req.params
    ExtraContentsModel.find({Site: site})
    .then(result => {
      res.json(result)})
    .catch(err => res.json(err))
}

