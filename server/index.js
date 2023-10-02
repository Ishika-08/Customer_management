const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const ContentsModel = require("./models/Content/Contents")
const ExtraContentsModel = require("./models/Content/ExtraContent")
const DataModel = require("./models/Database")
const TrackModel = require("./models/Track")
const AccountsSchema = require("./models/Accounts")
const CheckLinksModel = require("./models/checkLinks")
const {CTModel,H4Model,CanModel,THModel, TPlusModel,FAOModel, FPModel, SCModel, TWModel, VEModel} = require("./models/Website/CT");
const connectToDatabase = require('./config/db');
const databaseRouter = require('./routes/GP/DatabaseRoutes');
const websiteRouter = require('./routes/GP/WebsiteRoutes');
const contentRouter = require('./routes/GP/ContentRoutes');
const trackRouter = require('./routes/Pitch/TrackRouter');

const app = express()
app.use(express.json())
app.use(cors())

connectToDatabase()

//for GP
app.use('/database', databaseRouter);
app.use('/website', websiteRouter);
app.use('/content', contentRouter);


//for Pitch
app.use('/track', trackRouter);


const models = {
    Accounts: AccountsSchema,
    checkLinks: CheckLinksModel,
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

// //to find all the faulty links 
// app.get('/get-links', async (req, res) => {
//   try {
//     // Find all entries in the CheckLinksModel
//     const checkLinksEntries = await CheckLinksModel.find();

//     // Initialize an object to store data for each website
//     const websiteData = {};

//     // Loop through the entries in CheckLinksModel
//     for (const entry of checkLinksEntries) {
//       const { websiteName, rowID, newAnchor, _id } = entry;

//       // Determine the appropriate website model based on websiteName
//       let websiteModel;
//       switch (websiteName) {
//         case 'CTModel':
//           websiteModel = CTModel;
//           break;
//         case 'H4Model':
//           websiteModel = H4Model;
//           break;
//         case 'CanModel':
//           websiteModel = CanModel;
//           break;
//         case 'THModel':
//           websiteModel = THModel;
//           break;
//         case 'TPlusModel':
//           websiteModel = TPlusModel;
//           break;
//         case 'FAOModel':
//           websiteModel = FAOModel;
//           break;
//         case 'FPModel':
//           websiteModel = FPModel;
//           break;
//         case 'SCModel':
//           websiteModel = SCModel;
//           break;
//         case 'TWModel':
//           websiteModel = TWModel;
//           break;
//         case 'VEModel':
//           websiteModel = VEModel;
//           break;
//         default:
//           // Handle unknown name here
//           break;
//       }

//       // Find the corresponding row in the website model using rowID
//       const websiteRow = await websiteModel.findById(rowID);

//       // Create an object with the necessary data
//       const rowData = {
//         _id,
//         newAnchor,
//         websiteRow
//       };

//       // Add the rowData to the websiteData object
//       if (!websiteData[websiteName]) {
//         websiteData[websiteName] = [];
//       }
//       websiteData[websiteName].push(rowData);
//     }

//     // Send the websiteData object as a response
//     res.json(websiteData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

app.get('/add-website/:websiteName', (req, res) => {
  console.log("here")
  const { websiteName } = req.params;
  console.log(websiteName)

  // Check if the websiteName parameter matches an existing model name
  if (website[websiteName]) {
    res.status(400).json({ error: `Website "${websiteName}" already exists` });
  } else {
    // Create a new model based on the TableSchema from website.js
    const NewWebsiteModel = mongoose.model(websiteName, CTModel.schema, websiteName);

    // Add the new website to the website object
    website[websiteName] = NewWebsiteModel;

    res.status(201).json({ message: `New website "${websiteName}" added successfully` });
  }
});

 
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`)
})