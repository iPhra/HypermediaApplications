// Posizione iniziale della mappa
const lat=44.355;
const lon=11.71;
const zoom=13;

$(function() {
    const map = new OpenLayers.Map ("map", {
        controls:[
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.ScaleLine(),
            new OpenLayers.Control.Permalink('permalink'),
            new OpenLayers.Control.MousePosition(),
            new OpenLayers.Control.Attribution()
        ],
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326")
    } );

    const mapnik = new OpenLayers.Layer.OSM("OpenStreetMap (Mapnik)");

    map.addLayer(mapnik);

    const lonLat = new OpenLayers.LonLat( lon ,lat )
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
        );

    map.setCenter (lonLat, zoom);
});

$(function() {
    if(localStorage.getItem("token")) {
        $("#account-area").append('<a href="/pages/cart.html"> <i class="fa fa-shopping-cart" aria-hidden="true"></i></a>\n' +
            '      <div class="fa fa-user" aria-hidden="true">\n' +
            '      </div>' +
            '       <a id="logout" href="#"> <span class="navbar-text text-white">' +
            '            \Logout' +
            '            \      </span> </a>\'')
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