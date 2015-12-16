var searchTerms = [];
$('#bar').change(function() {
	if(this.checked){
		searchTerms.push($('#bar').val());
		initMap();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
	}
});
$('#brewery').change(function() {
	if(this.checked){
		searchTerms.push($('#brewery').val());
		initMap();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
	}
});
$('#distillery').change(function() {
	if(this.checked){
		searchTerms.push($('#distillery').val());
		initMap();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
	}
});
$('#liquorStore').change(function() {
	if(this.checked){
		searchTerms.push($('#liquorStore').val());
		initMap();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
	}
});
$('#gasStation').change(function() {
	if(this.checked){
		searchTerms.push($('#gasStation').val());
		initMap();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
	}
});
$('#groceryStore').change(function() {
	if(this.checked){
		searchTerms.push($('#groceryStore').val());
		initMap();
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
	}
});
var map;
var initMap = function() {
	var initialLoc;
	var seattle = new google.maps.LatLng(47.6097, -122.3331);

	map = new google.maps.Map(document.getElementById('map'), {
		center : {lat: 47.61, lng: -122.33},
		zoom : 16
	});
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			initialLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(initialLoc);
		});
	}
	var request = {
		location : seattle,
		radius : '500',
		types : searchTerms
	}
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
};

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
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
}







