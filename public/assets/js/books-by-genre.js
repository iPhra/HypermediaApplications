function fillBook(book, author) {
    const img = "../assets/images/"+book.book.imgpath;
    const book_link = "/pages/book.html?id="+book.book_id;
    const author_link = "/pages/author.html?id="+book.book.author_id;
    const title = book.book.title;
    const price = book.book.current_price;
    const author_name = author.name;
    const author_surname = author.surname;
    
    const tpl = `<div class="col-md-4">
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
          </div>`
    
    return tpl;
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
    await appendGenres();
    await appendBooks("All");
});

$(function() {
    $(document).on("click", ".list-group-item", async function(){
        $('#book-content').empty();
        appendBooks(this.id);
    });
})