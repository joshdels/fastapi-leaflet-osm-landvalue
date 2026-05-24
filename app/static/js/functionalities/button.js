import { enableGenerateData } from "../states.js";

/**
 * New Location Button (+) in mobile
 */
export function initMobileLocation(map) {
  const newLocation = document.querySelector("#mobile");

  L.DomEvent.disableClickPropagation(newLocation);
  L.DomEvent.disableScrollPropagation(newLocation);

  L.DomEvent.on(newLocation, "click", (e) => {
    L.DomEvent.stop(e);
    enableGenerateData();
  });
}
