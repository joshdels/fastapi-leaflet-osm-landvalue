import { map } from "./map.js";
import { fetchAmenities, fetchBuildings, fetchRoads } from "./api.js";
import {
  clearLayers,
  drawBuildings,
  drawRoads,
  drawAmenities,
  buildingLayer,
  amenityLayer,
  roadLayer,
  buildRoadFeatures,
} from "./layers.js";
import { findNearestRoad } from "./calculation.js";

let marker = null;

map.on("click", async (e) => {
  const { lat, lng } = e.latlng;

  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker([lat, lng]).addTo(map);

  buildingLayer.addTo(map);
  amenityLayer.addTo(map);
  roadLayer.addTo(map);

  clearLayers(buildingLayer, amenityLayer, roadLayer);

  const buildingData = await fetchBuildings(lat, lng);
  const roadData = await fetchRoads(lat, lng);
  const amenityData = await fetchAmenities(lat, lng);

  drawBuildings(buildingData, buildingLayer);
  drawRoads(roadData, roadLayer);
  drawAmenities(amenityData, amenityLayer);

  // --- GEO CALCULATION (PURE LOGIC) ---
  const roads = buildRoadFeatures(roadData);
  const nearest = findNearestRoad(lat, lng, roads);

  if (!nearest) return;

  console.log("Nearest road distance (m):", nearest.distance);

  L.geoJSON(nearest.road, {
    style: {
      color: "green",
      weight: 5,
    },
  }).addTo(roadLayer);
});
