let counter = 0;

function fillBook(book, author) {
    const img = "../assets/images/"+book.book.imgpath;
    const title = book.book.title;
    const author_name = author.name;
    const author_surname = author.surname;
    const author_link = "/pages/author.html?id="+book.book.author_id;
    const book_link = "/pages/book.html?id="+book.book_id;

    let tpl = `<div class="card">
        <img class="card-img-top" src="`+img+`" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">`+title+`</h5>
            <small>  Author:
                <a href="`+author_link+`">`+author_name+` `+author_surname+`</a>
            </small>
        </div>
        <div class="card-footer">
            <div class="row ">
                <div class="col padding-10px">
                    <a href="`+book_link+`" class="btn btn-big btn-outline-primary btn-sm">
                        <i class="fa fa-book"></i>
                        View Book</a>
                </div>
                <div class="col padding-10px">
                    <a href="{{link_add_to_cart}}" class="btn btn-big btn-outline-primary btn-sm">
                        <i class="fa fa-shopping-cart"></i> Add to cart</a>
                </div>
            </div>
        </div>
    </div>`;

    return tpl;
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
}

$(async function() {
    await appendFavourites();
});

