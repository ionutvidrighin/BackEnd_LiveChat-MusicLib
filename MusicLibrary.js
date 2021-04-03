var mongoose = require('mongoose');

var MusicLibrary = mongoose.Schema({
    img: String,
    name: String,
    url: String
});

module.exports = mongoose.model('musiclibrary', MusicLibrary);
