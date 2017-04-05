var position = null;

function initMap() {
  position = { lat: parseFloat(52.403843), lng: parseFloat(16.910956) };

  var map = new google.maps.Map(document.getElementById('map'), {
    center: position,
    scrollwheel: false,
    zoom: 12
  });

  console.log(map);

  setRootMarker(map, position);
}

function setRootMarker(map, position) {
  var marker = new google.maps.Marker({
    position: position,
    map: map,
  });

   var contentString = 'dupa';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

$(document).ready(function() {
  if ($('#map').length) {
    initMap();
  }
});
