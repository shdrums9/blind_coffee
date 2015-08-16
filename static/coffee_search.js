var map;
var service;

function onPositionUpdate(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
}

function initialize() {
  if(navigator.geolocation)
    var pos = navigator.geolocation.getCurrentPosition();
    var mylat = pos.coords.latitude
    var mylng = pos.coords.longitude
  else
    var pos = [40.755460, -73.985468]
    var mylat = pos[0]
    var mylng = pos[1]
  var loc = {lat:mylat, lng:mylng}//new google.maps.LatLng(pos.latitude, pos.longitude);
  map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: loc,
      zoom: 15
    });

  var request = {
    location: loc,
    radius: '500',
    types: ['cafe']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
