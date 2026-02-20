from pydantic import BaseModel
from typing import List, Dict

class RiskScore(BaseModel):
    latitude: float
    longitude: float
    risk_level: str  # e.g., Low, Medium, High, CRITICAL
    factors: List[str]
    intensity: float
    interventions: List[str]  # New: Recommended actions
    impact_metrics: Dict[str, float]  # New: Lives saved, cost avoided