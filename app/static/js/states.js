import { map } from "./map.js";
import { clearLayers } from "./layers.js";

export let generateData = true;

const button = document.getElementById("new-data");

export function enableGenerateData() {
  generateData = true;
  button.classList.add("disable");
}

export function disableGenerateData() {
  generateData = false;
  button.classList.remove("disable");
  // clearLayers(buildingLayer, roadLayer, amenityLayer);
}

button.addEventListener("click", function (e) {
  enableGenerateData();
});
