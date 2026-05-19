import { state } from "./storage.js";

/**
 * Returns nearest road + distance
 */
export function findNearestRoad(lat, lng, roads) {
  if (!roads || roads.length === 0) return null;

  const point = turf.point([lng, lat]);

  let nearest = null;
  let minDistance = Infinity;

  for (const road of roads) {
    const distance = turf.pointToLineDistance(point, road, {
      units: "meters",
    });

    if (distance < minDistance) {
      minDistance = distance;
      nearest = road;
    }
  }

  return {
    road: nearest,
    distance: minDistance,
  };
}

export function getDistanceScore(distance) {
  const maxDistance = 1000;

  const percent = 100 * (1 - distance / maxDistance);

  return Math.max(0, Math.min(100, Math.round(percent)));
}
