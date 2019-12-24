// wait until document has loaded to run
$(document).ready(function(){
    // create container for scraped articles
    var articleContainer = $('#article-container');
    // action for button to scrape articles
    $(document).on('click', '#scrape', scrapeArticles);
    // action for button to delete unsaved articles
    $(document).on('click', '#delete', deleteAllArticles);
    // action for buttons to save articles
    $(document).on('click', '.btn.save', saveNotes);

    // function scrapeArticles scrapes articles from website
    function scrapeArticles(){
        $.get('/api/fetch').then(function(data){
            clearPage();
        });
    }
    // function clearPage empties div displays article in database
    function clearPage(){
        articleContainer.empty();
        $.get('/api/articles?saved=false')
        .then(function(data){
            if (data && data.length){
                displayUnsavedArticles(data);
            }
            else {
                console.log('Empty');
            }
        })
    }
    
    // function displayUnsavedArticles uses articles gathered from database for display
    // on index page
    function displayUnsavedArticles(articles){
        //create a panel for each article
        for (var i = 0; i < articles.length; i++){
            var panel = 
            $([
                '<div class="panel panel-default">',
                '<div class="panel-heading">',
                '<h3>',
                articles[i].headline,
                '<br>',
                '<a class="btn btn-info save">',
                'Save Article',
                '</a>',
                '<h3>',
                '</div>',
                '<div class="panel-body">',
                '<h5>',
                '<a href="' + articles[i].link.toString() + '" target="blank">Link to Article</a>',
                '<br>',
                articles[i].synopsis,
                '</h5>',
                '<hr>',
                '</div>',
                '</div>',
            ].join(''));
            // attach data to panel for use in changing saved state
            panel.data('_id', articles[i]._id);
            // append panel to container
            articleContainer.append(panel);
            articleContainer.append('<br>');
    }
}

// function to delete all unsaved articles
function deleteAllArticles() {
    $.ajax({
        method: 'DELETE',
        url: '/api/articles/saved=false',
        data: 'saved'
    }).then(function (data) {
        if (data.ok) {
            clearPage();
        }
    });
}

// saveNotes save changes the state of saved in database for the article clicked on
function saveNotes(){
    var savedNote = $(this).parents('.panel').data();
    savedNote.saved = true;
    // make api call to change state
    $.ajax({
        method: 'PATCH',
        url: '/api/articles',
        data: savedNote
    }).then(function(data){
        if(data.ok){
            clearPage();
        }
    });
}

// initial call to display articles
clearPage();
});
