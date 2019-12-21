//require mongoose orm
var mongoose = require('mongoose');
// define shorthand for mongoose.Schema
var Schema = mongoose.Schema;

// define schema for note
var noteSchema = new Schema({
    _articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Articles',
    },
    noteText: String
});

var Note = mongoose.model('Notes', noteSchema);

module.exports = Note;
