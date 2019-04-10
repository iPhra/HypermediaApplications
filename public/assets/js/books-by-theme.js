function appendThemes() {
    fetch(`/v2/themes`)
    .then(function(response) {
        return response.json();
    })
    .then(function(themes) {
        for(let i=0; i<themes.length; i++) {
            theme = theme[i].charAt(0).toUpperCase() + themes[i].slice(1)
            $('.list-group').append('<a href="#" id="'+themes[i]+'"class="list-group-item list-group-item-action">'+theme+'</a>');
        }
    })
}

function appendBooks(theme) {
    var promise;
    if (theme=="All") {
        promise = fetch(`/v2/themes?limit=10`)
        .then(function(response) {
            return response.json();
        })
    }
    else {
        promise = fetch(`/v2/themes/search?genre=`+theme+`&limit=10`)
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
    appendThemes();
    appendBooks("All");
});

$(function() {
    $(document).on("click", ".list-group-item", function(){
        $('#content').empty();
        console.log(this.id);
        appendBooks(this.id);
    });
})