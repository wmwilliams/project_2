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

var map;
var service;
var marker;
var pos;
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
            pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

            infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'Located'
            });

            map.setCenter(pos);

            var request = {
                location:pos,
                radius:500,
                types: searchTerms
            };

            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request,callback);
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                console.log('after / to createMarker');
                searchResults.push(results[i].name);
                createLi(searchResults[i]);
                createMarker(results[i]);
            }
        }
    }
}
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




