import json
import pandas as pd
import xgboost as xgb

def train():
    # 1. Load the REAL data
    file_path = 'data/accidents_base.geojson'
    with open(file_path, 'r') as f:
        geojson_data = json.load(f)
    
    records = []
    for feature in geojson_data['features']:
        coords = feature['geometry']['coordinates']
        props = feature['properties']
        records.append({
            'latitude': coords[1],
            'longitude': coords[0],
            'severity': props.get('severity', 'Minor') # Text from Member B
        })
    
    df = pd.DataFrame(records)

    # 🌟 THE FIX: Map strings to numbers
    severity_mapping = {'Minor': 0.3, 'Serious': 0.7, 'Fatal': 1.0}
    df['severity_num'] = df['severity'].map(severity_mapping).fillna(0.5)
    
    # 2. Train using the numeric column
    X = df[['latitude', 'longitude']]
    y = df['severity_num'] 
    
    # Using 'reg:logistic' for the 0-1 probability scores Member D requested
    model = xgb.XGBRegressor(objective='reg:logistic')
    model.fit(X, y)
    
    # 3. Export
    model.save_model('backend/garud_model.json')
    print("✅ Success: Model trained! 'Serious' converted to 0.7 for math processing.")

if __name__ == "__main__":
    train()