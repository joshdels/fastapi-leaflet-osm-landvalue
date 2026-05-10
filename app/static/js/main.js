import { map } from "./map.js";

let marker = null;

map.on("click", async (e) => {
  const { lat, lng } = e.latlng;

  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker([lat, lng]).addTo(map);

  clearLayers(buildingLayer, roadLayer);
});
