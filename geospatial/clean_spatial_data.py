import pandas as pd
import json
import numpy as np

# 1. Load your actual file
file_path = 'geospatial/data/raw/accident_prediction_india.csv'
df = pd.read_csv(file_path)

# 2. EMERGENCY: Since we lack Lat/Lon, we generate random points 
# within India's bounds for the visualization MVP.
# (In a real scenario, we'd use a Geocoding API, but we have 10 hours left!)
np.random.seed(42)
df['latitude'] = np.random.uniform(8.4, 37.6, len(df))
df['longitude'] = np.random.uniform(68.1, 97.4, len(df))

# 3. Standardize column names for the Data Contract
df = df.rename(columns={
    'Accident Severity': 'severity',
    'Weather Conditions': 'weather',
    'Road Type': 'road_type'
})

# 4. Convert to GeoJSON
def df_to_geojson(df, properties):
    geojson = {'type':'FeatureCollection', 'features':[]}
    for _, row in df.iterrows():
        feature = {
            'type':'Feature',
            'properties':{prop: row[prop] for prop in properties},
            'geometry':{'type':'Point', 'coordinates':[row['longitude'], row['latitude']]}
        }
        geojson['features'].append(feature)
    return geojson

cols = ['severity', 'weather', 'road_type', 'State Name', 'City Name']
data_geojson = df_to_geojson(df, cols)

# 5. Save
with open('geospatial/data/processed/accidents_base.geojson', 'w') as f:
    json.dump(data_geojson, f)

print("SUCCESS: accidents_base.geojson created with simulated coordinates for MVP.")