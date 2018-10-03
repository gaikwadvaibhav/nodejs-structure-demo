var mongoose = require("mongoose");

var user = mongoose.Schema({
    name: String,
    email : String,
    password: String,
    contact : Number
});

module.exports = mongoose.model('User', user);