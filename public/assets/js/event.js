$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
};

async function appendEvent(event_id) {
    let event;
    try {
        event = await (await fetch('/v2/events/' + event_id)).json();
    } catch(error) {
        location.replace("/404.html");
    }
    const book = await (await fetch('/v2/books/'+event.book_id)).json();
    
    $('#location').text(" " + event.location);
    $('#book_link').attr("href","/pages/book.html?id="+event.book_id);
    $('#book_title').text(" " + book.title);
    $('#date').text(" " + (new Date(event.date)).toISOString().substring(0,10));
    $('#email').text(" " + event.organiser_email);
    $('#description').text(event.description);
    $('#img').attr("src", "../assets/images/"+event.imgpath);
}



$(async function() {
    const event_id = $.urlParam("id"); 
    await appendEvent(event_id);
});
