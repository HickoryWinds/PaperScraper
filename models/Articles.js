//require mongoose orm
var mongoose = require('mongoose');
// define shorthand for mongoose.Schema
var Schema = mongoose.Schema;

// define schema for scraped article
var articleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        // unique prevents duplicate entries
        unique: { index: { unique: true }}
    },
    synopsis: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    }
});

// make available for use elsewhere
var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
