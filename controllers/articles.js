// require model for articles
var Articles = require('../models/Articles');
//require files from /scripts folder
var scrape = require('../scripts/scrape');


module.exports = {
    fetch: function (cb) {
        scrape(function (data) {
            var articles = data;
            console.log('44444444444444');
            console.log(data);
            for (var i = 0; i < articles.length; i++) {
                articles[i].saved = false;
            }
            Articles.collection.insertMany(articles, {ordered: false}, function(err, docs){
                console.log('5555555555555555');
                console.log(docs);
                cb(err, docs)
            });
        });
    },
    delete: function (query, cb) {
        Articles.remove(query, cb);
    },
    get: function (query, cb) {
        Articles.find(query).sort({ _id: -1 }).exec(function (err, doc) {cb(doc)});
    },
    update: function (query, cb) {
        Articles.update({ _id: query._id },
            {
                $set: query
            }, {}, cb);
    }
}
console.log('3 controller');