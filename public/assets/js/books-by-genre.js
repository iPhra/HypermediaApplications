function fillBook(book, author) {
    var tpl = {
        img: book.imgpath,
        book_link: "/pages/book.html?id="+book.book_id,
        author_link: "/pages/author.html?id="+book.book.author_id,
        title: book.book.title,
        price: book.book.current_price,
        author_name: author.name,
        author_surname: author.surname,
    };
    var template = $('#bookTpl').html();
    return Mustache.to_html(template, tpl);
}

async function appendGenres() {
    const genres = await (await fetch(`/v2/genres`)).json();

    for(let i=0; i<genres.length; i++) {
        genre = genres[i].charAt(0).toUpperCase() + genres[i].slice(1)
        $('.list-group').append('<a href="#" id="'+genres[i]+'"class="list-group-item list-group-item-action">'+genre+'</a>');
    }
}

async function appendBooks(genre) {
    var books;
    if (genre=="All") {
        books = await (await fetch(`/v2/books?limit=10`)).json();
    }
    else {
        books = await (await fetch(`/v2/books?genre=`+genre+`&limit=10`)).json()
    }
    
    var author;
    let html = "";
    for(let i=0; i<books.length; i++) {
        author = await (await fetch('/v2/authors/'+books[i].book.author_id)).json();
        html = html + fillBook(books[i],author);
    } 
    $('#book-content').append(html);
}



$(async function() {
    appendGenres();
    appendBooks("All");
});

$(function() {
    $(document).on("click", ".list-group-item", async function(){
        $('#book-content').empty();
        appendBooks(this.id);
    });
})