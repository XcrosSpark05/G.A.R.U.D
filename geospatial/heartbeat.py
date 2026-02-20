import time
import subprocess
import os

def run_heartbeat(interval_seconds=300):
    """
    Triggers the enrichment process every 5 minutes (300s).
    For the demo, you can set this to 30s to show judges 'live' changes.
    """
    print("🚀 GARUD Heartbeat Started...")
    print(f"Update Interval: {interval_seconds} seconds")
    
    try:
        while True:
            print(f"\n[{time.strftime('%H:%M:%S')}] Refreshing environmental risk factors...")
            
            # Trigger your existing enrichment script
            result = subprocess.run(['python', 'geospatial/enrich_data.py'], capture_output=True, text=True)
            
            if result.returncode == 0:
                print("✅ Heartbeat Successful: data/accidents_enriched.geojson updated.")
            else:
                print(f"❌ Heartbeat Failed: {result.stderr}")
            
            print(f"Waiting {interval_seconds}s for next pulse...")
            time.sleep(interval_seconds)
            
    except KeyboardInterrupt:
        print("\n🛑 Heartbeat stopped by user.")

if __name__ == "__main__":
    # For the Demo/Pitch, use 30 seconds so judges see the risk level change!
    run_heartbeat(interval_seconds=30)