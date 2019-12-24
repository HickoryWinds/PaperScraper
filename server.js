// require express for tooling HTTP server
var express = require('express');
// require express-handlebars for page formatting
var expressHandlebars = require('express-handlebars');
// var require body-parser to parse incoming request stream from http post
var bodyParser = require('body-parser');

// create instance of express app
var app = express();

// import method-override for posting
var methodOverride = require('method-override')
app.use(methodOverride('_method'));

// set / folder as static
app.use(express.static(__dirname + '/'));

//connect handlebars with express app
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// utilize body-parser in app
app.use(bodyParser.urlencoded({
    extended: false
}));

//require mongoose orm to format objects for mongodb
var mongoose = require('mongoose');
// if deployed on heroku use deployed database else use local mongodb wpArticles
var db = process.env.MONGODB_URI || 'mongodb://localhost/wpArticles';
// connect mongoose to database
mongoose.connect(db, function(error){
    // if error, log it
    if (error){
        console.log(error);
    }
    // if no error, show login successful
    else {
        console.log('Mongoose connection successful!')
    }
})


// set up an express router
var router = express.Router();
// require routes file to pass router objects
require('./config/routes')(router);
// have all requests pass through router middleware
app.use(router);

// set port to one designated by host or localhost:3500
var PORT = process.env.PORT || 3500;
// start listening on specified port
app.listen(PORT, function(){
    console.log('Listening on port: ' + PORT + '!')
});
