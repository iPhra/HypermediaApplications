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

async function appendFavourites() {
    let books = await( await fetch(`/v2/books/favourites`)).json();

    let html = "<div class=\"carousel-item\">\n" +
        "\n" +
        "<div class=\"row\">";

    for (let i=0; i<books.length; i++) {
        if(i>2 && i%3===0) {
            html = html + "</div>\n" +
                "\n" +
                "</div>";
            html = html + "<div class=\"carousel-item\">\n" +
                "\n" +
                "<div class=\"row\">";
        }
        html = html + fillFavourite(books[i])
    }
    if(books.length%3!==0) {
        html = html + add_padding(books.length);
    }
    html = html + "</div>\n" +
        "\n" +
        "</div>";
    console.log(html.toString());
    $('#carousel').append(html);
}

function fillFavourite(book) {
    let tpl = {
        img: book.imgpath,
        book_link: "/pages/book.html?id="+book.book_id
    };
    let template = $('#favCard').html();
    return Mustache.to_html(template, tpl);
}

function add_padding(length) {
    console.log("Book number ", length);
    var html="";
    for(let i=0; i<3-length%3; i++) {
        let template = $('#whiteCard').html();
        html = html + template;
    }
    return html;
}

$(function() {
    appendTop10();
    appendFavourites();
});

