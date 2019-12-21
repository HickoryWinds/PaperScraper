// wait until document has loaded to run
$(document).ready(function(){
    // create container for scraped articles
    var articleContainer = $('#article-container');
    // action for button to delete articles
    $(document).on('click', '.btn.delete', deleteArticles);
    // action for button to add notes
    $(document).on('click', '.btn.notes', addNotes);
    // action for button to add notes
    $(document).on('click', '.btn.note-save', saveNotes);
    // action for button to add notes
    $(document).on('click', '.btn.note-delete', deleteNotes);

    // function scrapeArticles(){
    //     console.log('clicked');
    //     $.get('/api/fetch').then(function(data){
    //         clearPage();
    //         // bootbox.alert('<h3 class="text-center" m-top-80>' + data.message + '</h3>')
    //     });
    // }
    // function clearPage empties div displays article in database
    function clearPage(){
        console.log('clearing the page');
        articleContainer.empty();
        $.get('/api/articles?saved=true')
        .then(function(data){
            console.log('in the index page');
            console.log(data);
            if (data && data.length){
                displaySavedArticles(data);
            }
            else {
                console.log('Empty');
            }
        })
    }
    
    function displaySavedArticles(articles){
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
                '<a class="btn btn-danger delete">',
                'Delete Article',
                '</a>',
                '<a class="btn btn-info notes">',
                'Add Notes',
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
// function to delete article associated with a button
function deleteArticles(){
    console.log('deleting');
    var toBeDeleted = $(this).parents('.panel').data();
    $.ajax({
        method: 'DELETE',
        url: '/api/articles' + toBeDeleted._id
    }).then(function(data){
        if (data.ok){
            clearPage();
        }
    });
}
// function addNotes adds a note to the article via the associate button
function addNotes (){
    console.log('adding notes');
    // bootbox.alert("Your message here…");
    var selectedArticle = $(this).parents('.panel').data();
    console.log($(this).parents('.panel'));
    // construct modal
    var modalStructure = $([
        
        '<div class="container-fluid text-center">',
        '<h4>Notes for Article: ',
        selectedArticle._id,
        '</h4>',
        '<hr>',
        '<ul class="list-group note-container">',
        '</ul>',
        '<textarea placeholder="New Note" rows="4" cols="60"></textarea>',
        '<button class="btn btn-success note-save">Save Note</button>',
        '<button class="btn btn-danger note-delete">Delete Note</button>',
        '</div>'
    ].join(''));
    modalStructure.data('_id', selectedArticle._id)
    console.log(modalStructure);
    // articleContainer.append(modalStructure);
    $(this).parents('.panel').append(modalStructure);
    // add formatted html to modal
    // bootbox.alert({
    //     message: modalStructure,
    //     closeButton: true
    // });
}

function saveNotes(){
    console.log('saving note');
    // variable to send data to database
    var noteData;
    // get note text from text area
    var noteText = $('textarea').val().trim();
    console.log(noteText);
    // if noteText exists post to database
    if(noteText){
        noteData = {
            _id: $(this).parents('.panel').data()._id,
            noteBody: noteText
        };
        console.log(noteData)
        $.post('api/notes', noteData).then(function(){
            console.log('note saved');
        })
    }
}

function deleteNotes(){
    console.log('deleting note');
}

clearPage();
});
