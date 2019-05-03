function fillBook(book, author) {
    const img = "../assets/images/"+book.book.imgpath;
    const book_link = "/pages/book.html?id="+book.book_id;
    const author_link = "/pages/author.html?id="+book.book.author_id;
    const title = book.book.title;
    const author_name = author.name;
    const author_surname = author.surname;
    
    return`<div class="col-md-4">
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

async function appendThemes() {
    const themes = await (await fetch(`/v2/themes`)).json();

    let theme;
    for(let i=0; i<themes.length; i++) {
        theme = themes[i].charAt(0).toUpperCase() + themes[i].slice(1);
        $('.list-group').append('<a href="#" id="'+themes[i]+'"class="list-group-item list-group-item-action">'+theme+'</a>');
    }
}

async function appendBooks(theme) {
    let books;
    if (theme==="All") {
        books = await (await fetch(`/v2/books?limit=10`)).json();
    }
    else {
        books = await (await fetch(`/v2/books?theme=`+theme+`&limit=10`)).json()
    }
    
    let author;
    let html = "";
    for(let i=0; i<books.length; i++) {
        author = (await fetch('/v2/authors/'+books[i].book.author_id)).json();
        html = html + fillBook(books[i],author);
    } 
    $('#book-content').append(html);
}




$(async function() {
    await appendThemes();
    await appendBooks("All");
});

$(function() {
    $(document).on("click", ".list-group-item", async function(){
        $('#book-content').empty();
        await appendBooks(this.id);
    });
});