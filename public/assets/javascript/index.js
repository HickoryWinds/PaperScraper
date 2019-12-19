// wait until document has loaded to run
$(document).ready(function(){
    // create container for scraped articles
    var articleContainer = $('#article-container');
    // button for scraping articles
    $(document).on('click', '#scrape', scrapeArticles);

    function scrapeArticles(){
        console.log('clicked');
        $.get('/api/fetch').then(function(data){
            clearPage();
            // bootbox.alert('<h3 class="text-center" m-top-80>' + data.message + '</h3>')
        });
    }

    function clearPage(){
        console.log('clearing the page');
        articleContainer.empty();
        $.get('/api/articles')
        .then(function(data){
            console.log('in the index page');
            console.log(data);
            if (data && data.length){
                displayUnsavedArticles(data);
            }
            else {
                displayEmpty();
            }
        })
    }
    
    function displayUnsavedArticles(articles){
        console.log('ready to display');
        console.log(articles);
        console.log(articles.length);
        for (var i = 0; i < articles.length; i++){
            articleContainer.append('<p>' + articles[i].title + '</p>');
    }
}
clearPage();
})