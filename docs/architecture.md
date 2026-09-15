# Architecture

The system utilizes a decoupled architecture where a React frontend communicates with a Python FastAPI backend, which serves pre-trained scikit-learn models.

## System Diagram

```mermaid
graph TD
    A[User / Browser] -->|View Neumorphic UI| B[React Frontend]
    B -->|Click 'Simulate Spike'| B
    B -->|Fetch POST /predict/health| C[FastAPI Backend]
    B -->|Fetch POST /predict/weather| C
    B -->|Fetch POST /predict/anomaly| C
    
    C -->|Parse 14 parameters| D[RandomForestRegressor: health_model.pkl]
    C -->|Parse 6 parameters| E[RandomForestRegressor: weather_model.pkl]
    C -->|Parse 6 parameters| F[IsolationForest: anomaly_model.pkl]
    
    D -->|Return Health %| C
    E -->|Return Outage Risk| C
    F -->|Return True/False| C
    
    C -->|JSON Response| B
```

## Component Breakdown

| Component | Technology | Responsibility |
|---|---|---|
| **Frontend** | React, Vite, CSS (Neumorphism) | Displays live telemetry and handles user interactions. |
| **Backend** | Python, FastAPI | Exposes REST endpoints (`/predict/*`) and loads model pickles. |
| **Machine Learning** | Scikit-learn, Pandas | Predicts numerical health scores and detects multi-variate anomalies. |
