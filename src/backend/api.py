from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import numpy as np
from pydantic import BaseModel

app = FastAPI(title="Power Outage Prediction API")

# Allow CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models
health_model = joblib.load('health_model.pkl')
weather_model = joblib.load('weather_model.pkl')
anomaly_model = joblib.load('anomaly_model.pkl')

class HealthRequest(BaseModel):
    Hydrogen: int
    Oxigen: int
    Nitrogen: int
    Methane: int
    CO: int
    CO2: int
    Ethylene: int
    Ethane: int
    Acethylene: int
    DBDS: float
    Power_factor: float
    Interfacial_V: int
    Dielectric_rigidity: int
    Water_content: int

class WeatherRequest(BaseModel):
    tmpf: float
    relh: float
    gust: float
    feel: float
    p01i: float
    sknt: float

class TelemetryRequest(BaseModel):
    VL1: float
    VL2: float
    VL3: float
    IL1: float
    IL2: float
    IL3: float

@app.get("/")
def read_root():
    return {"status": "API is running"}

@app.post("/predict/health")
def predict_health(data: HealthRequest):
    # Predict health index (0 to 100, where higher is generally better or worse depending on scale)
    features = [[data.Hydrogen, data.Oxigen, data.Nitrogen, data.Methane, data.CO, data.CO2,
                 data.Ethylene, data.Ethane, data.Acethylene, data.DBDS, data.Power_factor,
                 data.Interfacial_V, data.Dielectric_rigidity, data.Water_content]]
    
    prediction = health_model.predict(features)[0]
    return {"predicted_health_index": float(prediction)}

@app.post("/predict/weather")
def predict_weather(data: WeatherRequest):
    features = [[data.tmpf, data.relh, data.gust, data.feel, data.p01i, data.sknt]]
    prediction = weather_model.predict(features)[0]
    return {"predicted_outage_severity": float(prediction)}

@app.post("/predict/anomaly")
def predict_anomaly(data: TelemetryRequest):
    features = [[data.VL1, data.VL2, data.VL3, data.IL1, data.IL2, data.IL3]]
    prediction = anomaly_model.predict(features)[0]
    is_anomaly = True if prediction == -1 else False
    return {"is_anomaly": is_anomaly}

# Run with: uvicorn api:app --reload
