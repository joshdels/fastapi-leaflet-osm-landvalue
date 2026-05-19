import { map } from "./map.js";
import { clearAllData, state } from "./storage.js";
import { resetMapLayers } from "./layers.js";

export let generateData = true;

const button = document.getElementById("new-data");
const roadDistance = document.getElementById("road-distance");

button.addEventListener("click", function (e) {
  enableGenerateData();
});

export function enableGenerateData() {
  generateData = true;
  button.classList.add("disable");
  resetMapLayers(map, state);
  clearAllData();
  clearUI();
}

export function disableGenerateData() {
  generateData = false;
  button.classList.remove("disable");
}

export function updateRoadDistanceUI() {
  const roadDistance = document.getElementById("road-distance");
  roadDistance.innerText = state.roadDistance.toFixed(2) ?? 0;
}

export function clearUI() {
  roadDistance.innerText = 0;
}
