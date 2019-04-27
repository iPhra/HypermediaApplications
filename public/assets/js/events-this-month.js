function fillTemplate(event) {
    const tpl = {
        img: "../assets/images/"+event.event.imgpath,
        event_location: event.event.location,
        event_date: (new Date(event.event.date)).toISOString().substring(0,10),
        event_link: "/pages/event.html?id="+event.event_id
    }
    var template = $('#eventTpl').html();
    return Mustache.to_html(template, tpl);
}

async function appendEvents() {
    const events = await (await fetch('/v2/events/')).json()
    
    let html = "";
    for(let i=0; i<events.length; i++) {
        html = html + fillTemplate(events[i])
    }
    $('#event-content').append(html);
}

$(async function() {
    await appendEvents();
});