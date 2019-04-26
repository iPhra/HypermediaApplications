async function retrieveEvents() {
    return (await fetch('/v2/events/')).json()
}

function appendEvents(events) {
    for(let i=0; i<events.length; i++) {
        fillTemplate(events[i])
    }
}

function fillTemplate(event) {
    const tpl = {
        img: "../assets/images/"+event.event.imgpath,
        event_location: event.event.location,
        event_date: (new Date(event.event.date)).toISOString().substring(0,10),
        event_link: "/pages/event.html?id="+event.event_id
    }
    var template = $('#eventTpl').html();
    var html = Mustache.to_html(template, tpl);
    $('#event-content').append(html);
}

$(document).ready(async function() {
    const events = await retrieveEvents();
    appendEvents(events);
});