# Solution Overview

Our solution, the **Power Grid Health Dashboard**, addresses the predictive maintenance problem by feeding live telemetry and oil gas analysis directly into pre-trained Machine Learning models.

## Core Mechanism
Instead of relying on human operators to cross-reference multiple sensor readouts, the system passes 14 distinct chemical and electrical parameters into a Scikit-Learn `RandomForestRegressor`. It instantly synthesizes these variables into a single, understandable "Grid Health" percentage (0-100%). Simultaneously, an `IsolationForest` model acts as a tripwire, monitoring live 3-phase voltages and currents to detect unmapped anomalies.

## Differentiation
Unlike naive threshold alarms, our ML models find non-linear correlations. For example, a slight increase in DBDS (corrosive sulfur) combined with a moderate increase in water content may trigger a "Warning" state long before either value reaches a critical alarm threshold.

## User Experience
To prevent "alert fatigue," the frontend is built using a clean, state-of-the-art **Neumorphic (Soft UI)** design. Instead of overwhelming the operator with spreadsheets, the dashboard distills the ML predictions into physical-looking LED indicators (Green, Orange, Red), providing instant situational awareness at a glance.
