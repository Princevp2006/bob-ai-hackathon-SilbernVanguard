import joblib
import pandas as pd

# Load models
print("Loading models...")
health_model = joblib.load('health_model.pkl')
weather_model = joblib.load('weather_model.pkl')
anomaly_model = joblib.load('anomaly_model.pkl')

print("\n--- 1. Testing Health Index Model ---")
# Give it a sample of bad oil (High Hydrogen, Methane, etc.)
sample_bad_health = [[13000, 100, 25000, 900, 100, 1000, 10, 300, 5, 45, 1.5, 45, 55, 10]]
health_pred = health_model.predict(sample_bad_health)
print(f"Predicted Health Index for sample: {health_pred[0]:.2f} (lower is worse)")

print("\n--- 2. Testing Weather Outage Model ---")
# Give it a sample of severe weather (High temp, high gusts)
sample_severe_weather = [[95.5, 80.0, 60.5, 105.0, 1.5, 45.0]] # tmpf, relh, gust, feel, p01i, sknt
weather_pred = weather_model.predict(sample_severe_weather)
print(f"Predicted Max Outage (Severity) for sample: {weather_pred[0]:.2f}")

print("\n--- 3. Testing Anomaly Detection Model ---")
# Normal voltage/current
sample_normal_cv = [[240.0, 240.0, 240.0, 10.0, 10.0, 10.0]]
# Dropping voltage spike
sample_anomaly_cv = [[120.0, 240.0, 240.0, 150.0, 10.0, 10.0]]

normal_pred = anomaly_model.predict(sample_normal_cv)
anomaly_pred = anomaly_model.predict(sample_anomaly_cv)

print(f"Normal CV Prediction: {'Anomaly' if normal_pred[0] == -1 else 'Normal'}")
print(f"Spike CV Prediction: {'Anomaly' if anomaly_pred[0] == -1 else 'Normal'}")

print("\nTests completed successfully.")
