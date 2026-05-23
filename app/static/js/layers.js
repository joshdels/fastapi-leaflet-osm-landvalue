/*
This module handles the map layers rendering in the leaflet map such as the Open Street Map(OSM) data 
*/

import { buildNodeMap, formatTags } from "./transformers.js";

export const buildingLayer = L.layerGroup();
export const roadLayer = L.layerGroup();
export const amenityLayer = L.layerGroup();

export function drawBuildings(data, layer) {
  const nodeMap = buildNodeMap(data.elements);

  data.elements.forEach((el) => {
    if (el.type !== "way") return;

    const coords = el.nodes.map((id) => nodeMap[id]).filter(Boolean);

    if (coords.length < 3) return;

    L.polygon(coords, {
      color: "blue",
      weight: 1,
      fillOpacity: 0.5,
      pane: "buildingsPane",
    })
      .bindPopup(formatTags(el.tags))
      .addTo(layer);
  });
}

export function drawRoads(data, layer) {
  const nodeMap = buildNodeMap(data.elements);

  data.elements.forEach((el) => {
    if (el.type !== "way") return;

    const coords = el.nodes.map((id) => nodeMap[id]).filter(Boolean);

    if (coords.length < 2) return;

    L.polyline(coords, {
      color: "red",
      weight: 2,
      opacity: 0.8,
      pane: "roadsPane",
    }).addTo(layer);
  });
}

export function drawAmenities(data, layer) {
  const nodeMap = buildNodeMap(data.elements);

  const usedNodes = new Set();

  data.elements.forEach((el) => {
    if (el.type !== "way") return;

    const coords = el.nodes
      ?.map((id) => {
        usedNodes.add(id);
        return nodeMap[id];
      })
      .filter(Boolean);

    if (!coords || coords.length < 3) return;

    L.polygon(coords, {
      color: "yellow",
      weight: 2,
      fillOpacity: 0.3,
      pane: "amenitiesPane",
    })
      .bindPopup(formatTags(el.tags))
      .addTo(layer);
  });

  data.elements.forEach((el) => {
    if (el.type !== "node") return;

    if (usedNodes.has(el.id)) return;

    L.circleMarker([el.lat, el.lon], {
      radius: 6,
      color: "yellow",
      fillColor: "yellow",
      fillOpacity: 0.5,
      pane: "amenitiesPane",
    })
      .bindPopup(formatTags(el.tags))
      .addTo(layer);
  });
}

/**
 * Clears all the object layers
 * 
 */
export function clearLayers(...layers) {
  layers.forEach((layer) => layer.clearLayers());
}

export function resetMapLayers(map, state) {
  if (state.marker) {
    map.removeLayer(state.marker);
  }

  if (state.circle) {
    map.removeLayer(state.circle);
  }

  buildingLayer.clearLayers();
  roadLayer.clearLayers();
  amenityLayer.clearLayers();
}
