function fillTemplate(event) {
    const img = "../assets/images/"+event.event.imgpath;
    const event_location = event.event.location;
    const event_date= (new Date(event.event.date)).toISOString().substring(0,10);
    const event_link = "/pages/event.html?id="+event.event_id;
    
    const tpl = `<div class="col-md-4">
                <div class="card card-event">
                    <img class="card-img-top" src="`+img+`" alt="Card image cap">
                    <div class="card-body">
                        <div class="card-subtitle">
                            `+event_location+` | `+event_date+`
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <a href="`+event_link+`" class="btn btn-outline-primary btn-sm">
                            <i class="fa fa-calendar"></i> View more </a>
                    </div>
                </div>
            </div>`
    
    return tpl;
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