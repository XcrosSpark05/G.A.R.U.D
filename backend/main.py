from fastapi import FastAPI
from backend.shared_schema import RiskScore  # Importing Member D's contract
import uvicorn

app = FastAPI(title="GARUD Prediction Engine")

@app.get("/")
def home():
    return {"message": "GARUD Command Center is Online"}

@app.post("/predict", response_model=RiskScore)
def predict_accident_risk(lat: float, lon: float):
    # logic will go here once the model is trained
    # For now, we return a "Mock" response so Member C can build the UI
    return {
        "risk_score": 0.65,
        "factors": ["High curvature", "Nighttime", "Recent Rainfall"],
        "severity": "Medium"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)