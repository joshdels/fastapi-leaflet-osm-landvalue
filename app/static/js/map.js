export const map = L.map("map", {
  center: [7.2, 124.2],
  zoom: 11,
});

// basemaps
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
);
const dark = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
);

osm.addTo(map);

L.control
  .layers({
    Streets: osm,
    Satellite: satellite,
    Dark: dark,
  })
  .addTo(map);
