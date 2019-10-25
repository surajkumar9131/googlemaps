let locationDetails = [
  [
    `Koramangala, Bangalore, Karnataka, India`,
    12.934533,
    77.626579,
    getDistanceFromLatLonInKm(12.934533, 77.626579, 12.934533, 77.626579)
  ],
  [
    `Whitefield Karnataka`,
    12.99435,
    77.75852,
    getDistanceFromLatLonInKm(12.934533, 77.626579, 12.99435, 77.75852)
  ],
  [
    `Mysure`,
    12.30844,
    76.653931,
    getDistanceFromLatLonInKm(12.934533, 77.626579, 12.30844, 76.653931)
  ],
  [
    `Nandi Hills Karnataka`,
    13.40868,
    77.71385,
    getDistanceFromLatLonInKm(12.934533, 77.626579, 13.40868, 77.71385)
  ],
  [
    `Ramanagara`,
    15.50028,
    76.603027,
    getDistanceFromLatLonInKm(12.934533, 77.626579, 15.50028, 76.603027)
  ]
];

function initMap() {
  loadMap(locationDetails);
}

function loadMap(locations) {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: new google.maps.LatLng(12.934533, 77.626579),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow({});

  var marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });
    google.maps.event.addListener(
      marker,
      "click",
      (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
  }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getLocations() {
  var r = document.getElementById("radius").value;
  if (r) {
    var newLocations = [];
    for (i = 0; i < locationDetails.length; i++) {
      if (locationDetails[i][3] >= r) {
        newLocations.push(locationDetails[i]);
      }
    }
    loadMap(newLocations);
  }
}
