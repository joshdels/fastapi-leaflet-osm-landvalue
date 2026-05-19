export const state = {
  marker: null,
  circle: null,
  buildingDatas: [],
  roadDatas: [],
  amenityDatas: [],
};

export function clearAllData() {
  state.marker = null;
  state.circle = null;
  state.buildingDatas = [];
  state.roadDatas = [];
  state.amenityDatas = [];
}
