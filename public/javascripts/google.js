var latitude;
var longitude;
var map;

function initMap() {
    var destLatitude = document.querySelector('#map').attributes.latitude.value;
    var destLongitude = document.querySelector('#map').attributes.longitude.value;
    destLatitude = parseFloat(destLatitude);
    destLongitude = parseFloat(destLongitude);

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(64.1532475, -22.0068169),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
}

// function getLocation() {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(showPosition);
//         } else { 
//             console.log("Geolocation is not supported by this browser.");
//         }
//     }

//     function showPosition(position) {
//         latitude = position.coords.latitude;
//         longitude = position.coords.longitude;
//         initMap();
//     }

google.maps.event.addDomListener(window, 'load', initMap);