$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

async function retrieveAuthor(author_id) {
    return (await fetch('/v2/authors/'+author_id)).json()
}

async function retrieveBook(book_id) {
    return (await fetch('/v2/books/'+book_id)).json()
}

async function retrieveReviews(book_id) {
    return (await fetch('/v2/books/'+book_id+'/reviews')).json()
}

async function retrieveSimilars(book_id) {
    return (await fetch('/v2/books/'+book_id+'/similars')).json()
}

async function retrieveEvents(book_id) {
    return (await fetch('/v2/books/'+book_id+'/events')).json()
}

function fillBook(book, author) {
    const tpl = {
        img: "../assets/images/"+book.imgpath,
        title: book.title,
        author_link: "/pages/author.html?id="+book.author_id,
        author_name: author.name,
        author_surname: author.surname,
        abstract: book.abstract,
        genres: (book.genres).join(', '),
        themes: (book.themes).join(', '),
        num_of_pages: book.num_of_pages,
        cover_type: book.cover_type
    };
    const template = $('#bookTpl').html();
    const html = Mustache.to_html(template, tpl);
    $('#book-content').prepend(html);
    $('#price').text(book.current_price+"€");
    $('#interview').text(book.interview);
    $('#abstract').text(book.abstract);
}

function fillReview(review) {
    const tpl = {
        review_author: review.user_name,
        review_text: review.text,
        review_rating: review.rating
    }
    const template = $('#reviewTpl').html();
    return Mustache.to_html(template, tpl);
}

function fillSimilar(book, author) {
    const tpl = {
        img: "../assets/images/"+book.imgpath,
        similar_title: book.title,
        author_name: author.name,
        author_surname: author.surname,
        author_link: "/pages/author.html?id=0",
        book_link: "/pages/book.html?id="+book.book_id
    }
    const template = $('#similarTpl').html();
    return Mustache.to_html(template, tpl);
}

function fillEvent(event) {
    const tpl = {
        img: "../assets/images/"+event.event.imgpath,
        event_location: event.event.location,
        event_date: (new Date(event.event.date)).toISOString().substring(0,10),
        event_link: "/pages/event.html?id="+event.event_id
    }
    const template = $('#eventTpl').html();
    return Mustache.to_html(template, tpl);
}

function appendReviews(reviews) {
    let html = "";
    for(let i=0; i<reviews.length; i++) {
        html = html + fillReview(reviews[i]);
    }
    $('#review-content').prepend(html);
}

async function appendSimilars(similars) {
    let author;
    let html = "";
    for(let i=0; i<similars.length; i++) {
        author = await retrieveAuthor(similars[i].author_id);
        html = html + fillSimilar(similars[i], author);
    }
    $('#similar-content').prepend(html);
}

function appendEvents(events) {
    let html = "";
    for(let i=0; i<events.length; i++) {
        html = html + fillEvent(events[i]);
    }
    $('#event-content').prepend(html);
}

async function initialise() {
    const book_id = $.urlParam("id"); 
    const book = await retrieveBook(book_id);
    const author = await retrieveAuthor(book.author_id);
    const reviews = await retrieveReviews(book_id);
    const similars = await retrieveSimilars(book_id);
    const events = await retrieveEvents(book_id);
    fillBook(book, author);
    appendReviews(reviews);
    await appendSimilars(similars);
    appendEvents(events);
}




$(document).ready(function(){
    $(window).scroll(function(){
         var newPos = $(document).scrollTop();
         $('.floating-price').css( {top:newPos});
    })
});
   
$(document).ready(async function() {
    console.log($.urlParam("id"));
    await initialise();
});
