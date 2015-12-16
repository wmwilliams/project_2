var initMap = function() {

	var map = new google.maps.Map(document.getElementById('map'), {
		center : {lat: -34.397, lng: 150.644},
		zoom : 12
	});
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {

			var initialLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(initialLoc);

			markers.forEach(function (marker) {
				var latLng = new google.maps.LatLng(marker.lat, marker.lng);
				var googleMarker = new google.maps.Marker({
					position : latLng,
					map : map,
					title : marker.name
				});
			});

		});
	}
};