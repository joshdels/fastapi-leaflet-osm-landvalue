function buildNodeMap(elements) {
  const nodeMap = {};

  elements.forEach((el) => {
    if (el.type === "node") {
      nodeMap[el.id] = [el.lat, el.lon];
    }
  });

  return nodeMap;
}

// initialize layers with map passed in
export function createLayers(map) {
  const buildingLayer = L.layerGroup().addTo(map);
  const roadLayer = L.layerGroup().addTo(map);

  return { buildingLayer, roadLayer };
}

// --------- DRAW FUNCTIONS ---------

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

export function clearLayers(buildingLayer, roadLayer) {
  buildingLayer.clearLayers();
  roadLayer.clearLayers();
}
