function fillBook(book, author) {
    const img = "../assets/images/"+book.book.imgpath;
    const book_link = "/pages/book.html?id="+book.book_id;
    const author_link = "/pages/author.html?id="+book.book.author_id;
    const title = book.book.title;
    const author_name = author.name;
    const author_surname = author.surname;
    
    return`<div class="col-md-4">
            <div class="card similar-book-card">
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
                    <a href="`+book_link+`" class="btn btn-outline-primary btn-sm">
                      <i class="fa fa-book"></i>
                      View Book</a>
                  </div>
                  <div class="col padding-10px">
                    <a id="`+book.book_id+`" href="#" class="btn btn-outline-primary btn-sm cart">
                      <i class="fa fa-shopping-cart"></i> Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
}

async function appendThemes() {
    const themes = await (await fetch(`/v2/themes`)).json();

    let theme;
    for(let i=0; i<themes.length; i++) {
        theme = themes[i].charAt(0).toUpperCase() + themes[i].slice(1);
        $('.list-group').append('<a href="#" id="'+themes[i]+'"class="list-group-item list-group-item-action">'+theme+'</a>');
    }
}

async function appendBooks(theme) {
    let books;
    if (theme==="All") {
        books = await (await fetch(`/v2/books?limit=10`)).json();
    }
    else {
        books = await (await fetch(`/v2/books?theme=`+theme+`&limit=10`)).json()
    }
    
    let author;
    let html = "";
    for(let i=0; i<books.length; i++) {
        author = await (await fetch('/v2/authors/'+books[i].book.author_id)).json();
        html = html + fillBook(books[i],author);
    } 
    $('#book-content').append(html);
}




$(async function() {
    await appendThemes();
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