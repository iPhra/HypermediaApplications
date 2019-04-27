$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

function fillBook(book) {
    const tpl = {
        img: "../assets/images/"+book.imgpath,
        title: book.title,
        book_link: "/pages/book.html?id="+book.book_id
    };
    const template = $('#bookTpl').html();
    return Mustache.to_html(template, tpl);
}

async function appendAuthor(author_id) {
    const author = await (await fetch('/v2/authors/'+author_id)).json();
    
    const tpl = {
        img: "../assets/images/"+author.imgpath,
        author_name: author.name,
        author_surname: author.surname,
        biography: author.biography,
    };
    const template = $('#authorTpl').html();
    const html = Mustache.to_html(template, tpl);
    $('#author-content').prepend(html);
}

async function appendBooks(author_id) {
    const books = await (await fetch('/v2/authors/'+author_id+'/books')).json()
    
    let html = "";
    for(let i=0; i<books.length; i++) {
        html = html + fillBook(books[i]);
    }
    $('#book-content').append(html);
}


   
$(async function() {
    const author_id = $.urlParam("id"); 
    await appendAuthor(author_id);
    await appendBooks(author_id);
});
