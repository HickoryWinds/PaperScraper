// require model for articles
var Articles = require('../models/Articles');
//require files from /scripts folder
var scrape = require('../scripts/scrape');

// make module available for use elsewhere
module.exports = {
    // gathers all articles that are scraped
    fetch: function (cb) {
        scrape(function (data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].saved = false;
            }
            // save scraped articles to database
            Articles.collection.insertMany(articles, {ordered: false}, function(err, docs){
                cb(err, docs)
            });
        });
    },
    // deletes article being queried
    delete: function (query, cb) {
        Articles.remove(query, cb);
    },
    // get articles queried and sort so most recent on top
    get: function (query, cb) {
        Articles.find(query).sort({ _id: -1 }).exec(function (err, doc) {cb(doc)});
    },
    // updates new scraped articles
    update: function (query, cb) {
        Articles.update({ _id: query._id },
            {
                $set: query
            }, {}, cb);
    }
}
