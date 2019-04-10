function appendTop10() {

    console.log("1");
    var promise = fetch(`/v2/books?limit=10`)
        .then(function(response) {
            console.log(response);
            return response.json();
        });
    promise.then(function(books) {
        for(let i=0; i<books.length; i++) {
            console.log(books);
            fillTemplate(books[i]);
        }
    })
}

function fillTemplate(book) {
    console.log(book);
    var book = {
        img: book.imgpath,
        title: book.title,
        price: book.current_price,
        authors_name: book.authors[0]? book.authors[0].name : "",
        authors_surname: book.authors[0]? book.authors[0].surname : "",
        abstract: book.abstract ? book.abstract : ""
    };
    var template = $('#ListItem').html();
    var html = Mustache.to_html(template, book);
    $('#content').append(html);
}

$(function() {
    console.log("Page loaded");
    appendTop10();
    //appendGenres();
    //appendBooks("All");
});


