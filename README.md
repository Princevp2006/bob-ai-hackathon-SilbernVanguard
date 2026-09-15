# 🚀 Power Grid Health & Outage Prediction Dashboard

---

## 👥 Team

| Field | Value |
|---|---|
| **Team Name** | SilbernVanguard |
| **Track** | AI / Sustainability |
| **Team Lead** | [Prince Prajapati] — [24dce113@charusat.edu.in] |
| **Members** | [Bhushan patil], [Neer patel], [Neev rathod] |

---

## 🎯 Problem Statement

Unplanned power grid outages and catastrophic transformer failures cause massive economic disruptions and safety hazards. Grid operators struggle to proactively predict when a transformer will fail due to internal chemical degradation (like corrosive sulfur/DBDS) or when severe weather patterns will trigger localized outages, leading to a reactive rather than preventive maintenance approach.

---

## 💡 Solution

We built an ML-powered, real-time Neumorphic dashboard that continuously streams grid telemetry, weather data, and transformer oil gas analysis to predict failures before they happen. By utilizing Random Forest and Isolation Forest models, the system actively categorizes grid health, flags live telemetry anomalies, and predicts weather-induced outages, allowing operators to dispatch crews preventively.

---

## ✨ Key Features

- **Live Telemetry Anomaly Detection:** Utilizes an Isolation Forest model to monitor live Phase 1/2/3 voltages and currents, instantly flagging critical drops or spikes.
- **Transformer Health Prediction:** Employs a Random Forest Regressor trained on 14 dissolved gas properties (Hydrogen, Methane, DBDS, Water Content, etc.) to calculate a live Health Index (0-100%).
- **Weather Outage Risk:** Predicts outage severity based on real-time weather feeds (wind gusts, temperature, relative humidity).
- **Interactive Neumorphic UI:** A state-of-the-art "Soft UI" dashboard built in React that visually responds to data severity with colored LED indicators and dynamic queues.
- **Simulated Stress Testing:** A built-in testing mechanism to inject massive sensor spikes (e.g., simulated 70mph gusts or 20,000ppm Hydrogen) to instantly verify AI responsiveness.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Languages** | Python, JavaScript, CSS |
| **Frameworks** | React, Vite, FastAPI |
| **Machine Learning** | Scikit-learn (RandomForestRegressor, IsolationForest), Pandas, Joblib |
| **Frontend Libraries**| Lucide-React (Icons), React-Leaflet (Mapping) |
| **Other** | Neumorphism Design System |

---

## 📁 Repository Structure

```
├── backend/              # Python FastAPI & Machine Learning Models
│   ├── api.py            # FastAPI server exposing prediction endpoints
│   ├── train_models.py   # ML training pipeline for Health, Weather, and Anomalies
│   ├── explore.py        # Data exploration and preprocessing
│   └── requirements.txt  # Python dependencies
├── frontend/             # React + Vite Neumorphic UI
│   ├── src/
│   │   ├── components/   # Modular React components (Dashboard, Sidebar, GridMap, etc.)
│   │   ├── index.css     # Neumorphic CSS Design System
│   │   └── App.jsx       # Main application routing
│   └── package.json      # Node dependencies
├── docs/                 # Written documentation
│   ├── problem-statement.md
│   ├── solution-overview.md
│   ├── architecture.md
│   └── setup-guide.md
├── demo/                 # Demo artifacts
│   ├── screenshots/      # App screenshots
│   └── demo-video-link.txt  
├── presentation/         # Slide deck
└── submission.yaml       # Structured submission metadata
```

---

## ⚡ How to Run

> **Local Setup Guide**

```bash
# 1. Clone the repo
git clone https://github.com/[your-repo].git
cd [your-repo]

# 2. Start the FastAPI Backend
cd backend
pip install -r requirements.txt
uvicorn api:app --reload --port 8000

# 3. Start the React Frontend (in a new terminal)
cd frontend
npm install
npm run dev

# 4. View the App
# Open your browser to http://localhost:5173
```

---

## 🖥️ Demo

| Artifact | Link |
|---|---|
| 📹 Demo Video | [Watch Video](https://www.youtube.com/watch?v=dQw4w9WgXcQ) |
| 🌐 Live Demo | Not Deployed Yet |
| 🖼️ Screenshots | [View Screenshots](demo/screenshots/) |
| 📊 Presentation | [Download Presentation](presentation/Team_SilbernVanguard_Presentation_Professional.pptx) |

---

## ⚠️ Known Limitations

- **Simulated Hardware:** Because we lack physical grid hardware, sensor telemetry is simulated dynamically on the frontend rather than via hardware IoT pipelines.
- **Map Interactivity:** The geographical Grid Map uses generic OSM tiles and currently displays static marker overlays rather than live GPS-tracked fleet locations.
- **Authentication:** There is no login/auth system; the dashboard assumes an already-authenticated local operator session.

---

## 🏅 What We're Most Proud Of

We are incredibly proud of the tight integration between the heavy-duty Python Machine Learning backend and the highly polished, state-of-the-art Neumorphic frontend. We successfully bridged complex data science (handling 14 variables of dissolved chemical gases and Isolation Forest anomaly detection) into a UI that feels responsive, alive, and instantly understandable for a grid operator.
