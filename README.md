# hw14-leaflet-earthquakes

## Solution Explanation | GRADE: -

For this assignment, I used leaflet to generate a map with bubbles indicating earthquakes recorded by the USGS in the last 7 days. The bubbles are sized relative to the magnitude and the color indicates the depth. 

First I used leaflet to generate a world map, centered roughtly on the US and zoomed out to capture most of the map. The tile layer is set through mapbox.

The first function markercolor() is used to color each bubble based on its depth. I set the breakpoints at every 20 km, with the color getting progressively darker. When given earthquake data (retrieved in the next function) it finds the depth (geoJSON coordinate at index 2) and returns the fill color. 

The bulk of the program runs in the next function. I used d3 to grab the geoJSON data from the USGS ("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson") and then looped through each feature to get the coordinates for each earthquake and its magintude. I then used L.circle to plot circle at the given coordinates, set the size scaled to the magnitude, and used markercolor() to get the appropriate color. I also used bindPopup() to indicate the earthquake's location, magnitude, and where to find more info when the user clicks on the circle. 

Lastly I used L.control and DomUtil to generate a legend for the depths. I passed the colors and breakpoints and then set each piece of the legend to show the depth color and the corresponding depth. 

The aplication was deployed to GitHub pages. 
