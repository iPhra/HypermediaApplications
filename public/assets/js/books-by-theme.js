async function appendThemes() {
    const themes = await (await fetch(`/v2/themes`)).json();

    for(let i=0; i<themes.length; i++) {
        theme = themes[i].charAt(0).toUpperCase() + themes[i].slice(1)
        $('.list-group').append('<a href="#" id="'+themes[i]+'"class="list-group-item list-group-item-action">'+theme+'</a>');
    }
}

async function appendBooks(theme) {
    var books;
    if (theme=="All") {
        books = await (await fetch(`/v2/books?limit=10`)).json();
    }
    else {
        books = await (await fetch(`/v2/books?theme=`+theme+`&limit=10`)).json()
    }
    
    var author;
    for(let i=0; i<books.length; i++) {
        author = await retrieveAuthor(books[i].book.author_id);
        fillTemplate(books[i],author);
    } 
}

async function retrieveAuthor(author_id) {
    return (await fetch('/v2/authors/'+author_id)).json()
}

function fillTemplate(book, author) {
    var book = {
        img: book.imgpath,
        book_link: "/pages/book.html?id="+book.book_id,
        title: book.book.title,
        price: book.book.current_price,
        authors_name: author.name,
        authors_surname: author.surname,
        abstract: book.bookabstract ? book.book.abstract : "Lorem ipsum dolor",
        rank: book.rank
    };
    var template = $('#cardTpl').html();
    var html = Mustache.to_html(template, book);
    $('#content').append(html);
}

$(async function() {
    appendThemes();
    appendBooks("All");
});

$(function() {
    $(document).on("click", ".list-group-item", async function(){
        $('#content').empty();
        appendBooks(this.id);
    });
})