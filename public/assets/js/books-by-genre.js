function createAuthors(authors) {
    let author_link;
    let author_name;
    let author_surname;
    let result = ``;
    for(let i=0; i<authors.length; i++) {
        author_link = "/pages/author.html?id="+authors[i].author_id;
        author_name = authors[i].author.name;
        author_surname = authors[i].author.surname;
        result = result + `<a href="`+author_link+`">`+author_name+` `+author_surname+`</a>`;
        if(i<authors.length-1 && authors.length>1) result= result + ', '
    }

    return result;
}

function fillBook(book, authors) {
    const img = "../assets/images/books/"+book.book.imgpath;
    const book_link = "/pages/book.html?id="+book.book_id;
    const title = book.book.title;

    return `<div class="card similar-book-card">
              <img class="card-img-top" src="`+img+`" alt="Book cover">
              <div class="card-body">
                <h5 class="card-title">`+title+`</h5>
                <small>  by
                  `+createAuthors(authors)+`
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
                    <a id="`+book.book_id+`" href="#" class="btn btn-big btn-outline-primary btn-sm cart">
                      <i class="fa fa-shopping-cart"></i> Add to cart</a>
                  </div>
                </div>
              </div>
            </div>`;
}

async function appendGenres() {
    const genres = await (await fetch(`/v2/genres`)).json();

    let genre;
    for(let i=0; i<genres.length; i++) {
        genre = genres[i].charAt(0).toUpperCase() + genres[i].slice(1);
        $('.list-group').append('<a href="#" id="'+genres[i]+'"class="list-group-item list-group-item-action">'+genre+'</a>');
    }
}

async function appendBooks(genre) {
    let books;
    if (genre==="All") {
        books = await (await fetch(`/v2/books`)).json();
    }
    else {
        books = await (await fetch(`/v2/books?genre=`+genre)).json()
    }

    let authors;
    let html = "";
    for(let i=0; i<books.length; i++) {
        authors = await (await fetch('/v2/books/'+books[i].book_id+'/authors')).json();
        html = html + fillBook(books[i],authors);
    }
    $('#book-content').append(html);
}



$(async function() {
    await appendGenres();
    await appendBooks("All");
});

$(function() {
    $(document).on("click", ".list-group-item", async function(){
        $('#book-content').empty();
        await appendBooks(this.id);
    });
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

$(function() {
    $(document).on("click", ".cart", function(){
        const token = localStorage.getItem("token");
        if(!token) alert("You must be logged in to add items to the cart!");
        else {
            $.ajax({
                url: '/v2/account/cart',
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', token);
                },
                dataType: "text",
                contentType: "application/json",
                data: JSON.stringify({
                    book_id : parseInt($(this).attr('id'))
                }),
                success: function () {
                    alert("Item added successfully!")
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error " + jqXHR.status +
                        ": " + errorThrown);
                }
            });
        }
    });
});
