import requests


def fetch_buildings(lat, lon, radius):
    query = f"""
    [out:json];
        (
      way(around:{radius},{lat},{lon})[building];
      relation(around:{radius},{lat},{lon})[building];
    );
    out body;
    >;
    out skel qt;
    """

    headers = {"User-Agent": "fastapi-leaflet-osm/1.0"}

    response = requests.post(
        "https://overpass-api.de/api/interpreter",
        data=query,
        headers=headers,
        timeout=30,
    )

    
    if response.status_code != 200:
        return {
            "error": "Overpass API failed",
            "status": response.status_code,
        }

    return response.json()
