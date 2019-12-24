// require axios and cheerio for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// create scraping function
var scrape = function(cb){
    //use axios to make http call
    axios.get("https://www.washingtonpost.com/").then(function(response) {
    // load html body from axios into cheerio
    var $ = cheerio.load(response.data);
    var articleArray = [];
    // use div of class 'headline' to get article
    $(".headline").each(function(i, element) {
      // save the text,href, and body of each link enclosed in the current element
      var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");
      var body = $(element).siblings(".blurb").text();
      
      // if found element has both title, link and body
      if (title && link &&  body) {
       
        var articleToAdd = {
            headline: title,
            link: link,
            synopsis: body
        };
        articleArray.push(articleToAdd);
      }
    });
    cb(articleArray);
  });
};
// make available for use in other modules
module.exports = scrape;