function appendGenres() {
    fetch(`/v2/genres`)
    .then(function(response) {
        return response.json();
    })
    .then(function(genres) {
        for(let i=0; i<genres.length; i++) {
            genre = genres[i].charAt(0).toUpperCase() + genres[i].slice(1)
            $('.list-group').append('<a href="#" class="list-group-item list-group-item-action">'+genre+'</a>');
        }
    })
}

function appendBooks(genre) {
    var promise;
    if (genre=="All") {
        promise = fetch(`/v2/books?limit=10`)
        .then(function(response) {
            return response.json();
        })
    }
    else {
        promise = fetch(`/v2/books/search?genre=`+genre+`&limit=10`)
        .then(function(response) {
            return response.json();
        })
    }
    promise.then(function(books) {
        for(let i=0; i<books.length; i++) {
            fillTemplate(books[i]);
        } 
    })
}

function fillTemplate(book) {
    var book = {
        img: book.imgpath,
        title: book.title,
        price: book.current_price,
        authors_name: book.authors[0]? book.authors[0].name : "",
        authors_surname: book.authors[0]? book.authors[0].surname : ""
    };
    var template = $('#cardTpl').html();
    var html = Mustache.to_html(template, book);
    $('#content').append(html);
}

$(function() {
    appendGenres();
    appendBooks("All");
});

$(function() {
    $(document).on("click", ".list-group-item", function(){
        alert("The genre was clicked.");
    });
})