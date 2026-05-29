/*
 This is the main file for all the logic. Its a still messy in my current level but I'll know I'll slowly level-up 
 */

import { map } from "./map/map.js";
import { fetchAmenities, fetchBuildings, fetchRoads } from "./api/api.js";
import { state } from "./storage/storage.js";
import { buildRoadFeatures } from "./utils/transformers.js";
import { findNearestRoad, getDistanceScore } from "./analysis/calculation.js";
import {
  generateData,
  disableGenerateData,
  updateRoadDistanceUI,
} from "./components/states.js";
import {
  clearLayers,
  drawBuildings,
  drawRoads,
  drawAmenities,
  buildingLayer,
  amenityLayer,
  roadLayer,
  resetMapLayers,
} from "./map/layers.js";
import { initChart, updateChart } from "./analysis/chart.js";
import { initSidebarControl } from "./components/sidebar.js";
import { initMobileLocation } from "./components/button.js";

initChart();

map.on("click", async (e) => {
  if (!generateData) return;
  disableGenerateData();

  const { lat, lng } = e.latlng;
  resetMapLayers(map, state);

  if (state.marker) {
    map.removeLayer(state.marker);
  }

  if (state.circle) {
    map.removeLayer(state.circle);
  }

  state.circle = L.circle([lat, lng], {
    radius: 200,
    color: "blue",
    fillColor: "#3b82f6",
    fillOpacity: 0.3,
  }).addTo(map);

  state.marker = L.marker([lat, lng]).addTo(map);

  map.fitBounds(state.circle.getBounds());

  roadLayer.addTo(map);
  amenityLayer.addTo(map);
  buildingLayer.addTo(map);

  const [buildingData, roadData, amenityData] = await Promise.all([
    fetchBuildings(lat, lng),
    fetchRoads(lat, lng),
    fetchAmenities(lat, lng),
  ]);

  if (
    !buildingData?.elements ||
    !roadData?.elements ||
    !amenityData?.elements
  ) {
    console.warn("API failed");
    return;
  }

  state.buildingDatas = buildingData;
  state.roadDatas = roadData;
  state.amenityDatas = amenityData;

  console.log(state.buildingDatas);

  drawBuildings(state.buildingDatas, buildingLayer);
  drawRoads(state.roadDatas, roadLayer);
  drawAmenities(state.amenityDatas, amenityLayer);

  // Spatial analysis
  const roads = buildRoadFeatures(state.roadDatas);
  const nearest = findNearestRoad(lat, lng, roads);
  if (!nearest) return;

  state.nearestRoad = nearest;
  state.roadDistance = nearest.distance;
  updateRoadDistanceUI();

  updateChart(nearest.distance);

  state.nearestRoad = L.geoJSON(nearest.road, {
    style: {
      color: "green",
      weight: 5,
      pane: "roadsPane",
    },
  }).addTo(roadLayer);
});

// Initializations
initSidebarControl(map);
initMobileLocation(map);
