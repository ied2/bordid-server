document.addEventListener('DOMContentLoaded', function() {
  main.init();
});

var main = (function() {

    var listOfRestaurants;
    var longitude;
    var latitude;
    
	
    function init() {
        var searchButton = document.querySelector('#searchButton');
        var checkbox = document.querySelectorAll('.check');
        var distanceInput = document.querySelector('#distanceInput');
        var distance = distanceInput.value;
        var allCheckBox = document.querySelector('#all');
        var dice = document.querySelector('.dice');
        var sort = document.querySelector('#sortByDistance');

        for(var i = 0; i < checkbox.length; i++) {
            checkbox[i].addEventListener('click', function() {
                filter();
                allCheckBox.checked = false;
            });
        }

        sort.addEventListener('click', function () {
            filter();
        });

        allCheckBox.addEventListener('click', function() {
            if(allCheckBox.checked == true) {
                for(var i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = true;
                }
            }
            else {
                for(var i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = false;
                }
            }
            filter();
        });

        searchButton.addEventListener('click', function() {
            var distance = distanceInput.value;
            create(distance);
        });

        latitude = document.querySelector('#sortByDistance').attributes.userLatitude.value;
        longitude = document.querySelector('#sortByDistance').attributes.userLongitude.value;
        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);

        if(isNaN(latitude)) {
            getLocation();
        }
        else {
            var distanceInput = document.querySelector('#distanceInput');
            var distance = distanceInput.value;
            create(distance);
        }
	}

    function create(distance) {
        
        // Remove restaurants
        var myNode = document.querySelector(".res-data");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        $.ajax({
            type: "GET",
            url: '/getRestaurants',
            crossDomain: true,
            data: {distance: distance, latitude: latitude, longitude: longitude},
            success: function (data) {
                listOfRestaurants = data;
                filter();
            }
        });
    }

    function filter() {

        var list = listOfRestaurants;

        var x = [];

        for(var i = 0; i < list.length; i++) {
            if(pizza.checked == true) {
                if (1 == list[i].pizza) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(hamburger.checked == true) {
                if (1 == list[i].hamburger) {
                    x.push(list[i]);
                    continue;
                }
            }
             if(sushi.checked == true) {
                if (1 == list[i].sushi) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(seafood.checked == true) {
                if (1 == list[i].seafood) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(steak.checked == true) {
                if (1 == list[i].steik) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(indian.checked == true) {
                if (1 == list[i].indian) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(italian.checked == true) {
                if (1 == list[i].italian) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(asian.checked == true) {
                if (1 == list[i].asian) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(fastfood.checked == true) {
                if (1 == list[i].fastfood) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(fancy.checked == true) {
                if (1 == list[i].fancy) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(healthy.checked == true) {
                if (1 == list[i].healthy) {
                    x.push(list[i]);
                    continue;
                }
            }
        }

        shuffle(x);

        if(document.querySelector('#sortByDistance').checked == true) x.sort(sort_by("distance", false, function(a){return a}));

        var myNode = document.querySelector(".res-data");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        document.querySelector('#ajaxloader').style.display = 'block';

        for (var i=0; i<x.length; i++) {

            var ni = document.querySelector(".res-data");
            var newdiv = document.createElement("div");
            newdiv.addEventListener("click", function (e) {
                window.location.href = this.id;
            });
            var elem = document.createElement("img");
            if (x[i].logo == 001) elem.setAttribute("a", "hallo");
            else elem.setAttribute("src", x[i].logo);
            newdiv.setAttribute("id", x[i].restaurant_id);
            newdiv.setAttribute("class", "col-md-6 col-xs-6 rContainer");
            // var name = document.createTextNode(restaurants[i].name);
            // newdiv.appendChild(name);
            var dist = document.createElement("a");
            dist.textContent = (x[i].distance + " m");
            ni.appendChild(newdiv);
            newdiv.appendChild(elem);
            newdiv.appendChild(dist);
        }
    document.querySelector('#ajaxloader').style.display = 'none';
}

// Problem create() called twice
function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            // var distanceInput = document.querySelector('#distanceInput');
            // var distance = distanceInput.value;
            // create(distance);
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var distanceInput = document.querySelector('#distanceInput');
        var distance = distanceInput.value;
        create(distance);
    }

    var sort_by = function(field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }

  return {
    init: init,
  };
})();