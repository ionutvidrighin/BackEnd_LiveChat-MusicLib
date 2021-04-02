var mongoose = require('mongoose');


var ProfileSchema = mongoose.Schema({
    id: String,
    imageURL: String
});

module.exports = mongoose.model('profile', ProfileSchema);
