var searchTerms = [];
var searchResults = [];
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
      createLi(searchResults[i])
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
var createLi = function(text) {
	var html = '<li class="inline"><form method="POST" action="/results"><p>' + text + '</p><input type="hidden" name=title value="' + text + '"><button type="submit" class="btn btn-warning">Add to favorites!</button></form></li>';

	$('#listed').append(html);
}




