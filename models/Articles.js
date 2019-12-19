//require mongoose orm
var mongoose = require('mongoose');
// define shorthand for mongoose.Schema
var Schema = mongoose.Schema;

// define schema for scraped article
var articleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
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

var Article = mongoose.model('Article', articleSchema);
console.log('1 Model')
module.exports = Article;
