
//globals
var map, infoWindow;
var luckys_coords = { lat: 42.3502, lng: -71.0484 };
var scorpion_coords = { lat: 42.3530, lng: -71.0476 };
var broadway_coords = { lat: 42.3358, lng: -71.0363 };
var lincoln_coords = { lat: 42.3363, lng: -71.0476 };
var selectedId;
var selected_info;
var selected_name;
var searchURL = 'https://www.googleapis.com/youtube/v3/search';
var apiKey = 'AIzaSyCLitrI4IesoEkUFm3dvuRVq4u15w44H_4';
var yt_string = 'https://www.youtube.com/watch?v=';
// var position;
function loadScript(url) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  head.appendChild(script);
}
//load up database
loadScript('occ_db.js');


//initialize map w markers for supported bars.
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: luckys_coords,
    zoom: 13,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1a3646"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#64779e"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#334e87"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6f9ba5"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3C7680"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#304a7d"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2c6675"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#255763"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#b0d5ce"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3a4762"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0e1626"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4e6d70"
          }
        ]
      }
    ]
  });

  var luckys_marker = new google.maps.Marker({
    position: luckys_coords,
    map: map,
    animation: google.maps.Animation.DROP,
    title: "Lucky's Lounge"
  });

  luckys_marker.addListener('click', function () {

    //get placesid and address then post to feed.
    var me = this;
    this.placesService = new google.maps.places.PlacesService(map);
    // console.log(this.placesService);
    this.placesService.getDetails({ placeId: luckys_PlaceID }, function (place, status) {
      if (status === 'OK') {
        selected_info = luckys_info;
        selectedId = place.placeId;
        selected_name = place.name;
        console.log(place.name + place.formatted_address);
        postLocationToFeed(place.name, place.formatted_address, place.formatted_phone_number);
        setListeners();

      }
    });

  });

  var scorpion_marker = new google.maps.Marker({
    position: scorpion_coords,
    map: map,
    animation: google.maps.Animation.DROP,
    title: "Scorpion Bar"
  });

  scorpion_marker.addListener('click', function () {

    //get placesid and address then post to feed.
    var me = this;
    this.placesService = new google.maps.places.PlacesService(map);
    // console.log(this.placesService);
    this.placesService.getDetails({ placeId: scorpion_PlaceID }, function (place, status) {
      if (status === 'OK') {
        selected_info = scorpion_info;
        selectedId = place.placeId;
        selected_name = place.name;
        console.log(place.name + place.formatted_address);
        postLocationToFeed(place.name, place.formatted_address, place.formatted_phone_number);
        setListeners();

      }
    });

  });

  var broadway_marker = new google.maps.Marker({
    position: broadway_coords,
    map: map,
    animation: google.maps.Animation.DROP,
    title: "The Broadway"
  });

  broadway_marker.addListener('click', function () {

    //get placesid and address then post to feed.
    var me = this;
    this.placesService = new google.maps.places.PlacesService(map);
    // console.log(this.placesService);
    this.placesService.getDetails({ placeId: broadway_PlaceID }, function (place, status) {
      if (status === 'OK') {
        selectedId = place.placeId;
        selected_info = broadway_info;
        selected_name = place.name;
        console.log(place.name + place.formatted_address);
        postLocationToFeed(place.name, place.formatted_address, place.formatted_phone_number);
        setListeners();

      }
    });

  });

  var lincoln_marker = new google.maps.Marker({
    position: lincoln_coords,
    map: map,
    animation: google.maps.Animation.DROP,
    title: "Lincoln Tavern"
  });

  lincoln_marker.addListener('click', function () {

    //get placesid and address then post to feed.
    var me = this;
    this.placesService = new google.maps.places.PlacesService(map);
    // console.log(this.placesService);
    this.placesService.getDetails({ placeId: lincoln_PlaceID }, function (place, status) {
      if (status === 'OK') {
        selected_info = lincoln_info;
        selectedId = place.placeId;
        selected_name = place.name;
        console.log(place.name + place.formatted_address);
        postLocationToFeed(place.name, place.formatted_address, place.formatted_phone_number);
        setListeners();


      }
    });

  });

  infoWindow = new google.maps.InfoWindow;
  
  //end of init map function
}

