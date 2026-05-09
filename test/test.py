import requests

OVERPASS_URL = "https://overpass-api.de/api/interpreter"


def fetch_buildings(lat, lon, radius_m=500):
    query = f"""
    [out:json][timeout:25];
    (
      way(around:{radius_m},{lat},{lon})[building];
      relation(around:{radius_m},{lat},{lon})[building];
    );
    out body;
    >;
    out skel qt;
    """
    headers = {"User-Agent": "fastapi-leaflet-osm/1.0"}

    response = requests.post(
        OVERPASS_URL, data={"data": query}, headers=headers, timeout=30
    )
    response.raise_for_status()
    elements = response.json().get("elements", [])
    buildings = [e for e in elements if e.get("tags", {}).get("building")]
    return buildings


if __name__ == "__main__":
    lat, lon = 6.5, 124.85
    radius_m = 500

    print(f"Fetching buildings within {radius_m}m of ({lat}, {lon})...\n")
    buildings = fetch_buildings(lat, lon, radius_m)

    print(f"Found {len(buildings)} building(s):\n")
    for b in buildings:
        tags = b.get("tags", {})
        name = tags.get("name", "Unnamed")
        kind = tags.get("building", "yes")
        print(f"  [{b['id']}] {name} — type: {kind}")
