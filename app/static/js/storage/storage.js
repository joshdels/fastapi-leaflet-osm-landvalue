/*
  Stores all the data, maybe a bad practice to me who knows. I'll add some local storage for persistent data per user 
*/

/**
  A class that holds the map data such as lat and lng into the marker and the data for osm data fetched
 */

export class MapState {
  constructor() {
    this.reset();
  }

  reset() {
    this.marker = null;
    this.circle = null;

    this.nearestRoad = null;
    this.roadDistance = null;

    this.buildingDatas = [];
    this.roadDatas = [];
    this.amenityDatas = [];

    this.roadScore = null;
    this.buildingScore = null;
    this.amenityScore = null;
    this.overallScore = null;

    this.center = [];
    this.radius = null;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  setCircle(circle) {
    this.circle = circle;
  }

  clearMapObjects() {
    this.marker = null;
    this.circle = null;
  }

  setBuildingData(data) {
    this.buildingDatas = data;
  }

  setRoadData(data) {
    this.roadDatas = data;
  }

  setAmenityData(data) {
    this.amenityDatas = data;
  }

  clearDatasets() {
    this.buildingDatas = [];
    this.roadDatas = [];
    this.amenityDatas = [];
  }

  setNearestRoad(road) {
    this.nearestRoad = road;
  }

  setRoadDistance(distance) {
    this.roadDistance = distance;
  }

  setScores({ roadScore, buildingScore, amenityScore, overallScore }) {
    this.roadScore = roadScore;
    this.buildingScore = buildingScore;
    this.amenityScore = amenityScore;
    this.overallScore = overallScore;
  }

  clearAnalysis() {
    this.nearestRoad = null;
    this.roadDistance = null;

    this.roadScore = null;
    this.buildingScore = null;
    this.amenityScore = null;
    this.overallScore = null;
  }

  setSearch(center, radius) {
    this.center = center;
    this.radius = radius;
  }

  clearSearch() {
    this.center = [];
    this.radius = null;
  }

  getSnapshot() {
    return {
      marker: this.marker,
      circle: this.circle,

      nearestRoad: this.nearestRoad,
      roadDistance: this.roadDistance,

      buildingDatas: this.buildingDatas,
      roadDatas: this.roadDatas,
      amenityDatas: this.amenityDatas,

      roadScore: this.roadScore,
      buildingScore: this.buildingScore,
      amenityScore: this.amenityScore,
      overallScore: this.overallScore,

      center: this.center,
      radius: this.radius,
    };
  }
}

export const state = new MapState();
