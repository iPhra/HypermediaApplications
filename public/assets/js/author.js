$.urlParam = function(name){
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

function fillBook(book) {
    const img = "../assets/images/books/"+book.book.imgpath;
    const title = book.book.title;
    const book_link = "/pages/book.html?id="+book.book_id;

    return `<div class="card author-book-card">
                        <img class="card-img-top" src="`+img+`" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">`+title+`</h5>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col padding-10px">
                                    <a href="`+book_link+`" class="btn btn-big btn-outline-primary btn-sm outgoing">
                                        <i class="fa fa-book"></i>
                                        <div>View Book</div></a>
                                </div>
                                <div class="col padding-10px cart-btn-col">
                                    <a id="`+book.book_id+`" href="#" class="btn btn-big btn-outline-primary btn-sm cart">
                                        <i class="fa fa-shopping-cart"></i> <div>Add to cart</div></a>
                                </div>
                            </div>
                        </div>
                    </div>`;
}

async function appendAuthor(author_id) {
    let author;
    try {
        author = await (await fetch('/v2/authors/' + author_id)).json();
    } catch(error) {
        location.replace("/404.html");
    }

    $("#author-picture").attr("src", "../assets/images/authors/"+author.imgpath);
    $("#author-name").text(author.name + " " + author.surname);
    $("title").text(author.name + " " + author.surname);
    $("#biography").text(author.biography);
}

async function appendBooks(author_id) {
    const books = await (await fetch('/v2/authors/'+author_id+'/books')).json();

    let html = "";
    for(let i=0; i<books.length; i++) {
        html = html + fillBook(books[i]);
    }
    $('#book-content').append(html);
}




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
    $("#info").attr("href",localStorage.getItem("link")).text(localStorage.getItem("page"));

    $(document).on("click", ".outgoing", function() {
        localStorage.setItem("link",window.location.href);
        localStorage.setItem("page","<< Authors / "+$("title").text());
    });

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

    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });
});

$(async function() {
    const author_id = $.urlParam("id");
    await appendAuthor(author_id);
    await appendBooks(author_id);
});


