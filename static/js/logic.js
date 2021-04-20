// Create a map object
const myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(earthquakeData => {
    console.log(earthquakeData);

    for (let i = 0; i < earthquakeData.features.length; i++) {
        earthquake = earthquakeData.features[i];

        coordinates = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]]

        //console.log(coordinates);

        magnitude = earthquake.properties.mag

        console.log(magnitude);

        L.circle(coordinates,  {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple",
            radius: magnitude * 200000
        }).addTo(myMap);
    };
  });

