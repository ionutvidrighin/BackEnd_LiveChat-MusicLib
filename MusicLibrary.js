var mongoose = require('mongoose');

var MusicLibrary = mongoose.Schema({
    name: String,
    url: String
});

module.exports = mongoose.model('musiclibrary', MusicLibrary);
