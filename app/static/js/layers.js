import { buildNodeMap } from "./transformers.js";

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
    }).addTo(layer);
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
    }).addTo(layer);
  });
}

export function drawAmenities(data, layer) {
  const nodeMap = buildNodeMap(data.elements);

  data.elements.forEach((el) => {
    if (el.type === "node") {
      L.circleMarker([el.lat, el.lon], {
        radius: 6,
        color: "yellow",
      })
        .bindPopup(el.tags?.amenity || "amenity")
        .addTo(layer);
    }
  });
}

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
