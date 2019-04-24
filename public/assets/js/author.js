$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

async function retrieveAuthor(author_id) {
    const author =  (await fetch('/v2/authors/'+author_id)).json()
}

async function retrieveBooks(book_id) {
    return (await fetch('/v2/books/'+book_id)).json()
}

function fillAuthor(author) {
    const tpl = {
        img: "../assets/images/"+author.imgpath,
        author_name: author.name,
        author_surname: author.surname,
        biography: author.biography,
    };
    const template = $('#authorTpl').html();
    const html = Mustache.to_html(template, tpl);
    $('#author-content').prepend(html);
}

function fillBook(book) {
    const tpl = {
        img: "../assets/images/"+book.imgpath,
        title: book.title,
        book_link: "/pages/book.html?id="+book.book_id
    };
    const template = $('#bookTpl').html();
    const html = Mustache.to_html(template, tpl);
    $('#book-content').append(html);
}

async function appendBooks(books) {
    for(let i=0; i<books.length; i++) {
        fillBook(books[i]);
    }
}


async function initialise() {
    const author_id = $.urlParam("id"); 
    const author = await retrieveAuthor(author_id);
    const books = await retrieveBooks(author_id);
    fillAuthor(author);
    appendBooks(books);
}



   
$(document).ready(async function() {
    await initialise();
});
