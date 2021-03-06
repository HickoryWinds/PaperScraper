// require scrape function
var scrape = require('../scripts/scrape')
// require controllers for articles and notes
var articlesController = require('../controllers/articles')
var notesController = require('../controllers/notes')

// make module available for use elsewhere
module.exports = function (router) {
    // route to render index page
    router.get('/', function (req, res) {
        res.render('index');
    });

    // route to render saved page
    router.get('/saved', function (req, res) {
        res.render('saved');
    });

    //route to scrape articles
    router.get('/api/fetch', function (req, res) {
        articlesController.fetch(function (err, docs) {
            res.json({
                message: 'Scraped Articles'
            });

        });
    });

    //route to get data to display from database
    router.get('/api/articles', function (req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        articlesController.get(query, function (data) {
            res.json(data);
        });
    });
    //route to get notedata to display from database
    router.get('/api/notes', function (req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        notesController.get(query, function (data) {
            res.json(data);
        });
    });

    
    //route to delete all unsaved articles
    router.delete('/api/articles/saved=false', function (req, res) {
        var query = {};
        query.saved = 'false';
        articlesController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    
    //route to delete specific article id
    router.delete('/api/articles?:id', function (req, res) {
        var query = {};
        query._id = req.params.id;
        articlesController.delete(query, function (err, data) {
            res.json(data);
        });
    });

    // route to update article if needed
    router.patch('/api/articles', function(req,res){
        articlesController.update(req.body, function(err, data){
            res.json(data);
        });        
    });

    // route to post new note
    router.post('/api/notes', function(req, res){
        notesController.save(req.body, function(data){
            res.json(data);
        });
    });
 
    // route to delete note
    router.delete('/api/notes?:id', function(req, res){
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data){
            res.json(data);
        });
    });
    
    // route to retrieve note
    router.get('/api/notes/:article_id', function(req, res){
        var query = {};
        if (res.params.article_id){
            query._id = req.params.article_id
        };
        notesController.get(query, function(err, data){
            res.json(data);
        })
    })


}

