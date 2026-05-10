export async function fetchBuildings(lat, lng) {
  const res = await fetch(
    `/api/buildings?lat=${lat}&lon=${lng}&radius=200`
  );
  return res.json();
}

export async function fetchRoads(lat, lng) {
  const res = await fetch(
    `/api/roads?lat=${lat}&lon=${lng}&radius=200`
  );
  return res.json();
}