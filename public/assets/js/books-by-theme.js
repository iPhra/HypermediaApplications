let active; //this is the theme selected at the moment

//retrieve the parameter "name" in the URL
$.urlParam = function(name){
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(results) return results[1] || 0;
};

//create the template allowing to have multiple authors for each book
function createAuthors(authors) {
    let author_link;
    let author_name;
    let author_surname;
    let result = ``;
    for(let i=0; i<authors.length; i++) {
        author_link = "/pages/author.html?id="+authors[i].author_id;
        author_name = authors[i].author.name;
        author_surname = authors[i].author.surname;
        result = result + `<a href="`+author_link+`" class="outgoing">`+author_name+` `+author_surname+`</a>`;
        if(i<authors.length-1 && authors.length>1) result= result + ', '
    }

    return result;
}

//fill the template for a single book
function fillBook(book, authors) {
    const img = "../assets/images/books/"+book.book.imgpath;
    const book_link = "/pages/book.html?id="+book.book_id;
    const title = book.book.title;

    return `<div class="card similar-book-card">
              <a class="outgoing" href="`+book_link+`"><img class="card-img-top" src="`+img+`" alt="Book cover"></a>
              <div class="card-body">
                <h5 class="card-title">`+title+`</h5>
                <small>  by
                  `+createAuthors(authors)+`
                </small>
              </div>
              <div class="card-footer">
                <div class="row ">
                  <div class="col padding-10px">
                    <a href="`+book_link+`" class="btn btn-big btn-outline-primary btn-sm outgoing">
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

//retrieve all the available themes and fill the orientation info with the current one
async function appendThemes(current) {
    const themes = await (await fetch(`/v2/themes`)).json();
    themes.sort();

    let theme;
    for(let i=0; i<themes.length; i++) {
        theme = themes[i].charAt(0).toUpperCase() + themes[i].slice(1);
        $('.list-group').append('<a href="#" id="'+themes[i]+'" class="list-group-item list-group-item-action">'+theme+'</a>');
    }

    if(!current) {
        current = themes[0];
    }
    active = current;
    $("#info").text("Themes / "+active);
    await appendBooks(active);
}

//retrieve the books of the given theme and fill the template for each of them
async function appendBooks(theme) {
    let books;
    if (theme==="All") {
        books = await (await fetch(`/v2/books`)).json();
    }
    else {
        books = await (await fetch(`/v2/books?theme=`+theme)).json()
    }

    let authors;
    let html = "";
    for(let i=0; i<books.length; i++) {
        authors = await (await fetch('/v2/books/'+books[i].book_id+'/authors')).json();
        html = html + fillBook(books[i],authors);
    }
    $('#book-content').append(html);
}



//check if the user is logged in, if so display cart and info in the navbar, otherwise display login and registration button
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
    //when a user adds a book the cart, send the request to the server
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

    //when the user leaves the page, save in local storage the variables for the orientation info of the next page (also the current theme selected)
    $(document).on("click", ".outgoing", function() {
        if(window.location.href.includes("?id="))
            localStorage.setItem("link",window.location.href);
        else
            localStorage.setItem("link",window.location.href+"?id="+active);
        localStorage.setItem("page","<< Themes / "+active);
    });

    //when the user clicks on logout, remove the jwt token from localstorage
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });

    //when the user clicks on a theme, make it active and change the books displayed
    $(document).on("click", ".list-group-item", async function() {
        active = this.id;
        $("#info").text("Themes / "+active);
        $('#book-content').empty();
        await appendBooks(this.id);
    });
});

//retrieve the theme id (if present) and fill the page
$(async function() {
    const id = $.urlParam("id");
    if(id) await appendThemes(id);
    else await appendThemes();
});

