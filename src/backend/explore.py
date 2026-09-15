import pandas as pd
import os

print("--- Health Index ---")
df_health = pd.read_csv(r'D:\IBM\Health index1 (2).csv')
print(df_health.info())
print(df_health.head())

print("\n--- Current Voltage ---")
df_cv = pd.read_csv(r'D:\IBM\CurrentVoltage.csv')
print(df_cv.info())

print("\n--- Weather Data ---")
df_weather = pd.read_csv(r'D:\IBM\Weather_data_combined_with_outage.csv')
print(df_weather.info())
print(df_weather.head())
