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
function fillCart(book, authors) {
    const img = "../assets/images/books/"+book.imgpath;
    const title = book.title;
    const price = book.current_price;
    const quantity = book.quantity;
    const id = book.book_id;
    const book_link = "/pages/book.html?id="+book.book_id;

    return `<div class="card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <img alt="book_img" class="img-fluid align-content-center" src="`+img+`">
                        </div>
                        <div class="col-md-7">
                            <a href="`+book_link+`" class="outgoing"><h5 class="card-title">`+title+`</h5></a>
                            <div class="card-text">by `+createAuthors(authors)+`</div>
                        </div>
                        <div class="col-md-3">
                            <div class="row text-center">
                                <div class="col-md-12">
                                    `+quantity+` x `+price+`€ <hr>
                                    <a id="`+id+`" class="remove" href="#">
                                    <i class="fa fa-trash"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>`;
}

//retrieve the full cart and fill the template for each book retrieved
async function appendCart() {
    const token = localStorage.getItem("token");

    $.ajax({
        url: '/v2/account/cart',
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: async function (cart) {
            let authors;
            let html = "";
            for(let i=0; i<cart.book_list.length; i++) {
                authors = await (await fetch('/v2/books/'+cart.book_list[i].book_id+'/authors')).json();
                html = html + fillCart(cart.book_list[i], authors);
            }
            $('#cart-content').prepend(html);
            $("#total_price").prepend(cart.total_price)
        },
        error: function(jqXHR, textStatus, errorThrown) {
                alert("Error " + jqXHR.status +
                      ": " + errorThrown
                );
        }
    });
}



//check if the user is logged in, if so allow access to page, otherwise redirect to login
$(async function() {
    if(localStorage.getItem("token")) {
        $("#account-area").append('<a href="/pages/cart.html"> <i class="fa fa-shopping-cart" aria-hidden="true"></i></a>\n' +
            '      <a href="/pages/user-info.html"> <i class="fa fa-user" aria-hidden="true">\n' +
            '      </i></a>' +
            '       <a id="logout" href="#"> <span class="navbar-text text-white">' +
            '            \Logout' +
            '            \      </span> </a>');

        await appendCart();
    }
    else {
        alert("You must be logged in to access your cart!");
        location.href = "/pages/login.html";
    }
});

$(function() {
    //when the user leaves the page, save in local storage the variables for the orientation info of the next page
    $(document).on("click", ".outgoing", function() {
        localStorage.setItem("link",window.location.href);
        localStorage.setItem("page","<< Cart");
    });

    //when the user clicks on logout, remove the jwt token from localstorage and redirect to homepage
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        alert("Logout successful");
        location.replace("/");
    });

    //when the user clicks on checkout, send a request to the server to buy everything and empty the cart
    $(document).on("click", "#checkout", async function(){
        const token = localStorage.getItem("token");

        $.ajax({
            url: '/v2/account/cart/checkout',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            dataType: "text",
            success: function () {
                location.reload();
                alert("Items bought successfully!")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error " + jqXHR.status +
                    ": " + errorThrown);
            }
        });
    });

    //when the user clicks on empty, send a user to the server to empty the cart
    $(document).on("click", "#empty", function(){
        const token = localStorage.getItem("token");

        $.ajax({
            url: '/v2/account/cart/empty',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            dataType: "text",
            success: function () {
                location.reload();
                alert("Cart emptied successfully!")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error " + jqXHR.status +
                    ": " + errorThrown);
            }
        });
    });

    //when the user clicks on remove, send a request to the server to remove the book from the cart
    $(document).on("click", ".remove", function(){
        const token = localStorage.getItem("token");
        const id = $(this).attr("id");

        $.ajax({
            url: '/v2/account/cart',
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            data: JSON.stringify({book_id: parseInt(id)}),
            dataType: "text",
            contentType: "application/json",
            success: function () {
                location.reload();
                alert("Item removed successfully!")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error " + jqXHR.status +
                    ": " + errorThrown);
            }
        });
    });
});