function postLocationToFeed(placeName, placeAddress, placePhone) {
  //function that will use jquery to populate the feed
  $('.request-list').empty();
  $('.request-list').append(
    // `<li><h3>${placeNAme}</h3>
    `            <li>
    <div class="info-div" label, role="bar information including Name, Address, and Phone Number">
        <p>${placeName}</p>
        <p>${placeAddress}</p>
        <p>${placePhone}</p>
  </li>`
  )
};

function emptyList() {
  $('.request-list').empty();
  
}


function setListeners() {

  $('#remove-element').submit(event => {
    event.preventDefault();
    emptyList();
  });

  $("#div-graph").removeClass("hidden");
  formatOccData(selected_info);
  getJsonResponse();


}


function getJsonResponse() {
  console.log("in getjsonresponse: " + selected_name);

  const params = {
    key: apiKey,
    q: selected_name,
    part: 'snippet',
    maxResults: '1',
    type: 'video'
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });


}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  let yt_url = yt_string + responseJson.items[0].id.videoId;

  for (let i = 0; i < responseJson.items.length; i++) {

    $('.request-list').append(
      `<li class = "youtube-li" label, role = 'display youtube information'><a href ="${yt_url}" class = "youtube-link" label = 'youtube link'><span class = 'yt-url'>Top Youtube Result: ${responseJson.items[i].snippet.title}</span></a>

      </li>`
    )
  };

  $('#results').removeClass('hidden');
};

function formatOccData(info) {
  $("#div-graph").empty();
  // console.log('formatting response');
  let current_date = new Date();
  let day = current_date.getDay();
  //manipulate day
  switch (new Date().getDay()) {
    case 0:
      day = "Su";
      break;
    case 1:
      day = "Mo";
      break;
    case 2:
      day = "Tu";
      break;
    case 3:
      day = "We";
      break;
    case 4:
      day = "Th";
      break;
    case 5:
      day = "Fr";
      break;
    case 6:
      day = "Sa";
  }
  

  //manipulate hour
  let hour = current_date.getHours();
  // console.log("hour = "+hour);

  switch (new Date().getHours()) {
    case 6:
      hour = 1;
      break;
    case 5:
    case 4:
    case 3:
    case 2:
      alert('go to sleep, bar is closed');
      document.location.reload(true)
      break;
    case 22:
      hour = hour - 6;
      break;
  }
  
  const current_hour = current_date.getHours();

  //now cycle through the json response to get what we need -> current occupancy for the rest of the night
  let occ_array = info[0].popularTimesHistogram[day];

  //get the current hour and return the rest of the day's occupancy data
  let limit = occ_array.length;

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    let occ_data = [['Times', 'Occupancy Percent']];
    for (let i = 4; i < limit; i++) {
      // console.log('in for loop, hour: ' + occ_array[i].hour + ' occupancy: ' + occ_array[i].occupancyPercent);
      // hour_info += occ_array[i].hour;
      // occ_info += occ_array[i].occupancyPercent;
      occ_data.push([occ_array[i].hour, occ_array[i].occupancyPercent]);
    }

    var data = google.visualization.arrayToDataTable(occ_data);

    let ticks=[];
    for (let i = 4; i < limit; i++) {
      ticks.push(occ_array[i].hour);
    }
   

    var options = {
      title: `Occupancy Percent for ${selected_name}`,
      legend: { position: 'none' },
      colors: ['#B22222'],
      backgroundColor: ['#0075a4'],
      vAxis: {
        title: "percent Occupied",
        maxValue: 100,
      },
      hAxis: {
        ticks: ticks,
        title: "by Hour",
        showTextEvery: 1,
        type: 'category'
      },
      chartArea: {
        backgroundColor: {
          fill: '#0075a4',
          fillOpacity: 0.1
        },
      },


    };

    var chart = new google.visualization.ColumnChart(document.getElementById('div-graph'));
    chart.draw(data, options);
  }

}
