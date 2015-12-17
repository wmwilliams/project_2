var searchTerms = [];
var searchResults = [];
$('#bar').change(function() {
	if(this.checked){
		searchTerms.push($('#bar').val());
		initMap();
		searchResults = [];
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
		searchResults = [];
	}
});
$('#brewery').change(function() {
	if(this.checked){
		searchTerms.push($('#brewery').val());
		initMap();
		searchResults = [];
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
		searchResults = [];
	}
});
$('#liquorStore').change(function() {
	if(this.checked){
		searchTerms.push($('#liquorStore').val());
		initMap();
		searchResults = [];
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
		searchResults = [];
	}
});
$('#gasStation').change(function() {
	if(this.checked){
		searchTerms.push($('#gasStation').val());
		initMap();
		searchResults = [];
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
		searchResults = [];
	}
});
$('#groceryStore').change(function() {
	if(this.checked){
		searchTerms.push($('#groceryStore').val());
		initMap();
		searchResults = [];
	} else if(!this.checked) {
		searchTerms.splice(this, 1);
		initMap();
		searchResults = [];
	}
});
var map;
var initialLoc;
var initMap = function() {
	var seattle = new google.maps.LatLng(47.6078762, -122.3359599);


	map = new google.maps.Map(document.getElementById('map'), {
		center : {lat: 47.6078762, lng: -122.3359599},
		zoom : 15
	});

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			initialLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(initialLoc);
			console.log(initialLoc + 'CHECK THIS')
		});
	}

	// var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


	var request = {
		location : seattle,
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
};
// var html = '<li><p class="todo-item">' + name + '</p><button type="button" class="delete-button">Delete</button><button type="button" class="edit-button">Edit</button></li>';

// searchResults.forEach(function(name) {
// 		$('#results-list').append(html);
// 		console.log('were here')
// });




