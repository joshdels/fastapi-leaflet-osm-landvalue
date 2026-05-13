import { map } from "./map.js";
import { fetchAmenities, fetchBuildings, fetchRoads } from "./api.js";
import {
  clearLayers,
  createLayers,
  drawBuildings,
  drawRoads,
  drawAmenities,
} from "./layers.js";

let marker = null;

const { buildingLayer, roadLayer, amenityLayer } = createLayers(map);

map.on("click", async (e) => {
  const { lat, lng } = e.latlng;

  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker([lat, lng]).addTo(map);

  clearLayers(buildingLayer, amenityLayer, roadLayer);

  const buildingData = await fetchBuildings(lat, lng);
  const roadData = await fetchRoads(lat, lng);
  const amenityData = await fetchAmenities(lat, lng);

  drawBuildings(buildingData, buildingLayer);
  drawRoads(roadData, roadLayer);
  drawAmenities(amenityData, amenityLayer);
});
