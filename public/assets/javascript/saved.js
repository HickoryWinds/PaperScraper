// wait until document has loaded to run
$(document).ready(function () {
    // create container for scraped articles
    var articleContainer = $('#article-container');
    // create container for scraped articles
    var noteContainer = $('#note-container');
    // action for button to delete notes
    $(document).on('click', '.btn.delete', deleteArticles);
    // action for button to add notes
    $(document).on('click', '.btn.notes', addNotes);
    // action for button to add notes
    $(document).on('click', '.btn.note-save', saveNotes);
    // action for button to add notes
    $(document).on('click', '.btn.note-delete', deleteNotes);

    // function clearPage empties div then displays articles and notes in database
    function clearPage() {
        articleContainer.empty();
        $.get('/api/articles?saved=true')
            .then(function (data) {
                if (data && data.length) {
                    displaySavedArticles(data);
                }
                else {
                    console.log('Empty');
                }
            });
        // noteContainer.empty();
        $.get('/api/notes')
            .then(function (data) {
                if (data && data.length) {
                    displayNotes(data);
                }
                else {
                    console.log('Empty');
                }
            })
    }
    
    // function displaySavedArticles displays the articles with a saved state of true
    // to the saved articles page
    function displaySavedArticles(articles) {
        for (var i = 0; i < articles.length; i++) {
            var panel =
                $([
                    '<br>',
                    '<div class="panel panel-default panel-article">',
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
                    '<h5>',
                    '<a href="' + articles[i].link.toString() + '" target="blank">Link to Article</a>',
                    '<br>',
                    articles[i].synopsis,
                    '</h5>',
                    '</div>',
                    '<p>Article Number: ' + articles[i]._id + '</p>' ,
                    '<hr>',
                    '</div>'
                ].join(''));
            // add data to panel for saving notes and displaying them
            panel.data('_id', articles[i]._id);
            panel.addClass(articles[i]._id.toString());
            // append panel to container
            articleContainer.append(panel);
            articleContainer.append('<br>');
        }
    }
    // function to delete article associated with a button
    function deleteArticles() {
        // get id from article panel
        var toBeDeleted = $(this).parents('.panel').data();
        $.ajax({
            method: 'DELETE',
            url: '/api/articles' + toBeDeleted._id
        }).then(function (data) {
            if (data.ok) {
                clearPage();
            }
        });
    }
    // function to delete note associated with a button
    function deleteNotes() {
        // get note id from panel div
        var toBeDeleted = $(this).parents('.panel').data();;
        $.ajax({
            method: 'DELETE',
            url: '/api/notes' + toBeDeleted._id
        }).then(function (data) {
            if (data.ok) {
                clearPage();
            }
        });
    }

    // function addNotes adds a note to the article via the associate button
    function addNotes() {
        // get id for article div
        var selectedArticle = $(this).parents('.panel').data();
        // construct note entry
        var noteStructure = $([
            '<div class="container-fluid text-center">',
            '<h4 class="note-head">Notes for Article: ',
            selectedArticle._id,
            '</h4>',
            '<hr>',
            '<ul class="list-group note-container">',
            '</ul>',
            '<textarea placeholder="New Note" rows="4" cols="60"></textarea>',
            '<button class="btn btn-success note-save">Save Note</button>',
            '</div>'
        ].join(''));
        noteStructure.data('_id', selectedArticle._id);
        // append entry form to article
        $(this).parents('.panel').append(noteStructure);
    }
    // function addNotes adds a note to the article via the associate button
    function displayNotes(notes) {
        for (j = 0; j < notes.length; j++) {

            // construct display
            var panel = $([
                '<br>',
                '<div class="panel panel-default">',
                '<div class="panel-heading">',
                '<h4>Notes for Article: ',
                notes[j]._articleId,
                '<br>',
                '</h4>',
                '</div>',
                '<div class="panel-body">',
                '<button class="btn btn-danger note-delete">Delete Note</button>',
                '<h5>',
                notes[j].noteText,
                '</h5>',
                '<hr>',
                '</div>',
            ].join(''));
            // add id to note div so it can be used to delete note
            panel.data('_id', notes[j]._id);
            // append note to associated article panel; note structure of selector
            $('.' + notes[j]._articleId).append(panel);
        }
    }

    function saveNotes() {
        // variable to send data to database
        var noteData;
        // get note text from text area
        var noteText = $('textarea').val().trim();
        // if noteText exists post to database
        if (noteText) {
            noteData = {
                _id: $(this).parents('.panel').data()._id,
                noteBody: noteText
            };
            $.post('api/notes', noteData).then(function () {
            })
        }
        clearPage();
    }
    // initial call to display contents of database
    clearPage();
});
