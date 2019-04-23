let counter = 0;

async function appendFavourites() {
    let books = await (await fetch(`/v2/books/favourites`)).json();
    let author;

    for(let i=0; i<books.length; i++) {
        author = await retrieveAuthor(books[i].book.author_id);
        fillTemplate(books[i],author);
    }

    //keep the page responsive
    add_padding();
}

function fillTemplate(book, author) {
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
    $('#card-deck').append(html);

    //keep the page responsive
    check_responsiveness()
}

//code to make the card-deck responsive
function check_responsiveness() {
    counter++;
    if (counter%2===0) {
        $('#card-deck').append('<div class="w-100 d-none d-sm-block d-md-none"><!-- wrap every 2 on sm--></div>');
    }
    if (counter%3===0) {
        $('#card-deck').append('<div class="w-100 d-none d-md-block d-lg-none"><!-- wrap every 3 on md--></div>');
    }
    if (counter%4===0) {
        $('#card-deck').append('<div class="w-100 d-none d-lg-block d-xl-none"><!-- wrap every 4 on lg--></div>');
    }
    if (counter%5===0) {
        $('#card-deck').append('<div class="w-100 d-none d-xl-block"><!-- wrap every 5 on xl--></div>');
    }
}

function add_padding() {
    for(let i=0; i<3; i++) {
        let template = $('#white_card').html();
        $("#card-deck").append(template);
        check_responsiveness()
    }
}

async function retrieveAuthor(author_id) {
    return (await fetch('/v2/authors/'+author_id)).json()
}

$(function() {
    appendFavourites();
});

