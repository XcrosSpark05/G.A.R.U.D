import pandas as pd
from sklearn.cluster import DBSCAN
import numpy as np

def run_clustering(input_csv, output_file):
    df = pd.read_csv(input_csv)
    
    # Using Haversine for geographical distance
    coords = df[['latitude', 'longitude']].values
    kms_per_radian = 6371.0088
    epsilon = 0.5 / kms_per_radian # 500m cluster radius
    
    db = DBSCAN(eps=epsilon, min_samples=5, algorithm='ball_tree', metric='haversine').fit(np.radians(coords))
    
    df['cluster_id'] = db.labels_
    # Filter out noise (-1) to send only hotspots to Member B
    hotspots = df[df['cluster_id'] != -1]
    
    hotspots.to_csv(output_file, index=False)
    print(f"✅ Success: Found {len(hotspots['cluster_id'].unique())} accident hotspots.")

if __name__ == "__main__":
    # We will get 'accidents_raw.csv' from Member B/D shortly
    print("Clustering script ready. Waiting for data...")