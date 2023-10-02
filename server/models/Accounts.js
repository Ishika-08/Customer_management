const mongoose = require('mongoose');

const AccountsSchema = new mongoose.Schema({
    SiteName: String,
    Email: String,
    Username: String,
    Password: String,
    DF: String,
    DR: String,
    Note: String
},
{
    collection: "Accounts"
});

const AccountsModel = mongoose.model('Accounts', AccountsSchema);

module.exports = AccountsModel;
