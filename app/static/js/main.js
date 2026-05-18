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

let circle = null;
let marker = null;

map.on("click", async (e) => {
  const { lat, lng } = e.latlng;

  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }

  circle = L.circle([lat, lng], {
    radius: 200,
    color: "blue",
    fillColor: "#3b82f6",
    fillOpacity: 0.3,
  }).addTo(map);

  marker = L.marker([lat, lng]).addTo(map);

  map.flyTo([lat, lng], 17);

  roadLayer.addTo(map);
  amenityLayer.addTo(map);
  buildingLayer.addTo(map);

  clearLayers(buildingLayer, amenityLayer, roadLayer);

  const [buildingData, roadData, amenityData] = await Promise.all([
    fetchBuildings(lat, lng),
    fetchRoads(lat, lng),
    fetchAmenities(lat, lng),
  ]);

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
