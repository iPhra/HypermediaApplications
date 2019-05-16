let counter = 0;

function createAuthors(authors) {
    let author_name;
    let author_surname;
    let result = ``;
    for(let i=0; i<authors.length; i++) {
        author_name = authors[i].author.name;
        author_surname = authors[i].author.surname;
        result = result + author_name + " " +author_surname;
        if(i<authors.length-1 && authors.length>1) result= result + ', '
    }

    return result;
}

async function retrieveAuthors(book_id) {
    return (await fetch('/v2/books/'+book_id+'/authors')).json()
}

function fillFavourite(book) {
    const img = "../assets/images/books/"+book.book.imgpath;
    const book_link = "/pages/book.html?id="+book.book_id;

    return `<div class="col">
      <div class="card">
        <img class="card-img-top" src="`+img+`" alt="Book cover">
        <div class="card-footer text-center">
          <a href="`+book_link+`" class="btn btn-outline-primary btn-sm">
                      <i class="fa fa-book"></i>
                      View Book</a>
        </div>
      </div>
    </div>`;
}

function fillTop10(book, authors) {
    const img = "../assets/images/books/"+book.book.imgpath;
    const title = book.book.title;
    const genres = (book.book.genres).join(', ');
    const book_link = "/pages/book.html?id="+book.book_id;

    return `<a href="`+book_link+`" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div class="flex-column w-75">
                    `+title+`
                    <p><small>by `+createAuthors(authors)+`</small></p>
                    <span class="badge badge-info badge-pill"> `+genres+`</span>
                  </div>
                  <div class="image-parent w-25">
                    <img src="`+img+`" class="img-fluid w-100" alt="Book cover">
                  </div>
                </a>`;
}

async function appendTop10() {
    let books = await (await fetch(`/v2/books/top10`)).json();
    let authors;

    let html = "";
    for(let i=0; i<books.length; i++) {
        authors = await retrieveAuthors(books[i].book_id);
        html = html + fillTop10(books[i],authors);
    }
    $('#top10-content').append(html);
}

async function appendFavourites() {
    let books = await( await fetch(`/v2/books/favourites`)).json();

    let html = "<div class=\"carousel-item active\">\n" +
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

async function appendEvent() {
    const events = await (await fetch('/v2/events')).json();
    const today = new Date();
    const event = events.reduce( function (a,b) {
        const date_a = new Date(a.event.date);
        const date_b = new Date(b.event.date);
        if ( date_a < today) return b;
        else if (date_b < today) return a;
        else if (date_a <= date_b) return a;
        else return b
    } );
    const book = await (await fetch('/v2/books/'+event.event.book_id)).json();

    const date = (new Date(event.event.date)).toISOString().substring(0,10);
    $('#location').text(" " + event.event.location);
    $('#book_link').attr("href","/pages/book.html?id="+event.event.book_id);
    $('#book_title').text(" " + book.title);
    $('#date').text(" " + date);
    $('#email').text(" " + event.event.organiser_email);
    $('#img').attr("src", "../assets/images/events/"+event.event.imgpath);
    $('#description').text(event.event.description);
    $("title").text(event.event.location + " - " +date);
}

function add_padding(length) {
    console.log("Book number ", length);
    let html = "";
    for(let i=0; i<3-length%3; i++) {
           let template = `<div class="col">
                              <div class="card whiteCard">
                              </div>
                            </div>`;
        html = html + template;
    }
    return html;
}



//change navbar styling after collapse button have been pressed
$(document).ready(function() {

    $('.collapse')
        .on('show.bs.collapse', function() {
        $('#searchBar').removeClass('ml-3');
        })
        .on('hidden.bs.collapse', function() {
            $('#searchBar').addClass('ml-3');
        });
});

$(async function() {
    await appendTop10();
    await appendFavourites();
    await appendEvent();
});

$(function() {
    if(localStorage.getItem("token")) {
        $("#account-area").append('<a href="/pages/cart.html"> <i class="fa fa-shopping-cart" aria-hidden="true"></i></a>\n' +
            '      <a href="/pages/user-info.html"> <i class="fa fa-user" aria-hidden="true">\n' +
            '      </i></a>' +
            '       <a id="logout" href="#"> <span class="navbar-text text-white">' +
            '            \Logout' +
            '            \      </span> </a>')
    }
    else {
        $("#account-area").append('<a href="/pages/login.html"> <span class="navbar-text text-white">\n' +
            '      Login\n' +
            '      </span> </a>\n' +
            '      <span class="text-white">|</span>\n' +
            '      <a href="/pages/registration.html"> <span class="navbar-text text-white">\n' +
            '      Register\n' +
            '      </span> </a>')
    }
});

$(function() {
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });
});

