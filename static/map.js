var searchTerms = [];
var searchResults = [];
<<<<<<< HEAD
var map;
var service;
var marker;
var initialLoc;
var infowindow;

var initMap = function() {

    var mapOptions = {
        zoom: 15
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    console.log(map);

    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            initialLoc = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

            infowindow = new google.maps.InfoWindow({
                map: map,
                position: initialLoc,
                content: 'You are here'
            });

            map.setCenter(initialLoc);

            var request = {
                location:initialLoc,
                radius:500,
                types: searchTerms
            };

            infowindow = new google.maps.InfoWindow();

            var service = new google.maps.places.PlacesService(map);

            if(searchTerms.length !== 0) {service.nearbySearch(request,callback)};

        }, function() {
            handleNoGeolocation(true);
        });
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createLi(results[i].name);
                createMarker(results[i]);
            }
        }
    }
=======
$('#bar').change(function() {
	if(this.checked){
		searchTerms.push($('#bar').val());
		initMap();
		searchResults = [];
		$("#listed").empty();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
		searchResults = [];
		$("#listed").empty();
	}
});
$('#brewery').change(function() {
	if(this.checked){
		searchTerms.push($('#brewery').val());
		initMap();
		searchResults = [];
		$("#listed").empty();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
		searchResults = [];
		$("#listed").empty();
	}
});
$('#liquorStore').change(function() {
	if(this.checked){
		searchTerms.push($('#liquorStore').val());
		initMap();
		searchResults = [];
		$("#listed").empty();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
		searchResults = [];
		$("#listed").empty();
	}
});
$('#gasStation').change(function() {
	if(this.checked){
		searchTerms.push($('#gasStation').val());
		initMap();
		searchResults = [];
		$("#listed").empty();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
		searchResults = [];
		$("#listed").empty();
	}
});
$('#groceryStore').change(function() {
	if(this.checked){
		searchTerms.push($('#groceryStore').val());
		initMap();
		searchResults = [];
		$("#listed").empty();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
		searchResults = [];
		$("#listed").empty();
	}
});

if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		initialLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		map.setCenter(initialLoc);
		console.log(initialLoc + 'CHECK THIS')
	});
}

var map;
var initialLoc;
var initMap = function() {
	var seattle = new google.maps.LatLng(47.6078762, -122.3359599);


	map = new google.maps.Map(document.getElementById('map'), {
		center : {lat: 47.6078762, lng: -122.3359599},
		zoom : 15
	});

	// if(navigator.geolocation) {
	// 	navigator.geolocation.getCurrentPosition(function(position) {
	// 		initialLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	// 		map.setCenter(initialLoc);
	// 		console.log(initialLoc + 'CHECK THIS')
	// 	});
	// }
	// says position is undefined? wtf it works in somebodies jsfiddle....bs
	// var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var request = {
		location : initialLoc,
		radius : '500',
		types : searchTerms
	}
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
};
//creates marker and changes results array to current results
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      searchResults.push(results[i].name);
      createLi(searchResults[i])
    }
  }
>>>>>>> 3076cd1053d58c35b24a42948ca0204b1e537cba
};

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
<<<<<<< HEAD
 };

function createLi(text) {
    var html = '<li class="inline"><form method="POST" action="/results"><p>' + text + '</p><input type="hidden" name=title value="' + text + '"><button type="submit" class="btn btn-default">Add to favorites!</button></form></li>';

    $('#listed').append(html);
};

$('#bar').change(function() {
    if(this.checked){
        searchTerms.push($('#bar').val());
        initMap();
        searchResults = [];
        $("#listed").empty();
    } else if(!this.checked) {
        searchTerms.splice(this, 1);
        initMap();
        searchResults = [];
        $("#listed").empty();
    }
});
$('#brewery').change(function() {
    if(this.checked){
        searchTerms.push($('#brewery').val());
        initMap();
        searchResults = [];
        $("#listed").empty();
    } else if(!this.checked) {
        searchTerms.splice(this, 1);
        initMap();
        searchResults = [];
        $("#listed").empty();
    }
});
$('#liquorStore').change(function() {
    if(this.checked){
        searchTerms.push($('#liquorStore').val());
        initMap();
        searchResults = [];
        $("#listed").empty();
    } else if(!this.checked) {
        searchTerms.splice(this, 1);
        initMap();
        searchResults = [];
        $("#listed").empty();
    }
});
$('#gasStation').change(function() {
    if(this.checked){
        searchTerms.push($('#gasStation').val());
        initMap();
        searchResults = [];
        $("#listed").empty();
    } else if(!this.checked) {
        searchTerms.splice(this, 1);
        initMap();
        searchResults = [];
        $("#listed").empty();
    }
});
$('#groceryStore').change(function() {
    if(this.checked){
        searchTerms.push($('#groceryStore').val());
        initMap();
        searchResults = [];
        $("#listed").empty();
    } else if(!this.checked) {
        searchTerms.splice(this, 1);
        initMap();
        searchResults = [];
        $("#listed").empty();
    }
});
=======
};
var createLi = function(text) {
	var html = '<li class="inline"><form method="POST" action="/results"><p>' + text + '</p><input type="hidden" name=title value="' + text + '"><button type="submit" class="btn btn-warning">Add to favorites!</button></form></li>';

	$('#listed').append(html);
}
>>>>>>> 3076cd1053d58c35b24a42948ca0204b1e537cba




