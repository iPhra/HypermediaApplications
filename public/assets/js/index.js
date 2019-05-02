let counter = 0;

async function retrieveAuthor(author_id) {
    return (await fetch('/v2/authors/'+author_id)).json()
}

function fillFavourite(book) {
    const img = "../assets/images/"+book.book.imgpath;
    const book_link = "/pages/book.html?id="+book.book_id;

    const tpl = `<div class="col">
      <div class="card">
        <img class="card-img-top" src="`+img+`" alt="Card image cap">
        <div class="card-footer text-center">
          <a href="`+book_link+`" class="btn btn-outline-primary btn-sm">
                      <i class="fa fa-book"></i>
                      View Book</a>
        </div>
      </div>
    </div>`

    return tpl;
}

function fillTop10(book, author) {
    const img = "../assets/images/"+book.book.imgpath;
    const title = book.book.title;
    const genres = (book.book.genres).join(', ');
    const author_name = author.name;
    const author_surname = author.surname;
    const book_link = "/pages/book.html?id="+book.book_id;

    const tpl = `<a href="`+book_link+`" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div class="flex-column">
                    `+title+`
                    <p><small>by `+author_name+` `+author_surname+`</small></p>
                    <span class="badge badge-info badge-pill"> `+genres+`</span>
                  </div>
                  <div class="image-parent">
                    <img src="`+img+`" class="img-fluid w-50" alt="cover">
                  </div>
                </a>`

    return tpl;
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

function add_padding(length) {
    console.log("Book number ", length);
    var html="";
    for(let i=0; i<3-length%3; i++) {
           let template = `<div class="col">
                              <div class="card whiteCard">
                              </div>
                            </div>`
        html = html + template;
    }
    return html;
}



$(function() {
    appendTop10();
    appendFavourites();
});

