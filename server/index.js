const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const ContentsModel = require("./models/Content/Contents")
const ExtraContentsModel = require("./models/Content/ExtraContent")
const DataModel = require("./models/Database")
const TrackModel = require("./models/Track")
const {CTModel,H4Model,CanModel,THModel, TPlusModel,FAOModel, FPModel, SCModel, TWModel, VEModel} = require("./models/Website/CT");

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/TechWhoop")

const models = {
    Track: TrackModel, 
    Contents: ContentsModel,
    ExtraContents: ExtraContentsModel,
    Database: DataModel,
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

//to search for an email in contents table
app.get("/search/:searchEmail/", (req,res)=>{
   const email = req.params.searchEmail
    ContentsModel.find({Email: email})
   .then(content => {res.json(content)})
   .catch(err => res.json(err))
})

//to get the name of all the websites(website sheets) present in GP
app.get("/websites", (req, res) => {
  const websiteNames = Object.keys(website);
  
  if (websiteNames.length > 0) {
    res.json({ websiteNames });
  } else {
    res.status(404).json({ error: "No websites found" });
  }
});

app.get("/models", (req, res) => {
  const modelNames = Object.keys(models);
  
  if (modelNames.length > 0) {
    res.json({ modelNames });
  } else {
    res.status(404).json({ error: "No websites found" });
  }
});


//to search for email in Database table
app.get("/database/:email", (req,res)=>{
  const email = req.params.email
  DataModel.find({Email: email})
  .then(result => res.json(result))
  .catch(err => console.log(err))
})



//to search for domain name in all the website tables
app.get("/findWebsite/:domain", (req, res) => {
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
});




    
//to add data to the mentioned table
app.post("/Add/:table", (req, res) => {
        const { table } = req.params;
      
        if (models[table]) {
          const Model = models[table];
          Model.create(req.body)
            .then((contents) => {
              res.json(contents)})
            .catch((err) => res.json(err));
        } else {
          res.status(404).json({ error: "Table not found" });
        }
});
      
//to get data from contents table
app.get("/update/:id", (req,res)=>{
  const {id} = req.params
  ContentsModel.findById({_id : id})
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

//to update data in contents table
app.put("/update/:id", (req,res)=>{
  const id = req.params.id
  const data = req.body
  ContentsModel.findByIdAndUpdate(
      {_id: id}, 
      data)
      .then((result)=>{
        console.log(result)
      res.status(200).json({ message: 'Items updated successfully'})}
      )  .catch(err=> res.json(err))
})


app.delete('/delete/:tableName', (req, res) => {
  const { tableName } = req.params;
  const { ids } = req.body;
  console.log(tableName)

  // Use tableName to determine which table to delete from
  if (tableName === 'Contents') {
    ContentsModel.deleteMany({ _id: { $in: ids } })
     .then(()=>
      res.status(200).json({ message: 'Items deleted successfully'})
      )
     .catch(err => res.json(err))
  }
  else if (tableName === 'ExtraContents') {
    ExtraContentsModel.deleteOne({_id: ids})
     .then(()=>
      res.status(200).json({ message: 'Items deleted successfully'})
      )
     .catch(err => res.json(err))
  } else {
    res.status(400).json({ error: 'Invalid table name' });
  }
})


//to find all the topics for a site mentioned in ExtraContents table
app.get("/GP/Topics/:site", (req,res)=>{
  const {site} = req.params
  console.log(site)
  ExtraContentsModel.find({Site: site})
  .then(result => {
    console.log(result)
    res.json(result)})
  .catch(err => res.json(err))
})


//working with track table
app.get('/copyEmails/:fieldName', (req, res) => {
  const { fieldName } = req.params; 
  const constantValue = "YES";
  const modificationTime = new Date();
  const fifteenDaysAgo = new Date(modificationTime.getTime() - 15 * 24 * 60 * 60 * 1000);

  //find rows where modifiedAt is 15 days ago or more and fieldName is not equal to constantValue
const query = {
  $or: [
    { modifiedAt: { $exists: false } }, 
    { modifiedAt: { $lte: fifteenDaysAgo } },
  ],
  [fieldName]: { $ne: constantValue },
};


  let emailArray; 

  // Find documents that match the query
  TrackModel.find(query)
    .limit(48) 
    .then(docs => {
      console.log(docs)
      const emailSet = new Set(); 
      const emailIdMap = new Map(); 

      docs.forEach(obj => {
        if (obj.Email) {
          // Split multiple emails by a delimiter (e.g., comma or semicolon)
          const emails = obj.Email.split(/[;,]/);

          // Trim and add each email to the Set and associate it with _id
          emails.forEach(email => {
            const trimmedEmail = email.trim();
            if (trimmedEmail) {
              emailSet.add(trimmedEmail);
              // Store the _id associated with the email in the Map
              emailIdMap.set(trimmedEmail, obj._id.toString());
            }
          });
        }
      });

      // Convert the Set back to an array
      emailArray = Array.from(emailSet);

      // Update the rows with the selected _id values to set fieldName to "YES" and modifiedAt to the current time
      const updatePromises = emailArray.map(email =>
        TrackModel.updateOne(
          { _id: emailIdMap.get(email) }, // Update based on _id
          { $set: { [fieldName]: constantValue, modifiedAt: modificationTime } }
        )
      );

      return Promise.all(updatePromises);
    })
    .then(() => {
      res.json({ eArray: emailArray.slice(0, 48) }); // Limit the response to 48 emails
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


//to delete any entries with email set to form in track sheet
app.get('/', (req, res) => {
  // Define the query to find rows where Email matches 'form' case-insensitively
  const query = {
    Email: { $regex: /form/i },
  };

  // Delete rows that match the query
  TrackModel.deleteMany(query)
    .then(result => {
      // Check the result to see how many documents were deleted
      const { deletedCount } = result;
      res.json({ message: `${deletedCount} documents deleted successfully.` });
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


 
app.listen(3000, ()=>{
    console.log("Server started at port 3000")
})