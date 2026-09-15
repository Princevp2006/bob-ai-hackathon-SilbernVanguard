# Setup Guide

This guide explains how to get the SilbernVanguard Power Grid Dashboard running on your local machine.

## Prerequisites
- **Python 3.9+** (For the FastAPI Backend and ML Models)
- **Node.js 18+** (For the React Frontend)
- **Git**

## 1. Clone the Repository
```bash
git clone https://github.com/Princevp2006/bob-ai-hackathon-SilbernVanguard.git
cd bob-ai-hackathon-SilbernVanguard
```

## 2. Start the FastAPI Backend
Open a terminal and navigate to the backend directory:
```bash
cd src/backend
pip install -r requirements.txt
uvicorn api:app --reload --port 8000
```
Verify it is working by visiting `http://localhost:8000/docs` in your browser. You should see the Swagger UI for the prediction endpoints.

## 3. Start the React Frontend
Open a **new** terminal and navigate to the frontend directory:
```bash
cd src/frontend
npm install
npm run dev
```

## 4. View the App
Open your browser to `http://localhost:5173`. You will see the Neumorphic Dashboard. Click the **"Simulate Spike"** button to inject randomized data and test the AI predictions!

## Troubleshooting

| Error | Fix |
|---|---|
| `uvicorn is not recognized` | Ensure Python is added to your system PATH, or use `python -m uvicorn api:app --reload` |
| `ENOENT package.json` | Make sure you are inside the `src/frontend` directory before running `npm install` |
| Fetch/Network Error in React | Ensure the FastAPI backend is running on port 8000 in a separate terminal window |
