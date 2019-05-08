function fillCart(book, author) {
    const img = "../assets/images/books/"+book.imgpath;
    const title = book.title;
    const price = book.current_price;
    const quantity = book.quantity;
    const author_name = author.name;
    const author_surname = author.surname;
    const id = book.book_id;

    let s = `<div class="card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <img class="img-fluid align-content-center" src="`+img+`">
                        </div>
                        <div class="col-md-7">
                            <h5 class="card-title">`+title+`</h5>
                            <div class="card-text">`+author_name+` `+author_surname+`</div>
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
    return s;
}

async function appendCart() {
    const token = localStorage.getItem("token");

    $.ajax({
        url: '/v2/account/cart',
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: async function (cart) {
            let author;
            let html = "";
            for(let i=0; i<cart.book_list.length; i++) {
                author = await (await fetch('/v2/authors/'+cart.book_list[i].author_id)).json();
                html = html + fillCart(cart.book_list[i], author);
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



$(function() {
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

$(function() {
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
});

$(function() {
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
});

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
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });
});
