//fill the template for a single event
function fillTemplate(event) {
    const img = "../assets/images/events/"+event.event.imgpath;
    const event_location = event.event.location;
    const event_date= (new Date(event.event.date)).toISOString().substring(0,10);
    const event_link = "/pages/event.html?id="+event.event_id;

    return `<div class="col-md-4">
                <div class="card card-event">
                    <a class="outgoing" href="`+event_link+`"><img class="card-img-top" src="`+img+`" alt="Card image cap"></a>
                    <div class="card-body">
                        <div class="card-subtitle">
                            `+event_location+` | `+event_date+`
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <a href="`+event_link+`" class="btn btn-outline-primary btn-sm outgoing">
                            <i class="fa fa-calendar"></i> View more </a>
                    </div>
                </div>
            </div>`;
}

//retrieve all the events, sort them and fill the template for each of them
async function appendEvents() {
    let events = await (await fetch('/v2/events')).json();
    events.sort( function (a,b) {
        const date_a = new Date(a.event.date);
        const date_b = new Date(b.event.date);
        if ( date_a < date_b)
            return 1;
        else if (date_a > date_b)
            return -1;
        return 0;
    } );

    let html = "";
    for(let i=0; i<events.length; i++) {
        html = html + fillTemplate(events[i])
    }
    $('#event-content').append(html);
}



//check if the user is logged in, if so display cart and info in the navbar, otherwise display login and registration button
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
    //when the user clicks on logout, remove the jwt token from localstorage
    $(document).on("click", "#logout", function(){
        localStorage.removeItem("token");
        location.reload();
    });

    //when the user leaves the page, save in local storage the variables for the orientation info of the next page
    $(document).on("click", ".outgoing", function() {
        localStorage.setItem("link",window.location.href);
        localStorage.setItem("page","<< All Events");
    });
});

//fill the page
$(async function() {
    await appendEvents();
});
