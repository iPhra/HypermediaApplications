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

function fillBook(book, author) {
    const tpl = {
        img: "../assets/images/"+book.imgpath,
        title: book.title,
        author_name: author.name,
        author_surname: author.surname,
        abstract: book.abstract,
        genres: book.genres,
        themes: book.themes,
        num_of_pages: book.num_of_pages,
        cover_type: book.cover_type
    };
    const template = $('#bookTpl').html();
    const html = Mustache.to_html(template, tpl);
    $('#book-content').prepend(html);
}

function fillPrice(book) {
    $('#price').text(book.current_price+"€");
}

function fillInterview(book, author) {
    $('#author').text(author.name+" "+author.surname);
    $('#interview').text(book.interview);
}

function fillReview(review) {
    const tpl = {
        review_author: review.user_name,
        review_text: review.text,
        review_rating: review.rating
    }
    const template = $('#reviewTpl').html();
    const html = Mustache.to_html(template, tpl);
    $('#review-content').prepend(html);
}

function fillSimilar(book) {
    const tpl = {
        img: "../assets/images/"+book.imgpath,
        similar_title: book.title,
        similar_abstract: book.abstract,
        link: "/pages/book.html?id="+book.book_id
    }
    const template = $('#similarTpl').html();
    const html = Mustache.to_html(template, tpl);
    $('#similar-content').prepend(html);
}

function appendReviews(reviews) {
    for(let i=0; i<reviews.length; i++) {
        fillReview(reviews[i]);
    }
}

function appendSimilars(similars) {
    for(let i=0; i<similars.length; i++) {
        fillSimilar(similars[i]);
    }
}

async function initialise() {
    const book_id = $.urlParam("id"); 
    const book = await retrieveBook(book_id);
    const author = await retrieveAuthor(book.author_id);
    const reviews = await retrieveReviews(book_id);
    const similars = await retrieveSimilars(book_id)
    fillBook(book, author);
    fillPrice(book);
    fillInterview(book, author);
    appendReviews(reviews);
    appendSimilars(similars);
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
