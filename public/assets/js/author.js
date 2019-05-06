$.urlParam = function(name){
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

function fillBook(book) {
    const img = "../assets/images/"+book.book.imgpath;
    const title = book.book.title;
    const book_link = "/pages/book.html?id="+book.book_id;
    
    return `<div class="col-md-4 margin-top-10">
                    <div class="card author-book-card">
                        <img class="card-img-top" src="`+img+`" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">`+title+`</h5>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col padding-10px">
                                    <a href="`+book_link+`" class="btn btn-outline-primary btn-sm">
                                        <i class="fa fa-book"></i>
                                        View Book</a>
                                </div>
                                <div class="col padding-10px">
                                    <a href="{{link_add_to_cart}}" class="btn btn-outline-primary btn-sm">
                                        <i class="fa fa-shopping-cart"></i> Add to cart </a>
                                </div>
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
    
    $("#author-picture").attr("src", "../assets/images/"+author.imgpath);
    $("#author-name").text(author.name + " " + author.surname);
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


   
$(async function() {
    const author_id = $.urlParam("id"); 
    await appendAuthor(author_id);
    await appendBooks(author_id);
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