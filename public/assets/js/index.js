let counter = 0;

async function retrieveAuthor(author_id) {
    return (await fetch('/v2/authors/'+author_id)).json()
}

async function appendTop10() {
    let books = await (await fetch(`/v2/books/top10`)).json();
    let author;

    let html = "";
    for(let i=0; i<books.length; i++) {
        author = await retrieveAuthor(books[i].book.author_id);
        html = html + fillTop10(books[i],author);
    }
    $('#top10-content').append(html);
}

function fillTop10(book, author) {
    var tpl = {
        img: book.imgpath,
        title: book.book.title,
        genres: (book.book.genres).join(', '),
        author_name: author.name,
        author_surname: author.surname,
        book_link: "/pages/book.html?id="+book.book_id
    };
    var template = $('#top10Tpl').html();
    return Mustache.to_html(template, tpl);
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

$(function() {
    appendTop10();
});

