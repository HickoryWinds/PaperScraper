// require model for notes
var Notes = require('../models/Notes');

// make module available for use elsewhere
module.exports = {
    
     // deletes note being queried
     delete: function (query, cb) {
        Notes.remove(query, cb);
    },
    
    // get articles queried and sort so most recent on top
    get: function (query, cb) {
        Notes.find(query).sort({ _id: -1 }).exec(function (err, doc) {cb(doc)});
    },

    // save note
    save: function(data, cb){
        
        var newNote = {
            _articleId: data._id,
            noteText: data.noteBody
        };
        Notes.create(newNote, function (err, doc){
            if (err){
                console.log(err);
            }
            else {
                cb(doc);
            }
        });
    }
};
