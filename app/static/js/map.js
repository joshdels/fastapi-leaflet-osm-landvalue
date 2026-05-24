/*
Initialize the leaflet map, including the layers, geolocation, basemaps and legends
*/

import { amenityLayer, buildingLayer, roadLayer } from "./layers.js";

/**
 * 
  Creates the map engine using leaflet library
 */
export const map = L.map("map", {
  attributionControl: false,
  center: [7.5907, 125.4553],
  zoom: 5,
});

const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
);
const google = L.tileLayer(
  "https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
);

osm.addTo(map);

map.createPane("buildingsPane");
map.createPane("roadsPane");
map.createPane("amenitiesPane");

map.getPane("buildingsPane").style.zIndex = 400;
map.getPane("roadsPane").style.zIndex = 450;
map.getPane("amenitiesPane").style.zIndex = 650;

const baseMaps = {
  Streets: osm,
  Satellite: satellite,
  Google: google,
};

const overlayMaps = {
  Buildings: buildingLayer,
  Amenities: amenityLayer,
  Roads: roadLayer,
};

var geocoder = new L.Control.Geocoder({
  defaultMarkGeocode: false,
  position: "topleft",
})
  .on("markgeocode", function (e) {
    const center = e.geocode.center;
    map.setView(center, 15);
  })
  .addTo(map);

L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: false,
    position: "bottomleft",
  })
  .addTo(map);
