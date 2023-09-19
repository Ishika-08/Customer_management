const mongoose = require("mongoose")

const DataSchema = new mongoose.Schema({
    Website: String,
    Email: String
})

const DataModel = mongoose.model("database", DataSchema)

module.exports = DataModel