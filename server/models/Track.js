const mongoose = require("mongoose")

const TrackSchema = new mongoose.Schema({
    SS: String,
    DA: String,
    Website: String,
    Email: String,
    "4H": String,
    TW: String,
    TH: String,
    "T+": String,	
    CT:String,
    VE: String,	
    FAO: String,
    WT: String,
    SC: String,
    modifiedAt: Date
},
{
    collection: "Track"
})

const TrackModel = mongoose.model("Track",TrackSchema)
module.exports = TrackModel