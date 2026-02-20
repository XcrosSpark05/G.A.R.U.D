import pandas as pd
import json

# 1. Load your CSV (Replace 'your_file.csv' with the actual name)
df = pd.read_csv('geospatial/data/raw/your_file.csv')

# 2. Aggressive Cleaning
df = df.dropna(subset=['latitude', 'longitude']) # Drop rows without coordinates

# 3. Convert to GeoJSON format
def df_to_geojson(df, properties, lat='latitude', lon='longitude'):
    geojson = {'type':'FeatureCollection', 'features':[]}
    for _, row in df.iterrows():
        feature = {'type':'Feature',
                   'properties':{},
                   'geometry':{'type':'Point',
                               'coordinates':[]}}
        feature['geometry']['coordinates'] = [row[lon], row[lat]]
        for prop in properties:
            feature['properties'][prop] = row[prop]
        geojson['features'].append(feature)
    return geojson

# Specify which columns you want to keep (e.g., severity, weather, road_type)
cols_to_keep = ['severity', 'road_type'] 
data_geojson = df_to_geojson(df, cols_to_keep)

# 4. Save to Processed folder
with open('geospatial/data/processed/accidents_base.geojson', 'w') as f:
    json.dump(data_geojson, f)

print("Successfully created accidents_base.geojson")