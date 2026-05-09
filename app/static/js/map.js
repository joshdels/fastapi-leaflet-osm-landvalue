async function loadBuildings() {
  const response = await fetch("/api/buildings?lat=7.22&lon=124.24&radius=100");

  const data = await response.json();

  console.log(data);
}

loadBuildings();
