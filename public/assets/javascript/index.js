// wait until document has loaded to run
$(document).ready(function(){
    // create container for scraped articles
    var articleContainer = $('#article-container');
    // action for button to scrape articles
    $(document).on('click', '#scrape', scrapeArticles);
    // action for buttons to save articles
    $(document).on('click', '.btn.save', saveNotes);

    function scrapeArticles(){
        console.log('clicked');
        $.get('/api/fetch').then(function(data){
            clearPage();
            // bootbox.alert('<h3 class="text-center" m-top-80>' + data.message + '</h3>')
        });
    }
    // function clearPage empties div displays article in database
    function clearPage(){
        console.log('clearing the page');
        articleContainer.empty();
        $.get('/api/articles?saved=false')
        .then(function(data){
            console.log('in the index page');
            console.log(data);
            if (data && data.length){
                displayUnsavedArticles(data);
            }
            else {
                console.log('Empty');
            }
        })
    }
    
    function displayUnsavedArticles(articles){
        console.log('ready to display');
        console.log(articles);
        console.log(articles.length);
        for (var i = 0; i < articles.length; i++){
            // articleContainer.append('<p>' + articles[i].headline + '</p>');
            // articleContainer.append('<p>' + articles[i].link + '</p>');
            // articleContainer.append('<p>' + articles[i].synopsis + '</p>');
            // articleContainer.append('<a class="btn btn-success save">"Save Article"</a>');
            // articleContainer.append('<br>');
            var panel = 
            $([
                '<div class="panel panel-default">',
                '<div class="panel-heading">',
                '<h3>',
                articles[i].headline,
                '<br>',
                '<a class="btn btn-success save">',
                'Save Article',
                '</a>',
                '<h3>',
                '</div>',
                '<div class="panel-body">',
                articles[i].link,
                '<br>',
                articles[i].synopsis,
                '</div>',
                '</div>',
                '<br>'
            ].join(''));
            console.log('articles._id');
            console.log(articles[i]._id);
            panel.data('_id', articles[i]._id);
            // append panel to container
            articleContainer.append(panel);
            articleContainer.append('<br>');
    }
}
// saveNotes save changes the state of saved in database for the article clicked on
function saveNotes(){
    console.log('started to save note');
    var savedNote = $(this).parents('.panel').data();
    // var savedNote = "_id: '5dfd213f66f3bf39b48fc85c'";
    console.log('savedNote');
    console.log(savedNote);
    savedNote.saved = true;
    // make api call to change state
    $.ajax({
        method: 'PATCH',
        url: '/api/articles',
        data: savedNote
    }).then(function(data){
        console.log('data');
        console.log(data);
        if(data.ok){
            console.log('ok')
            clearPage();
        }
    });
}

clearPage();
});
