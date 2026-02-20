from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.shared_schema import RiskScore
from pydantic import BaseModel
from typing import List
import xgboost as xgb
import pandas as pd
import os
import math
import json

app = FastAPI(title="GARUD Prediction Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SPATIAL & INTELLIGENCE UTILITIES ---
DATA_PATH = 'data/accidents_base.geojson'
with open(DATA_PATH, 'r') as f:
    REAL_ROAD_DATA = json.load(f)

def haversine(lat1, lon1, lat2, lon2):
    R = 6371 
    dLat, dLon = math.radians(lat2 - lat1), math.radians(lon2 - lon1)
    a = math.sin(dLat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dLon/2)**2
    return 2 * R * math.asin(math.sqrt(a))

# 🌟 NEW: SOLAR FLARE/GLARE ENGINE
# Calculates risk based on sun angle (dangerous at sunrise/sunset)
def get_solar_glare_risk(hour_str):
    hour = int(hour_str)
    # Peak glare at 7-8 AM and 5-6 PM
    if (7 <= hour <= 8) or (17 <= hour <= 18):
        return 0.35, "Solar Glare: Low Sun Angle (Visibility 40%)"
    return 0.0, None

# 🌟 NEW: NEWS SENTIMENT SIMULATOR
# Simulates alerts from live news feeds/social media
def get_news_sentiment(lat, lon):
    # For demo: specific coordinate range triggers a 'Live Event'
    if 18.0 <= lat <= 22.0: # Simulating a trending event in this region
        return 0.25, "Live News: Traffic Congestion / Local Protest"
    return 0.0, None

def get_time_risk_multiplier(hour_str):
    hour = int(hour_str)
    return 0.2 * math.sin((hour - 14) * math.pi / 12) + 0.1

# --- MODELS ---
class PredictionRequest(BaseModel):
    lat: float
    lon: float
    time: str
    weather: str

MODEL_PATH = "backend/garud_model.json"
model = None
if os.path.exists(MODEL_PATH):
    model = xgb.XGBRegressor()
    model.load_model(MODEL_PATH)
    print("✅ AI Engine Loaded with Real Model")

# --- ENDPOINTS ---
@app.post("/predict", response_model=List[RiskScore])
def predict_accident_risk(request: PredictionRequest): 
    results = []
    fatigue_bonus = get_time_risk_multiplier(request.time)
    glare_score, glare_factor = get_solar_glare_risk(request.time)
    
    # 1. SPATIAL FILTER: Find real road segments within 5km
    nearby_features = [
        f for f in REAL_ROAD_DATA['features']
        if haversine(request.lat, request.lon, f['geometry']['coordinates'][1], f['geometry']['coordinates'][0]) < 5.0
    ]

    if not nearby_features:
        return []

    # 2. Prepare data for inference
    records = []
    for f in nearby_features:
        records.append({
            'latitude': f['geometry']['coordinates'][1],
            'longitude': f['geometry']['coordinates'][0],
            'is_construction': f['properties'].get('on_road_work', False)
        })
    
    input_df = pd.DataFrame(records)
    predictions = model.predict(input_df[['latitude', 'longitude']]) if model is not None else [0.3] * len(records)
    
    # 3. Process each real road point with Multi-Modal Intelligence
    for i, row in input_df.iterrows():
        intensity = float(predictions[i]) + fatigue_bonus
        factors = []

        # Construction Factor
        if row['is_construction']:
            intensity += 0.3
            factors.append("Active Construction Zone")

        # Solar Flare/Glare Factor
        if glare_score > 0:
            intensity += glare_score
            factors.append(glare_factor)

        # News Sentiment Factor
        news_score, news_factor = get_news_sentiment(row['latitude'], row['longitude'])
        if news_score > 0:
            intensity += news_score
            factors.append(news_factor)

        # Weather Factor
        if request.weather.lower() == "rainy":
            intensity += 0.25
            factors.append("Heavy Rainfall (45%)")
        elif request.weather.lower() == "foggy":
            intensity += 0.35
            factors.append("Low Visibility Fog (50%)")
            
        intensity = min(1.0, max(0.0, intensity))

        # Risk Level & Impact
        if intensity > 0.8:
            risk_level = "CRITICAL"
            interventions = ["Emergency Patrol Dispatch", "VMS: Solar/Weather Alert", "Reduce Speed to 40km/h"]
        elif intensity > 0.6:
            risk_level = "High"
            interventions = ["Deploy Traffic Calming", "VMS: Caution Zone"]
        else:
            risk_level = "Low"
            interventions = ["Automated Monitoring"]
            if not factors: factors = ["Clear Conditions"]

        results.append({
            "latitude": row['latitude'],
            "longitude": row['longitude'],
            "risk_level": risk_level,
            "factors": factors,
            "intensity": intensity,
            "interventions": interventions,
            "impact_metrics": {"lives_saved": round(intensity * 1.8, 1)}
        })
        
    return results

@app.get("/")
def home():
    return {"message": "GARUD Command Center is Online"}