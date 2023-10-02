const DataModel = require('../../models/Database');

// Search for email in the Database table
exports.searchEmail = (req, res) => {
  const { email } = req.params;
  const caseInsensitiveEmail = new RegExp(email, 'i');
  DataModel.find({ Email: caseInsensitiveEmail })
    .then(result => res.json(result))
    .catch(err => res.json(err));
};

// Define other database-related controller functions here
// //to search for email in Database table
// app.get("/database/:email", (req,res)=>{
//   const email = req.params.email
//   const caseInsensitiveEmail = new RegExp(email, "i");
//   DataModel.find({Email: caseInsensitiveEmail})
//   .then(result => res.json(result))
//   .catch(err => console.log(err))
// })