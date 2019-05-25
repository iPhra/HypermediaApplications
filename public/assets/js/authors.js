function fillTemplate(author) {
    const img = "../assets/images/authors/"+author.author.imgpath;
    const author_name = author.author.name;
    const author_surname = author.author.surname;
    const author_link = "/pages/author.html?id="+author.author_id;

    return `<div class="col-md-4">
                <div class="card card-event">
                    <a class="outgoing" href="`+author_link+`"><img class="card-img-top" src="`+img+`" alt="Card image cap"></a>
                    <div class="card-body">
                        <div class="card-subtitle">
                            `+author_name+' '+author_surname+`
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <a href="`+author_link+`" class="btn btn-outline-primary btn-sm outgoing">
                            <i class="fa fa-calendar"></i> View more </a>
                    </div>
                </div>
            </div>`;
}

async function appendAuthors() {
    const authors = await (await fetch('/v2/authors')).json();

    let html = "";
    for(let i=0; i<authors.length; i++) {
        html = html + fillTemplate(authors[i])
    }
    $('#author-content').append(html);
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
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });

    $(document).on("click", ".outgoing", function() {
        localStorage.setItem("link",window.location.href);
        localStorage.setItem("page","<< All Authors");
    });
});

$(async function() {
    await appendAuthors();
});
