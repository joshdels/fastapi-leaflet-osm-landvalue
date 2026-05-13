function buildNodeMap(elements) {
  const nodeMap = {};

  elements.forEach((el) => {
    if (el.type === "node") {
      nodeMap[el.id] = [el.lat, el.lon];
    }
  });

  return nodeMap;
}

/**
 * Initialize layers with map that is passed in
 */
export function createLayers(map) {
  const buildingLayer = L.layerGroup().addTo(map);
  const roadLayer = L.layerGroup().addTo(map);
  const amenityLayer = L.layerGroup().addTo(map);

  return { buildingLayer, amenityLayer, roadLayer };
}

/**
 * Draws buildings to the map
 *
 */
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

/**
 * Draws road by taking the road layer
 */
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

/**
 * Draws the amenities layers
 */
export function drawAmenities(data, amenityLayer) {
  const nodeMap = buildNodeMap(data.elements);

  data.elements.forEach((el) => {
    if (el.type === "node") {
      L.circleMarker([el.lat, el.lon], {
        radius: 6,
        color: "yellow",
        fillOpacity: 0.5,
      }).addTo(amenityLayer);

      return;
    }

    if (el.type === "way") {
      const coords = el.nodes.map((id) => nodeMap[id]).filter(Boolean);
      if (coords.length < 3) return;

      L.polygon(coords, {
        color: "yellow",
        weight: 2,
        fillOpacity: 0.5,
      }).addTo(amenityLayer);
    }
  });
}

/**
 * Removes all the map drawn objects
 */
export function clearLayers(buildingLayer, roadLayer, amenityLayer) {
  buildingLayer.clearLayers();
  roadLayer.clearLayers();
  amenityLayer.clearLayers();
}
