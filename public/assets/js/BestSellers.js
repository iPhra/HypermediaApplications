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
            books[i]["rank"] = i+1;
            console.log(books);
            fillTemplate(books[i]);
        }
    }).catch( (e) => console.log(e))
}

function fillTemplate(book) {
    console.log(book);
    var book = {
        img: book.imgpath,
        title: book.title,
        price: book.current_price,
        authors_name: "Maria",
        authors_surname: "Callas",
        abstract: book.abstract ? book.abstract : "Lorem ipsum dolor",
        rank: book.rank
    };
    var template = $('#ListItem').html();
    var html = Mustache.to_html(template, book);
    console.log(html);
    console.log($('#Top10'));
    $('#Top10').append(html);
}

$(function() {
    console.log("Page loaded");
    appendTop10();
});


