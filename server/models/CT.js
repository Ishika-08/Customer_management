const mongoose = require("mongoose")

const CTSchema = new mongoose.Schema({
    AnchorText: String,
    Contacted: String,
    DA: String,
    DF: String,
    EmailID: String,
    LTE: String,
    Mailbox: String,
    PublishedLink: String,
    SS: String,
    Status: String,
    Topic: String,
    Website: String
})

const CTModel = mongoose.model("CT", CTSchema)
module.exports = CTModel