import requests


def fetch_buildings(lat, lon, radius):
    query = f"""
    [out:json];

    (
    // Buildings
    way(around:{radius},{lat},{lon})["building"];


    // Hotels
    node(around:{radius},{lat},{lon})["tourism"="hotel"];
    way(around:{radius},{lat},{lon})["tourism"="hotel"];

    // Shops
    // node(around:{radius},{lat},{lon})["shop"];
    // way(around:{radius},{lat},{lon})["shop"];

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


def fetch_amenities(lat, lon, radius):
    query = f"""
    [out:json];

    (
      node(around:{radius},{lat},{lon})["amenity"];
      way(around:{radius},{lat},{lon})["amenity"];
      
      node(around:{radius},{lat},{lon})["shop"];
      way(around:{radius},{lat},{lon})["shop"];
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


def fetch_roads(lat, lon, radius):
    query = f"""
    [out:json];
    
    (
    // Roads
        way(around:{radius},{lat},{lon})["highway"];
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
