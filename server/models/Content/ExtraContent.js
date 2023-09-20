const mongoose = require("mongoose")

const DraftSchema = new mongoose.Schema({
    Mailboxes: String,
    DocsURL: String,
    Title: String,
    Email: String,
    Status: String,
    Site: String,
    DF : String,
    Requirements: String
},
{
    collection: "ExtraContents"
})

const DraftModel = mongoose.model("ExtraContents", DraftSchema)
module.exports = DraftModel