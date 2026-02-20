import json
import os
from weather_service import WeatherService

def enrich_hotspots():
    service = WeatherService()
    
    # Use the path that corresponds to your project structure
    input_path = 'data/accidents_base.geojson' 
    
    if not os.path.exists(input_path):
        print(f"ERROR: Input file not found at {input_path}")
        return

    with open(input_path, 'r') as f:
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

    # Define output path and ensure the directory exists
    output_path = 'data/accidents_enriched.geojson'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w') as f:
        json.dump(data, f)
    
    print(f"SUCCESS: Enriched data saved to {output_path}")

if __name__ == "__main__":
    enrich_hotspots()