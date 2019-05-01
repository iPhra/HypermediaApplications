function fillBook(book, author) {
    var tpl = {
        img: "../assets/images/"+book.book.imgpath,
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
    
    let author;
    let html = "";
    for(let i=0; i<books.length; i++) {
        author = (await fetch('/v2/authors/'+books[i].book.author_id)).json()
        html = html + fillBook(books[i],author);
    } 
    $('#book-content').append(html);
}




$(async function() {
    appendThemes();
    appendBooks("All");
});

$(function() {
    $(document).on("click", ".list-group-item", async function(){
        $('#book-content').empty();
        appendBooks(this.id);
    });
})