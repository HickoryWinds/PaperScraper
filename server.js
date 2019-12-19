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

// set public folder as static
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
// var routes = require('./config/routes')(router);
// app.use('/', routes)
console.log('4 server');

// set port to one designated by host or localhost:3500
var PORT = process.env.PORT || 3500;
// start listening on specified port
app.listen(PORT, function(){
    console.log('Listening on port: ' + PORT + '!')
});


// //test placement
// var axios = require('axios');
// var cheerio = require('cheerio');
// // create scraping function
// function scrapeIt() {
//     //use axios to make http call
//     axios.get("https://www.washingtonpost.com/").then(function(response) {
//         console.log('00000000000');
//         // console.log(response.data);
//     // load html body from axios into cheerio
//     var $ = cheerio.load(response.data);
//     console.log('1111111111111111');
//     // console.log($);
//     console.log('2222222222222222');
//     var articleArray = [{title:'newtitle', link:'link', body:'body'}];
//     // for each element with a no-skin class
//     $(".no-skin").each(function(i, element) {
//       // save the text,href, and body of each link enclosed in the current element
//       var title = $(element).find("a").text();
//       var link = $(element).find("a").attr("href");
//       var body = $(element).find("div").text();
      
//       // if found element has both title and link
//       if (title && link) {
//         // insert data in the scrapedData db
//         // db.scrapedData.insert({
//         //   title: title,
//         //   link: link,
//         //   body: body
//         // },
//         // function(err, inserted) {
//         //   if (err) {
//         //     // log the error if one occurs
//         //     console.log(err);
//         //   }
//         //   else {
//         //     // if no error log the inserted data
//         //     console.log(inserted);
//         //   }
//         // });
//         var articleToAdd = {
//             title: title,
//             link: link,
//             body: body
//         };
//         articleArray.push(articleToAdd);
//       }
//     });
//     console.log('333333333333');
//     console.log(articleArray);
//     // cb(articleArray);
//   });
// };
// console.log('77777777777777777777');
// scrapeIt();