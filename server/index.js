const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const ContentsModel = require("./models/Content/Contents")
const ExtraContentsModel = require("./models/Content/ExtraContent")
const DataModel = require("./models/Database")
const {CTModel,H4Model,CanModel,THModel, TPlusModel,FAOModel, FPModel, SCModel, TWModel, VEModel} = require("./models/Website/CT");

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/TechWhoop")

const models = {
    Contents: ContentsModel,
    ExtraContents: ExtraContentsModel,
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

app.get("/search/:searchEmail/", (req,res)=>{
   const email = req.params.searchEmail
    ContentsModel.find({Email: email})
   .then(content => {res.json(content)})
   .catch(err => res.json(err))
})

    
      
app.post("/Add/:table", (req, res) => {
        const { table } = req.params;
        console.log(table)
      
        if (models[table]) {
          const Model = models[table];
          Model.create(req.body)
            .then((contents) => res.json(contents))
            .catch((err) => res.json(err));
        } else {
          res.status(404).json({ error: "Table not found" });
        }
});
      

app.get("/update/:id", (req,res)=>{
  const {id} = req.params
  ContentsModel.findById({_id : id})
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.put("/update/:id", (req,res)=>{
  const id = req.params.id
  const data = req.body
  ContentsModel.findByIdAndUpdate(
      {_id: id}, 
      data)
      .then(()=>
      res.status(200).json({ message: 'Items updated successfully'})
      )  .catch(err=> res.json(err))
})

app.delete('/delete', (req, res) => {
  const { ids } = req.body;

 ContentsModel.deleteMany({ _id: { $in: ids } })
 .then(()=>
  res.status(200).json({ message: 'Items deleted successfully'})
  )
 .catch(err => res.json(err))
});

app.get("/GP/Topics/:site", (req,res)=>{
  const {site} = req.params
  console.log(site)
  ExtraContentsModel.find({Site: site})
  .then(result => {
    console.log(result)
    res.json(result)})
  .catch(err => res.json(err))
})

 
app.listen(3000, ()=>{
    console.log("Server started at port 3000")
})