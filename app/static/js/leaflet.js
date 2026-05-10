const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
});

const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "&copy; Esri",
  },
);

const google = L.tileLayer(
  "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
);

var map = L.map("map", {
  center: [7.2, 124.2],
  zoom: 22,
  layers: [osm],
});

const baseMaps = {
  Streets: osm,
  Satellite: satellite,
  Google: google,
};

let amenityLayer = L.layerGroup().addTo(map);
let buildingLayer = L.layerGroup().addTo(map);
let roadLayer = L.layerGroup().addTo(map);

const overlayMaps = {
  Buildings: buildingLayer,
  Roads: roadLayer,
  Amenities: amenityLayer,
};

L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: false,
    position: "bottomright",
  })
  .addTo(map);

// ------------ Logic --------------

let currentMarker = null;
let roadFeatures = [];

map.on("click", async function (e) {
  const { lat, lng } = e.latlng;

  if (currentMarker) {
    map.removeLayer(currentMarker);
  }

  currentMarker = L.marker([lat, lng]).addTo(map);

  // Clear
  buildingLayer.clearLayers();
  amenityLayer.clearLayers();
  roadLayer.clearLayers();

  loadOSMData(lat, lng);
  loadAmenities(lat, lng);
  await loadOSMRoad(lat, lng);
  findNearestRoad(lat, lng);
});

// ----------- api calls -------------

async function loadOSMData(lat, lng) {
  const res = await fetch(`/api/buildings?lat=${lat}&lon=${lng}&radius=200`);

  const data = await res.json();

  drawBuildings(data);
}

function drawBuildings(data) {
  const nodeMap = {};

  data.elements.forEach((el) => {
    if (el.type === "node") {
      nodeMap[el.id] = [el.lat, el.lon];
    }
  });

  data.elements.forEach((el) => {
    if (el.type === "way") {
      const coordinates = el.nodes.map((nodeId) => nodeMap[nodeId]);

      L.polygon(coordinates, {
        color: "blue",
        weight: 1,
        fillOpacity: 0.5,
      }).addTo(buildingLayer);
    }
  });
}

async function loadAmenities(lat, lng) {
  const res = await fetch(`/api/amenities?lat=${lat}&lon=${lng}&radius=200`);

  const data = await res.json();

  drawAmenities(data);
}

// need to revise this?
function drawAmenities(data) {
  const nodeMap = {};
  const usedNodes = new Set();

  // STEP 1: build node map + mark used nodes
  data.elements.forEach((el) => {
    if (el.type === "node") {
      nodeMap[el.id] = [el.lat, el.lon];
    }

    if (el.type === "way" && el.nodes) {
      el.nodes.forEach((id) => usedNodes.add(id));
    }
  });

  data.elements.forEach((el) => {
    if (el.type === "node") {
      if (!usedNodes.has(el.id)) {
        L.circleMarker([el.lat, el.lon], {
          radius: 6,
          color: "yellow",
          fillOpacity: 0.8,
        })
          .bindPopup(el.tags?.amenity || "amenity")
          .addTo(amenityLayer);
      }
    }
  });

  data.elements.forEach((el) => {
    if (el.type === "way" && el.nodes) {
      const coordinates = el.nodes.map((id) => nodeMap[id]).filter(Boolean);

      if (coordinates.length > 2) {
        L.polygon(coordinates, {
          color: "yellow",
          weight: 1,
          fillOpacity: 0.4,
        })
          .bindPopup(el.tags?.amenity || "amenity area")
          .addTo(amenityLayer);
      }
    }
  });
}

async function loadOSMRoad(lat, lng) {
  const res = await fetch(`/api/roads?lat=${lat}&lon=${lng}&radius=200`);
  const data = await res.json();
  console.log(data);
  drawRoads(data);
}

function drawRoads(data) {
  const nodeMap = {};

  data.elements.forEach((el) => {
    if (el.type === "node") {
      nodeMap[el.id] = [el.lat, el.lon];
    }
  });

  data.elements.forEach((el) => {
    if (el.type === "way" && el.nodes) {
      const coordinates = el.nodes
        .map((nodeId) => nodeMap[nodeId])
        .filter(Boolean);

      if (coordinates.length > 1) {
        L.polyline(coordinates, {
          color: "red",
          weight: 2,
          opacity: 0.8,
        }).addTo(roadLayer);

        // convert to Turf line
        roadFeatures.push(
          turf.lineString(coordinates.map(([lat, lng]) => [lng, lat])),
        );
      }
    }
  });
}

function findNearestRoad(lat, lng) {
  if (!roadFeatures.length) return;

  const point = turf.point([lng, lat]);

  let nearestRoad = null;
  let minDistance = Infinity;

  roadFeatures.forEach((road) => {
    const distance = turf.pointToLineDistance(point, road, {
      units: "meters",
    });

    if (distance < minDistance) {
      minDistance = distance;
      nearestRoad = road;
    }
  });

  console.log("Nearest road distance (m):", minDistance);

  L.geoJSON(nearestRoad, {
    style: {
      color: "green",
      weight: 5,
    },
  }).addTo(roadLayer);
}
