// require model for notes
var Notes = require('../models/Notes');

module.exports = {
    // deletes notr being queried
    delete: function (data, cb) {
        Notes.remove({
            _id: data_id
        }, cb);
    },
    // get note for article queried
    get: function (data, cb) {
        Notes.find({
            _articleId: data._id
        }, cb);
    },
    // save note
    save: function(data, cb){
        console.log('controller');
        console.log(data);
        
        var newNote = {
            _articleId: data._id,
            noteText: data.noteBody
        };
        console.log('controller');
        console.log(newNote);
        Notes.create(newNote, function (err, doc){
            if (err){
                console.log(err);
            }
            else {
                console.log(doc);
                cb(doc);
            }
        });
    }
};
console.log('3 controller');