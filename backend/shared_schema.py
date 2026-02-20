from pydantic import BaseModel
from typing import List

class RiskScore(BaseModel):
    latitude: float
    longitude: float
    risk_level: str # Low, Medium, High, or Critical
    factors: List[str] # e.g. ["Sun Glare", "Heavy Rain", "Poor Visibility"]
    intensity: float # Severity from 0.0 to 1.0