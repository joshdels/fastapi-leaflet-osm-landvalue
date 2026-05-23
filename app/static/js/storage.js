/*
  Stores all the data, maybe a bad practice to me who knows. I'll add some local storage for persistent data per user 
*/

/**
 * This will serve as the current state in the map
 *
 * How to use?
 * state.maker
 *
 * resulting to the string/int/objects/array content of it
 */
export const state = {
  marker: null,
  circle: null,
  nearestRoad: null,
  roadDistance: null,
  buildingDatas: [],
  roadDatas: [],
  amenityDatas: [],

  roadScore: null,
  buildingScore: null,
  amenityScore: null,
  overallScore: null,

  center: [],
  radius: null,
};

export function clearAllData() {
  state.marker = null;
  state.circle = null;
  state.nearestRoad = null;
  state.roadDistance = null;
  state.buildingDatas = [];
  state.roadDatas = [];
  state.amenityDatas = [];

  state.roadScore = null;
  state.buildingScore = null;
  state.amenityScore = null;
  state.overallScore = null;

  state.center = [];
  state.radius = null;
}
