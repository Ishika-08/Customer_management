const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const ContentsModel = require("./models/Contents")
const DataModel = require("./models/Database")
const CTModel = require("./models/CT")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/TechWhoop")

app.get("/search/:searchEmail/", (req,res)=>{
   const email = req.params.searchEmail
    ContentsModel.find({Email: email})
   .then(content => {res.json(content)})
   .catch(err => res.json(err))
})

app.post("/Add", (req,res)=>{
    ContentsModel.create(req.body)
    .then(contents => res.json(contents))
    .catch(err => res.json(err))
})


app.get("/", (req,res)=>{
    ContentsModel.find({ })
    .then(result => {res.json(result)
   })
    .catch(err => console.log(err))
})
 
app.listen(3000, ()=>{
    console.log("Server started at port 3000")
})