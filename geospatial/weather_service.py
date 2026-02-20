import requests
import os
from dotenv import load_dotenv

load_dotenv()

class WeatherService:
    def __init__(self):
        self.api_key = os.getenv("OPENWEATHER_API_KEY")
        self.base_url = "https://api.openweathermap.org/data/2.5/weather"

    def get_weather_at_coords(self, lat, lon):
        """Fetches current weather for specific coordinates."""
        params = {
            "lat": lat,
            "lon": lon,
            "appid": self.api_key,
            "units": "metric"
        }
        
        try:
            response = requests.get(self.base_url, params=params)
            response.raise_for_status()
            data = response.json()
            
            # Extracting specific risk factors: Rain, Fog, Visibility
            weather_main = data['weather'][0]['main']
            description = data['weather'][0]['description']
            visibility = data.get('visibility', 10000) # Meters
            
            return {
                "condition": weather_main, # e.g., 'Rain', 'Mist', 'Fog'
                "description": description,
                "visibility_km": visibility / 1000,
                "temp_c": data['main']['temp']
            }
        except Exception as e:
            print(f"Weather API Error: {e}")
            return None

# Quick Test logic
if __name__ == "__main__":
    # Test with Mumbai Coordinates
    service = WeatherService()
    print(service.get_weather_at_coords(19.0760, 72.8777))