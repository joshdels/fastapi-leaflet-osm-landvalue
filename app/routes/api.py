from fastapi import APIRouter, Request
from app.services.osm import fetch_buildings
from typing import Optional

router = APIRouter(prefix="/api")


@router.get("/buildings")
def buildings(lat: float, lon: float, radius: Optional[int]):
    if radius is None:
        radius = 1000

    data = fetch_buildings(lat, lon, radius)

    return data
