$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

async function retrieveAuthor(author_id) {
    return (await fetch('/v2/authors/'+author_id)).json()
}

async function retrieveBook(book_id) {
    return (await fetch('/v2/books/'+book_id)).json()
}

function fillBook(book, author) {
    var tpl = {
        img: book.imgpath,
        title: book.title,
        author_name: author.name,
        author_surname: author.surname,
        abstract: book.abstract,
        genres: book.genres,
        themes: book.themes,
        num_of_pages: book.num_of_pages,
        cover_type: book.cover_type
    };
    var template = $('#bookTpl').html();
    var html = Mustache.to_html(template, tpl);
    $('#book-content').prepend(html);
}

function fillPrice(book) {
    $('#price').text(book.current_price+"€");
}

function fillInterview(book, author) {
    $('#author').text(author.name+" "+author.surname);
    $('#interview').text(book.interview);
}

async function initialise() {
    const book_id = $.urlParam("id"); 
    const book = await retrieveBook(book_id);
    const author = await retrieveAuthor(book.author_id);
    fillBook(book, author);
    fillPrice(book);
    fillInterview(book, author);
}




$(document).ready(function(){
    $(window).scroll(function(){
         var newPos = $(document).scrollTop();
         $('.floating-price').css( {top:newPos});
    })
});
   
$(document).ready(async function() {
    console.log($.urlParam("id"));
    await initialise();
});
