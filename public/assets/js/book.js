$.urlParam = function(name){
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

async function retrieveAuthor(author_id) {
    return (await fetch('/v2/authors/'+author_id)).json()
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

function fillSimilar(book, author) {
    const img = "../assets/images/"+book.imgpath;
    const book_link = "/pages/book.html?id="+book.book_id;
    const author_link = "/pages/author.html?id="+book.author_id;
    const title = book.title;
    const author_name = author.name;
    const author_surname = author.surname;

    return `<div class="col-md-4">
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
                    <a href="{{link_add_to_cart}}" class="btn btn-outline-primary btn-sm">
                      <i class="fa fa-shopping-cart"></i> Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
}

function fillEvent(event) {
    const img = "../assets/images/"+event.event.imgpath;
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

    let author;
    let html = "";
    for(let i=0; i<similars.length; i++) {
        author = await retrieveAuthor(similars[i].author_id);
        html = html + fillSimilar(similars[i], author);
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
    const author = await retrieveAuthor(book.author_id);

    const img = "../assets/images/"+book.imgpath;
    const title = book.title;
    const author_link = "/pages/author.html?id="+book.author_id;
    const author_name = author.name;
    const author_surname = author.surname;
    const abstract = book.abstract;
    const genres = (book.genres).join(', ');
    const themes = (book.themes).join(', ');
    const num_of_pages = book.num_of_pages;
    const cover_type = book.cover_type;

    const tpl = `<div class="row">
                    <div class="col-lg-5">
                        <img class="img-fluid align-content-center" src="`+img+`">
                    </div>
                    <div class="col-lg-7">
                        <span class="h4">`+title+`</span> <br>
                        <span class="h6"><a href="`+author_link+`">`+author_name+` `+author_surname+`</a></span> <hr>
                        <div>
                            <span class="abstract">
                                `+abstract+`
                            </span>
                            <a id="read-more" href="#"> Read more</a>
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
