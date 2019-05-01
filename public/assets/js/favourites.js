let counter = 0;

function fillBook(book, author) {
    const tpl = {
        img: "../assets/images/"+book.book.imgpath,
        title: book.book.title,
        author_name: author.name,
        author_surname: author.surname,
        author_link: "/pages/author.html?id="+book.book.author_id,
        book_link: "/pages/book.html?id="+book.book_id
    };
    const template = $('#ListItem').html();
    let html = Mustache.to_html(template, tpl);

    //keep the page responsive
    html = check_responsiveness(html);

    return html;
}

//code to make the card-deck responsive
function check_responsiveness(html) {
    counter++;
    if (counter%2===0) {
        html = html + '<div class="w-100 d-none d-sm-block d-md-none"><!-- wrap every 2 on sm--></div>'
    }
    if (counter%3===0) {
        html = html + '<div class="w-100 d-none d-md-block d-lg-none"><!-- wrap every 3 on md--></div>'
    }
    if (counter%4===0) {
        html = html + '<div class="w-100 d-none d-lg-block d-xl-none"><!-- wrap every 4 on lg--></div>'
    }
    if (counter%5===0) {
        html = html + '<div class="w-100 d-none d-xl-block"><!-- wrap every 5 on xl--></div>'
    }

    return html;
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

async function appendFavourites() {
    let books = await (await fetch(`/v2/books/favourites`)).json();
    let author;

    let html = "";
    for(let i=0; i<books.length; i++) {
        author = await retrieveAuthor(books[i].book.author_id);
        html = html + fillBook(books[i],author);
    }

    $('#card-deck').append(html);
    add_padding(); //keep the page responsive
}



$(async function() {
    await appendFavourites();
});

