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

  function markercolor(earthquake) {
    
    if (earthquake.geometry.coordinates[2] < 20) {
        fill = "rgb(255, 153, 153)"
      } else if (earthquake.geometry.coordinates[2] < 40) {
          fill = "rgb(255, 102, 102)"
      } else if (earthquake.geometry.coordinates[2] < 60) {
        fill = "rgb(255, 51, 51)"
      } else if (earthquake.geometry.coordinates[2] < 80) {
        fill = "rgb(255, 0, 0)"
      } else {
          fill = "rgb(204, 0, 0)"
      };
      
    return fill
  };

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(earthquakeData => {
    console.log(earthquakeData);

    for (let i = 0; i < earthquakeData.features.length; i++) {
        earthquake = earthquakeData.features[i];

        coordinates = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]]

        //console.log(coordinates);

        magnitude = earthquake.properties.mag

        //console.log(magnitude);

        L.circle(coordinates,  {
            fillOpacity: 0.75,
            color: "white",
            fillColor: markercolor(earthquake),
            radius: magnitude * 175000
        }).bindPopup("<h2>" + earthquake.properties.place  + "</h2> <hr> <h3> Magnitude: " + earthquake.properties.mag + "<br> USGIS ID: " + earthquake.id + " </h3> <h5> More info at: " + earthquake.properties.url + "</h5>").addTo(myMap);
    };

    const legend = L.control({ position: "bottomleft" });
    legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
        let limits = [0, 20, 40, 60, "80+"];
        let colors = ["rgb(255, 153, 153)", "rgb(255, 102, 102)", "rgb(255, 51, 51)", "rgb(255, 0, 0)", "rgb(204, 0, 0)"];
        let labels = [];
        
        const legendInfo = "<h3>Earthquake Depth (in Kilometers)</h3>";
    
        div.innerHTML = legendInfo;
    
        limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\">" + limit + "</li>");
        });
    
        div.innerHTML += "<ul style='list-style-type: none'>" + labels.join("") + "</ul>";
        return div;
    };
     // Adding legend to the map
     legend.addTo(myMap);
  });

