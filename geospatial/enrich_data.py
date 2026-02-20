import json
from weather_service import WeatherService

def enrich_hotspots():
    service = WeatherService()
    
    # Load your base data
    with open('geospatial/data/processed/accidents_base.geojson', 'r') as f:
        data = json.load(f)

    # We will pick the first 5 features as a proof of concept for the MVP
    hotspots = data['features'][:5]
    
    print(f"--- Enriching {len(hotspots)} Hotspots with Live Weather ---")
    
    for feature in hotspots:
        lon, lat = feature['geometry']['coordinates']
        weather = service.get_weather_at_coords(lat, lon)
        
        if weather:
            # Update the GeoJSON properties with live risk factors
            feature['properties']['live_weather'] = weather['condition']
            feature['properties']['visibility_risk'] = "High" if weather['visibility_km'] < 2 else "Low"
            print(f"Location: {lat}, {lon} | Weather: {weather['condition']} | Risk: {feature['properties']['visibility_risk']}")

    # Save the enriched data
    with open('geospatial/data/processed/accidents_enriched.geojson', 'w') as f:
        json.dump(data, f)
    print("SUCCESS: Enriched data saved to accidents_enriched.geojson")

if __name__ == "__main__":
    enrich_hotspots()