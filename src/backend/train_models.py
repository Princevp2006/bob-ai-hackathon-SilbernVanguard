import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, IsolationForest
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

print("Training Models...")

# 1. Health Index Model (Predicts transformer health based on oil gas analysis)
print("\n--- 1. Training Health Index Model ---")
df_health = pd.read_csv(r'D:\IBM\Health index1 (2).csv')
# Features: Gases and oil properties
X_health = df_health[['Hydrogen', 'Oxigen', 'Nitrogen', 'Methane', 'CO', 'CO2', 
                      'Ethylene', 'Ethane', 'Acethylene', 'DBDS', 'Power factor', 
                      'Interfacial V', 'Dielectric rigidity', 'Water content']]
y_health = df_health['Health index']

X_train, X_test, y_train, y_test = train_test_split(X_health, y_health, test_size=0.2, random_state=42)
health_model = RandomForestRegressor(n_estimators=100, random_state=42)
health_model.fit(X_train, y_train)

y_pred = health_model.predict(X_test)
print(f"Health Model MSE: {mean_squared_error(y_test, y_pred):.2f}")
print(f"Health Model R2: {r2_score(y_test, y_pred):.2f}")

joblib.dump(health_model, r'D:\IBM\backend\health_model.pkl')
print("Saved health_model.pkl")


# 2. Weather Outage Model (Predicts Max_outage based on weather)
print("\n--- 2. Training Weather Outage Model ---")
df_weather = pd.read_csv(r'D:\IBM\Weather_data_combined_with_outage.csv')
# Features: temp, humidity, wind, precipitation
features = ['tmpf', 'relh', 'gust', 'feel', 'p01i', 'sknt']
# Fill NaNs
df_weather_clean = df_weather.copy()
for col in features:
    df_weather_clean[col] = df_weather_clean[col].fillna(df_weather_clean[col].mean())

X_weather = df_weather_clean[features]
y_weather = df_weather_clean['Max_outage']

X_w_train, X_w_test, y_w_train, y_w_test = train_test_split(X_weather, y_weather, test_size=0.2, random_state=42)
weather_model = RandomForestRegressor(n_estimators=50, max_depth=10, random_state=42, n_jobs=-1)
weather_model.fit(X_w_train, y_w_train)

y_w_pred = weather_model.predict(X_w_test)
print(f"Weather Model MSE: {mean_squared_error(y_w_test, y_w_pred):.2f}")
print(f"Weather Model R2: {r2_score(y_w_test, y_w_pred):.2f}")

joblib.dump(weather_model, r'D:\IBM\backend\weather_model.pkl')
print("Saved weather_model.pkl")


# 3. Telemetry Anomaly Detection (Current/Voltage)
print("\n--- 3. Training Telemetry Anomaly Model ---")
df_cv = pd.read_csv(r'D:\IBM\CurrentVoltage.csv')
# Features: Voltages and Currents
X_cv = df_cv[['VL1', 'VL2', 'VL3', 'IL1', 'IL2', 'IL3']]
X_cv_clean = X_cv.fillna(0)

anomaly_model = IsolationForest(contamination=0.05, random_state=42)
anomaly_model.fit(X_cv_clean)

# Predict anomalies (-1 is anomaly, 1 is normal)
predictions = anomaly_model.predict(X_cv_clean)
num_anomalies = (predictions == -1).sum()
print(f"Detected {num_anomalies} anomalies out of {len(predictions)} telemetry points.")

joblib.dump(anomaly_model, r'D:\IBM\backend\anomaly_model.pkl')
print("Saved anomaly_model.pkl")

print("\nAll models trained successfully!")
