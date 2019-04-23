$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

async function retrieveEvent(event_id) {
    return (await fetch('/v2/events/'+event_id)).json()
}

async function retrieveBook(book_id) {
    return (await fetch('/v2/books/'+book_id)).json()
}

function fillEvent(event, book) {
    $('#location').text(" " + event.location);
    $('#book_img').attr("href","/pages/book.html?id="+book.book_id);
    $('#book_title').text(" " + book.title);
    $('#date').text(" " + (new Date(event.date)).toISOString().substring(0,10));
    $('#email').text(" " + event.organiser_email);
    $('#description').text(event.description);
    $('#img').attr("src", "../assets/images/"+event.imgpath);
}


async function initialise() {
    const event_id = $.urlParam("id"); 
    const event = await retrieveEvent(event_id);
    const book = await retrieveBook(event.book_id);
    fillEvent(event, book);
}



   
$(document).ready(async function() {
    console.log($.urlParam("id"));
    await initialise();
});
