/*
This enables the what state is the button button, charts
*/

import { map } from "../map/map.js";
import { state } from "../storage/storage.js";
import { resetMapLayers } from "../map/layers.js";

export let generateData = true;

const button = document.getElementById("new-data");
const mobileBtn = document.querySelector(".mobile");
const roadDistance = document.getElementById("road-distance");

button.addEventListener("click", enableGenerateData);
mobileBtn.addEventListener("click", enableGenerateData);

export function enableGenerateData() {
  generateData = true;
  button.classList.add("disable");
  mobileBtn.classList.add("mobile-disable");
  resetMapLayers(map, state);
  state.clearDatasets()
  clearUI();
}

export function disableGenerateData() {
  generateData = false;
  button.classList.remove("disable");
  mobileBtn.classList.remove("mobile-disable");
}

export function updateRoadDistanceUI() {
  const roadDistance = document.getElementById("road-distance");
  roadDistance.innerText = state.roadDistance.toFixed(2) ?? 0;
}

export function clearUI() {
  roadDistance.innerText = 0;
}
