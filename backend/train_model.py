import pandas as pd
import xgboost as xgb

def train():
    # 1. Load data (Ensure Member D has placed this in the folder)
    df = pd.read_csv('hotspots_clustered.csv')
    
    # 2. Define Features (Example: Lat, Lon, Hour)
    X = df[['latitude', 'longitude']] 
    y = df['cluster_id'] # Using cluster density as a proxy for risk
    
    # 3. Train
    model = xgb.XGBRegressor()
    model.fit(X, y)
    
    # 4. Export
    model.save_model('backend/garud_model.json')
    print("✅ Engine Trained: garud_model.json generated.")

if __name__ == "__main__":
    train()