$.urlParam = function(name){
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

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

function fillReview(review) {
    const review_author = review.user_name;
    const review_text = review.text;

    let rating = "";
    for(let i=0; i<review.rating; i++) {
        rating = rating + `<span class=\"fa fa-star checked\"></span>`;
    }
    for(let i=0; i<5-review.rating; i++) {
        rating = rating + `<span class="fa fa-star"></span>`;
    }

    return `<div class="card review">
                      <div class="card-body">
                          <h5 class="card-title">`+review_author+`</h5>
                          <p class="card-text">`+review_text+`</p>
                      </div>
                      <div class="card-footer">
                        `+rating+`
                      </div>
                  </div>`;
}

function fillSimilar(book, authors) {
    const img = "../assets/images/books/"+book.imgpath;
    const book_link = "/pages/book.html?id="+book.book_id;
    const author_link = "/pages/author.html?id="+book.author_id;
    const title = book.title;

    return `<div class="card similar-book-card">
              <img class="card-img-top" src="`+img+`" alt="Book cover">
              <div class="card-body">
                <h5 class="card-title">`+title+`</h5>
                <small>  by
                  <a href="`+author_link+`">`+createAuthors(authors)+`</a>
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
                    <a id=`+book.book_id+` href="#" class="btn btn-outline-primary btn-sm cart">
                      <i class="fa fa-shopping-cart"></i> Add to cart</a>
                  </div>
                </div>
              </div>
            </div>`;
}

function fillEvent(event) {
    const img = "../assets/images/events/"+event.event.imgpath;
    const event_location = event.event.location;
    const event_date = (new Date(event.event.date)).toISOString().substring(0,10);
    const event_link = "/pages/event.html?id="+event.event_id;

    return `<div class="card">
                    <img class="card-img-top" src="`+img+`" alt="Card image cap">
                    <div class="card-body">
                            <div class="card-subtitle">
                                `+event_location+` | `+event_date+`
                            </div>
                    </div>
                    <div class="card-footer text-center">
                        <a href="`+event_link+`" class="btn btn-outline-primary btn-sm">
                            <i class="fa fa-calendar"></i> View more </a>
                    </div>
                </div>`;
}

async function appendReviews(book_id) {
    const reviews =  await (await fetch('/v2/books/'+book_id+'/reviews')).json();

    let html = "";
    for(let i=0; i<reviews.length; i++) {
        html = html + fillReview(reviews[i]);
    }
    $('#review-content').prepend(html);
}

async function appendSimilars(book_id) {
    const similars = await (await fetch('/v2/books/'+book_id+'/similars')).json();

    let authors;
    let html = "";
    for(let i=0; i<similars.length; i++) {
        authors = await retrieveAuthors(similars[i].book_id);
        html = html + fillSimilar(similars[i], authors);
    }
    $('#similar-content').prepend(html);
}

async function appendEvents(book_id) {
    const events = await (await fetch('/v2/books/'+book_id+'/events')).json();

    let html = "";
    for(let i=0; i<events.length; i++) {
        html = html + fillEvent(events[i]);
    }
    $('#event-content').prepend(html);
}

async function appendBook(book_id) {
    let book;
    try {
        book = await (await fetch('/v2/books/' + book_id)).json();
    } catch(error) {
        location.replace("/404.html");
    }
    const authors = await retrieveAuthors(book_id);

    const img = "../assets/images/books/"+book.imgpath;
    const title = book.title;
    const author_link = "/pages/author.html?id="+book.author_id;
    const abstract = book.abstract;
    const genres = (book.genres).join(', ');
    const themes = (book.themes).join(', ');
    const num_of_pages = book.num_of_pages;
    const cover_type = book.cover_type;

    const tpl = `<div class="row">
                    <div class="col-lg-5">
                        <img alt="book_img" class="img-fluid align-content-center" src="`+img+`">
                    </div>
                    <div class="col-lg-7">
                        <span class="h4">`+title+`</span> <br>
                        <span class="h6">by <a href="`+author_link+`">`+createAuthors(authors)+`</a></span> <hr>
                        <div>
                            <span class="abstract">
                                `+abstract+`
                            </span>
                            <a id="read-more" href="#abstract"> Read more</a>
                        </div>
                        Details:
                        <ul>
                          <li>Genres: `+genres+`</li>
                          <li>Themes: `+themes+`</li>
                          <li>Number of pages: `+num_of_pages+`</li>
                          <li>Cover type: `+cover_type+`</li>
                        </ul>
                    </div>
                </div>
                <hr>`;

    $('#book-content').prepend(tpl);
    $('#price').text(book.current_price+"€");
    $('#interview').text(book.interview);
    $('#abstract').text(book.abstract);
    $('#right-cart').children("a").attr("id",book_id);
    $("title").text(title);
}



$(document).on("click", "#read-more", function() {
    $("#book-tab-content").addClass('active').addClass('show').siblings().removeClass('active').removeClass('show');
    $("#book-tab").addClass('active').addClass('show').parent().siblings().children().removeClass('active').removeClass('show');
    location.href = "#book-tab";
});

$(document).ready(function(){
    $(window).scroll(function(){
        const newPos = $(document).scrollTop();
        $('.floating-price').css( {top:newPos});
    })
});

$(async function() {
    const book_id = $.urlParam("id");
    await appendBook(book_id);
    await appendReviews(book_id);
    await appendSimilars(book_id);
    await appendEvents(book_id);
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
    $(window).on("beforeunload", function() {
        localStorage.setItem("link",window.location.href);
        localStorage.setItem("page","<< Back to book: "+$("title").text());
    })
});

$(function() {
    $("#info").attr("href",localStorage.getItem("link")).text(localStorage.getItem("page"));
});


