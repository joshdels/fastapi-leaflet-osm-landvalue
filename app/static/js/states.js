import { map } from "./map.js";
import { clearAllData, state } from "./storage.js";
import { resetMapLayers } from "./layers.js";

export let generateData = true;

const button = document.getElementById("new-data");

export function enableGenerateData() {
  generateData = true;
  button.classList.add("disable");
  resetMapLayers(map, state);
  clearAllData();
}

export function disableGenerateData() {
  generateData = false;
  button.classList.remove("disable");
}

button.addEventListener("click", function (e) {
  enableGenerateData();
});
