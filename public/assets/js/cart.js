function fillCart(book, author) {
    const title = book.title;
    const price = book.price;
    const quantity = book.quantity;
    const author_name = author.name;
    const author_surname = author.surname;
    
    const tpl = `<div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="img-responsive" src="http://placehold.it/150x100">
                        </div>
                        <div class="col-md-6">
                            <h5 class="card-title">`+title+`</h5>
                            <div class="card-text">`+author_name+` `+author_surname+`</div>
                        </div>
                        <div class="col-md-3">
                            <div class="row text-center">
                                <div class="col-md-12">
                                    `+quantity+` x `+price+`€ <hr>
                                    <a href="#">
                                    <i class="fa fa-trash"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>`
    
    return tpl;
}

async function appendCart() {
    const token = localStorage.getItem("token");
          
    $.ajax({
        url: '/v2/account/cart',
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (cart) {
            let html = "";
            for(let i=0; i<cart.book_list.length; i++) {
                author = await (await fetch('/v2/authors/'+cart.book_list[i].author_id)).json();
                html = html + fillCart(cart.book_list[i], author);
            } 
            $('#cart-content').append(html);
        },
        error: function () {
            alert("erorr");
        },
    });
}



$(async function() {
    await appendCart();
});