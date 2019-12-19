// require scrape function
var scrape = require('../scripts/scrape')
// require controllers
var articlesController = require('../controllers/articles')

module.exports = function(router){
    // route to render index page
    router.get('/', function(req, res){
            res.render('index');
    });

    // route to render saved page
    router.get('/saved', function(req, res){
        res.render('saved');
    });

    //route to scrape articles
    router.get('/api/fetch', function(req, res){
        console.log('66666666666');
        console.log(res);
        articlesController.fetch(function(err, docs){
            res.json({
                message: 'Added ' + docs.insertedCount + ' new Articles'
            });

        });
    });

    //route to get data to display from database
    router.get('/api/articles', function(req, res){
        var query = {};
        if (req.query.saved){
            query = req.query;
        }
        articlesController.get(query, function(data){
            res.json(data);
        });
    });

}

