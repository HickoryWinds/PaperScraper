// require axios and cheerio for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// create scraping function
var scrape = function(cb){
    //use axios to make http call
    axios.get("https://www.washingtonpost.com/").then(function(response) {
    // load html body from axios into cheerio
    var $ = cheerio.load(response.data);
    console.log('1111111111111111');
    // console.log($);
    console.log('2222222222222222');
    var articleArray = [{headline:'newtitle', link:'link', synopsis:'body'}];
    // for each element with a no-skin class
    // $(".no-skin").each(function(i, element) {
    //   // save the text,href, and body of each link enclosed in the current element
    //   var title = $(element).find("a").text();
    //   var link = $(element).find("a").attr("href");
    //   var body = $(element).find("div").text();
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
    console.log('333333333333');
    // console.log(articleArray[1]);
    cb(articleArray);
  });
};
console.log('2 script')
module.exports = scrape;