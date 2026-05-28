/*
This module handles all the api coming form the fast api
*/


export async function fetchBuildings(lat, lng) {
  const res = await fetch(`/api/buildings?lat=${lat}&lon=${lng}&radius=200`);
  const data = await res.json();
  return data;
}

export async function fetchRoads(lat, lng) {
  const res = await fetch(`/api/roads?lat=${lat}&lon=${lng}&radius=200`);
  const data = await res.json();
  return data;
}

export async function fetchAmenities(lat, lng) {
  const res = await fetch(`/api/amenities?lat=${lat}&lon=${lng}&radius=200`);
  const data = await res.json();
  return data;
}
