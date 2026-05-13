/**
 * Creates a single node to be drawn
 */
function buildNodeMap(elements) {
  const nodeMap = {};

  elements.forEach((el) => {
    if (el.type === "node") {
      nodeMap[el.id] = [el.lat, el.lon];
    }
  });

  return nodeMap;
}

export const buildingLayer = L.layerGroup();
export const roadLayer = L.layerGroup();
export const amenityLayer = L.layerGroup();

export function drawBuildings(data, buildingLayer) {
  const nodeMap = buildNodeMap(data.elements);

  data.elements.forEach((el) => {
    if (el.type !== "way") return;

    const coords = el.nodes.map((id) => nodeMap[id]);

    L.polygon(coords, {
      color: "blue",
      weight: 1,
      fillOpacity: 0.5,
    }).addTo(buildingLayer);
  });
}

export function drawRoads(data, roadLayer) {
  const nodeMap = buildNodeMap(data.elements);

  data.elements.forEach((el) => {
    if (el.type !== "way") return;

    const coords = el.nodes.map((id) => nodeMap[id]).filter(Boolean);

    if (coords.length < 2) return;

    L.polyline(coords, {
      color: "red",
      weight: 2,
      opacity: 0.8,
    }).addTo(roadLayer);
  });
}

export function drawAmenities(data, amenityLayer) {
  const nodeMap = buildNodeMap(data.elements);

  const usedNodes = new Set();

  data.elements.forEach((el) => {
    if (el.type === "way" && el.nodes) {
      el.nodes.forEach((id) => usedNodes.add(id));
    }
  });

  data.elements.forEach((el) => {
    if (el.type !== "way" || !el.nodes) return;

    const coords = el.nodes.map((id) => nodeMap[id]).filter(Boolean);

    if (coords.length >= 3) {
      L.polygon(coords, {
        color: "yellow",
        weight: 1,
        fillOpacity: 0.4,
      })
        .bindPopup(el.tags?.amenity || "amenity area")
        .addTo(amenityLayer);
    }
  });

  data.elements.forEach((el) => {
    if (el.type !== "node") return;

    if (usedNodes.has(el.id)) return;

    L.circleMarker([el.lat, el.lon], {
      radius: 6,
      color: "yellow",
      weight: 1,
      fillOpacity: 0.8,
    })
      .bindPopup(el.tags?.amenity || "amenity")
      .addTo(amenityLayer);
  });
}

/**
 * Removes all the map drawn objects in the leaflet
 */
export function clearLayers(buildingLayer, roadLayer, amenityLayer) {
  buildingLayer.clearLayers();
  roadLayer.clearLayers();
  amenityLayer.clearLayers();
}

// Calculations
/** 
 * Convert OSM road data into Turf LineStrings
 */
export function buildRoadFeatures(data) {
  const nodeMap = buildNodeMap(data.elements);
  const roads = [];

  data.elements.forEach((el) => {
    if (el.type !== "way") return;

    const coords = el.nodes
      .map((id) => nodeMap[id])
      .filter(Boolean);

    if (coords.length < 2) return;

    roads.push(
      turf.lineString(coords.map(([lat, lng]) => [lng, lat]))
    );
  });

  return roads;
}
