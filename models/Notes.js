//require mongoose orm
var mongoose = require('mongoose');
// define shorthand for mongoose.Schema
var Schema = mongoose.Schema;

// define schema for scraped article
var noteSchema = new Schema({
    _articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
    },
    textNote: String
});

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;
