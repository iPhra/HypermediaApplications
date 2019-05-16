$.urlParam = function(name){
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
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

    const date = (new Date(event.date)).toISOString().substring(0,10);
    $('#location').text(" " + event.location);
    $('#book_link').attr("href","/pages/book.html?id="+event.book_id);
    $('#book_title').text(" " + book.title);
    $('#date').text(" " + date);
    $('#email').text(" " + event.organiser_email);
    $('#description').text(event.description);
    $('#img').attr("src", "../assets/images/events/"+event.imgpath);
    $("title").text(event.location + " - " +date);
}




$(async function() {
    const event_id = $.urlParam("id"); 
    await appendEvent(event_id);
});

$(function() {
    if(localStorage.getItem("token")) {
        $("#account-area").append('<a href="/pages/cart.html"> <i class="fa fa-shopping-cart" aria-hidden="true"></i></a>\n' +
            '      <a href="/pages/user-info.html"> <i class="fa fa-user" aria-hidden="true">\n' +
            '      </i></a>' +
            '       <a id="logout" href="#"> <span class="navbar-text text-white">' +
            '            \Logout' +
            '            \      </span> </a>')
    }
    else {
        $("#account-area").append('<a href="/pages/login.html"> <span class="navbar-text text-white">\n' +
            '      Login\n' +
            '      </span> </a>\n' +
            '      <span class="text-white">|</span>\n' +
            '      <a href="/pages/registration.html"> <span class="navbar-text text-white">\n' +
            '      Register\n' +
            '      </span> </a>')
    }
});

$(function() {
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });
});

$(function() {
    $(document).on("click", ".outgoing", function() {
        localStorage.setItem("link",window.location.href);
        localStorage.setItem("page","<< Event / "+$("title").text());
    })
});

$(function() {
    $("#info").attr("href",localStorage.getItem("link")).text(localStorage.getItem("page"));
});