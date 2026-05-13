import { amenityLayer, buildingLayer, roadLayer } from "./layers.js";

export const map = L.map("map", {
  center: [7.2, 124.2],
  zoom: 11,
});

const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
);
const google = L.tileLayer(
  "https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
);

osm.addTo(map);

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
