// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoianVsbHlhcyIsImEiOiJjbDU4Mzk5cG8wZ3V4M2R1a3BzN3p3N3lvIn0.nZ1jceZkUYDgRT9qKTIDDg';
console.log(mapboxgl);
// building map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [4.322840, 52.067101], // starting position hhs
  zoom: 13.3
});

const start = [4.322840, 52.067101]; //hhs coordinates

map.on('click', (event) => {
  const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
  const end = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: coords
        }
      }
    ]
  };
  if (map.getLayer('end')) {
    map.getSource('end').setData(end);
  } else {
    map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: coords
              }
            }
          ]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#f30'
      }
    });
}

getRoute(coords);
getAPItravel('4.322840','52.067101', `${coords[0]}`, `${coords[1]}`);

});

async function getRoute(end) {
  // the start will always be the same, only the end or destination will change
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
}

map.on('load', () => {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(start);

  // Add starting point to the map
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: start
            }
          }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be'
    }
  });



});

var markerText = new mapboxgl.Popup().setHTML('<h3>Landing Site: De Haagse Hogeschool</h3><p>Closed right now</p>');
var marker = new mapboxgl.Marker().setLngLat([4.324439,52.067200]).setPopup(markerText).addTo(map);
var myCustomMarker2 = document.createElement('div');
var myCustomMarker3 = document.createElement('div');
var myCustomMarker4 = document.createElement('div');

myCustomMarker2.style.backgroundImage = 'url("https://cdn-icons-png.flaticon.com/512/184/184482.png")';
myCustomMarker3.style.backgroundImage = 'url("https://cdn-icons-png.flaticon.com/512/184/184482.png")';
myCustomMarker4.style.backgroundImage = 'url("https://cdn-icons-png.flaticon.com/512/184/184482.png")';
myCustomMarker2.style.backgroundSize = '100%';
myCustomMarker3.style.backgroundSize = '100%';
myCustomMarker4.style.backgroundSize = '100%';
var markerText2 = new mapboxgl.Popup().setHTML('<h3>Cool Bar</h3><p>Open now</p>');
var markerText3 = new mapboxgl.Popup().setHTML('<h3>Tapas Bar Don Suerte</h3>');
var markerText4 = new mapboxgl.Popup().setHTML('<h3>America Bar</h3><p>Free Beers for Martians</p>');
var marker2 = new mapboxgl.Marker(myCustomMarker2).setLngLat([4.32595026812337,52.06239072562767 ]).setPopup(markerText2).addTo(map);
var marker3 = new mapboxgl.Marker(myCustomMarker3).setLngLat([4.325415900429894,52.07427532973116]).setPopup(markerText3).addTo(map);
var marker4 = new mapboxgl.Marker(myCustomMarker4).setLngLat([4.314381480786835,52.07617281803886]).setPopup(markerText4).addTo(map);
var data = { duration: 0, distance: 0, temp: 0 };


function getAPItravel(originCoord1, originCoord2, destCoord1, destCoord2) {
	console.log(originCoord1, originCoord2, destCoord1, destCoord2)
  // construct request
  var request2 = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + originCoord1 + ',' + originCoord2 + ';' + destCoord1 + ',' + destCoord2 + '?geometries=geojson&access_token=pk.eyJ1IjoianVsbHlhcyIsImEiOiJjbDU4MzIxZWQwbHRmM2hxbmwzdDlwYzNwIn0.w5g8MRZ_80EdyWRHQrLwdw' // api_key=EhqRXPfeyTniCVir16c1PR1fmpPFK4mo17FjrRXm';
console.log(request2);
  // get current weather
  fetch(request2)

  // parse response to JSON format
  .then
  (
    function(response)
    {
      return response.json();
    }
  )

  // do something with response
  .then
  (
    function(response)
    {
      // show full JSON object
      console.log(response);
			data = {duration: response.routes[0].duration, distance: response.routes[0].distance};
      insertInfo();
			getAPIweather(destCoord2, destCoord1)

    }
  );
}


function insertInfo() {
	// get the sidebar and add the instructions
const instructions = document.getElementById('instructions');
//const steps = data.waypoints;

//let tripInstructions = '';
//for (const step of steps) {
  //tripInstructions += `<li>${step.maneuver.instruction}</li>`;
console.log(data.duration, data.distance);
instructions.innerHTML = `<h3>From: 🚀 Landing point HHS</h3><p><strong>Trip duration: ${Math.floor(
  data.duration / 60
)} min 🚴 </strong></p> <p><strong>Distance: ${(data.distance / 1000).toFixed(1)} km</strong></p>`;
}

function getAPIweather(lat, long, city) {

  // construct request
  var request2 = lat && long //se lat e long tem valor
	? 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=9299c3b8438eb825ce2949bce2ebb8f5' //atribuir esse endpoint
	:  'http://api.openweathermap.org/data/2.5/weather?appid=9299c3b8438eb825ce2949bce2ebb8f5&q=' + city; //se nao, atribuir este endpoint

console.log(request2);
  // get current weather
  fetch(request2)

  // parse response to JSON format
  .then
  (
    function(response)
    {
      return response.json();
    }
  )

  // do something with response
  .then
  (
    function(response)
    {
      // show full JSON object
      console.log(response);
			data['temp'] = response.main.temp;
			insertInfo();
			var degC = Math.floor(response.main.temp - 273.15);

			document.getElementById('weather').innerHTML = response.name + '<br>';
			document.getElementById('weather').innerHTML += degC + '&#176;C <br>';
			document.getElementById('weather').innerHTML += response.weather[0].description + '<br>';
			document.getElementById('weather').innerHTML += response.wind.speed + ' m/s Wind Speed';


    }
  );
}

document.getElementById('buttonWeather').addEventListener('click', () => {
	var city = document.getElementById('city').value //get value of city typed
	getAPIweather(false,false,city) //return by search
});
