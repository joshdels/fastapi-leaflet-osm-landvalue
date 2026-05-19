/**
 * Creates node lookup map
 */
export function buildNodeMap(elements) {
  const nodeMap = {};

  elements.forEach((el) => {
    if (el.type === "node") {
      nodeMap[el.id] = [el.lat, el.lon];
    }
  });

  return nodeMap;
}

/**
 * Convert OSM roads into Turf LineStrings
 */
export function buildRoadFeatures(data) {
  const nodeMap = buildNodeMap(data.elements);

  const roads = [];

  data.elements.forEach((el) => {
    if (el.type !== "way") return;

    const coords = el.nodes.map((id) => nodeMap[id]).filter(Boolean);

    if (coords.length < 2) return;

    roads.push(turf.lineString(coords.map(([lat, lng]) => [lng, lat])));
  });

  return roads;
}

/**
 * 
  Formats the bind popups 
 */
export function formatTags(tags = {}) {
  return Object.entries(tags)
    .map(([key, value]) => `<b>${key}</b>: ${value}`)
    .join("<br>");
}
