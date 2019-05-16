counter = 0;

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

async function retrieveAuthors(book_id) {
    return (await fetch('/v2/books/'+book_id+'/authors')).json()
}

function fillBook(book, authors) {
    const img = "../assets/images/books/"+book.book.imgpath;
    const title = book.book.title;
    const book_link = "/pages/book.html?id="+book.book_id;
    const rank = book.rank;

    return `<div class="card">
        <div class="card-header">
            <div class="rank">
                <h4>`+rank+`</h4>
            </div>
        </div>
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
                    <a href="`+book_link+`" class="btn btn-big btn-outline-primary btn-sm outgoing">
                        <i class="fa fa-book"></i>
                        View Book</a>
                </div>
                <div class="col padding-10px">
                    <a id="`+book.book_id+`" href="#" class="btn btn-outline-primary btn-sm cart">
                        <i class="fa fa-shopping-cart"></i> Add to cart</a>
                </div>
            </div>
        </div>
    </div>`;
}

async function appendTop10() {
    let books = await (await fetch(`/v2/books/top10`)).json();
    let authors;

    let html = "";
    for(let i=0; i<books.length; i++) {
        books[i]["rank"] = i+1;
        authors = await retrieveAuthors(books[i].book_id);
        html = html + fillBook(books[i],authors);
    }

    $('#card-deck').append(html);
}

$(async function() {
    await appendTop10();
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

$(function() {
    $(document).on("click", ".outgoing", function() {
        localStorage.setItem("link",window.location.href);
        localStorage.setItem("page","<< Back to Bestsellers");
    })
});


