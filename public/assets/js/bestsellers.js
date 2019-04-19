async function appendTop10() {
    console.log("Here1");
    var books = await (await fetch(`/v2/books?limit=10`)).json();
    console.log(books);
    console.log("Here");
    var author;
    for(let i=0; i<books.length; i++) {
        books[i]["rank"] = i+1;
        author = await retrieveAuthor(books[i].book.author_id);
        card_deck = i<5 ? "0-5" : "6-10";
        fillTemplate(books[i],author, card_deck);
    }

    /*var promise = fetch(`/v2/books?limit=10`)
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
    }).catch( (e) => console.log(e))*/
}

function fillTemplate(book, author, card_deck) {
    console.log(book);
    var book = {
        img: book.imgpath,
        title: book.book.title,
        price: book.book.current_price,
        authors_name: author.name,
        authors_surname: author.surname,
        abstract: book.book.abstract ? book.book.abstract : "Lorem ipsum dolor",
        rank: book.rank
    };
    var template = $('#ListItem').html();
    var html = Mustache.to_html(template, book);
    $('#'+card_deck).append(html);
}

async function retrieveAuthor(author_id) {
    return (await fetch('/v2/authors/'+author_id)).json()
}

$(function() {
    console.log("Page loaded");
    appendTop10();
});


