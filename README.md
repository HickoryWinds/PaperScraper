## PaperScraper

#### PaperScraper is an app that lets the user 'scrape articles from the Washington Post website. The scraped articles are saved in a Mongo database in object format. All the saved articles are displayed on the index page. The user may then save an article of interest which will be presented to them for further review. The user can then add notes to the saved article or delete it.

#### The user first view the index page when arriving at the website. If no articles have been previously saved, it will only display the banner.

![picture](/public/assets/images/welcome.png)

#### To scrape the Washington Times web page, the user clicks on the 'Scrape button. A jQuery ajax call is then made using axios. The articles are returned and saved in a Mongo database. Saving duplicate articles is prevented by making qualifying the headline stored as unique. The page is refreshed and the saved articles displayed. For each article, the headline and its body are shown as is a link to the article which will open in a new tab. A save button is attached to each article.

![picture](/public/assets/images/scraped.png)

#### When the 'Delete All' button is clicked, all the unsaved articles displayed on the index page are deleted from the database. The page is then refreshed.

![picture](/public/assets/images/delete-all.png)

#### When the 'Save Article' button is clicked, its status in the database is changed to that it will display on the saved article page. The saved articles page can be accessed by clicking on the 'Saved Articles' link.

![picture](/public/assets/images/save-it.png)

#### On the saved articles page, the user has the option of adding notes or deleting the article.

![picture](/public/assets/images/saved-articles-page.png)

#### If the user chooses to add a note, the 'Add Notes' button can be clicked, an the user will be presented with a dialog box to enter the note.

![picture](/public/assets/images/add-note.png)

#### When the save note button is clicked, the note is saved to the database and the page is refreshed to show the new note. The notes are collected at the top of the saved page so that the user does not need to search the page to find a note.

![picture](/public/assets/images/note-added.png)

#### If the user want to delete a note, the 'Delete Note' button can be clicked. The note will be deleted and the page refreshed.

![picture](/public/assets/images/note-deleted.png)

#### If the user want to delete an article, the 'Delete Article' button can be clicked. The article will be deleted and the page refreshed.

![picture](/public/assets/images/article-deleted.png)

#### This app was developed using node.js, express, express-handlebars, mongojs, mongoose, axios, cheerio, jQuery, and CSS technologies. Development was by a sole contributor which is myself.
