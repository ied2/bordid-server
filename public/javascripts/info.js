google.maps.event.addDomListener(window, 'load', init);

	var latitude;
	var longitude;
	var directionsDisplay;
	var directionsService;

	function init() {
		var driving = document.querySelector("#driving");
	    var walking = document.querySelector("#walking");
	    var back = document.querySelector("#backButton");

	    back.addEventListener("click", function (e) {
            history.back();
        });

	    driving.addEventListener("click", function () {
	        calcRouteDriving();
	    });

	    walking.addEventListener("click", function () {
	        calcRouteWalking();
	    });

	    initMap();
		// getLocation();
	}

	function initMap() {
		latitude = document.querySelector('#map').attributes.userLatitude.value;
		longitude = document.querySelector('#map').attributes.userLongitude.value;
		latitude = parseFloat(latitude);
		longitude = parseFloat(longitude);
		
		console.log(latitude);
		console.log(longitude);
		directionsDisplay = new google.maps.DirectionsRenderer;
		directionsService = new google.maps.DirectionsService;
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 14,
			center: {lat: latitude, lng: longitude}
		});
		directionsDisplay.setMap(map);

		calculateAndDisplayRoute(directionsService, directionsDisplay);
	}

	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
		var destLatitude = document.querySelector('#map').attributes.latitude.value;
		var destLongitude = document.querySelector('#map').attributes.longitude.value;
		destLatitude = parseFloat(destLatitude);
		destLongitude = parseFloat(destLongitude);

	  	directionsService.route({
		    origin: {lat: latitude, lng: longitude},
		    destination: {lat: destLatitude, lng: destLongitude},
		    travelMode: google.maps.TravelMode.DRIVING
	  	}, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	    	directionsDisplay.setDirections(response);
	    } else {
	    	window.alert('Directions request failed due to ' + status);
	    }
	  });
	}

	function calcRouteDriving() {
	    var destLatitude = document.querySelector('#map').attributes.latitude.value;
		var destLongitude = document.querySelector('#map').attributes.longitude.value;
		destLatitude = parseFloat(destLatitude);
		destLongitude = parseFloat(destLongitude);

	    var start = new google.maps.LatLng(latitude, longitude);
	    var end = new google.maps.LatLng(destLatitude, destLongitude);
	    var request = {
	        origin: start,
	        destination: end,
	        travelMode: google.maps.DirectionsTravelMode.DRIVING
	    };
	    directionsService.route(request, function(response, status) {
	        if(status == google.maps.DirectionsStatus.OK) {
	            directionsDisplay.setDirections(response);
	        }
	    });
	}

	function calcRouteWalking() {
		var destLatitude = document.querySelector('#map').attributes.latitude.value;
		var destLongitude = document.querySelector('#map').attributes.longitude.value;
		destLatitude = parseFloat(destLatitude);
		destLongitude = parseFloat(destLongitude);

	    var start = new google.maps.LatLng(latitude, longitude);
	    var end = new google.maps.LatLng(destLatitude, destLongitude);
	    var request = {
	        origin: start,
	        destination: end,
	        travelMode: google.maps.DirectionsTravelMode.WALKING
	    };
	    directionsService.route(request, function(response, status) {
	        if(status == google.maps.DirectionsStatus.OK) {
	            directionsDisplay.setDirections(response);
	        }
	    });
	}

	// function getLocation() {
	//     if (Modernizr.geolocation) {
	//         navigator.geolocation.getCurrentPosition(showPosition);
	//     } else { 
	//         console.log("Geolocation is not supported by this browser.");
	//     }
	// }

 //    function showPosition(position) {
 //        latitude = position.coords.latitude;
 //        longitude = position.coords.longitude;
 //        initMap();
 //    }

 //    	function getLocation() {
	//     if (navigator.geolocation) {
	//         navigator.geolocation.getCurrentPosition(showPosition);
	//     } else { 
	//         console.log("Geolocation is not supported by this browser.");
	//     }
	// }

 //    function showPosition(position) {
 //        latitude = position.coords.latitude;
 //        longitude = position.coords.longitude;
 //        initMap();
 //    }