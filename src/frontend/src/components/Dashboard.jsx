import React, { useState, useEffect } from 'react';
import StatusCard from './StatusCard';
import { Zap, Thermometer, Wind, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [healthScore, setHealthScore] = useState(0);
  const [outageRisk, setOutageRisk] = useState('Calculating...');
  const [anomaly, setAnomaly] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulated live sensor data
  const [sensorData, setSensorData] = useState({
    voltage: 240.2,
    temp: 95.5,
    gusts: 45.0,
    hydrogen: 1300,
    methane: 90,
    waterContent: 10,
    dbds: 45,
    co2: 1000,
    dielectric: 55
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Health Index Prediction
      const healthRes = await fetch('http://localhost:8000/predict/health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Hydrogen: parseInt(sensorData.hydrogen), 
          Oxigen: 100, 
          Nitrogen: 25000, 
          Methane: parseInt(sensorData.methane), 
          CO: 100, 
          CO2: parseInt(sensorData.co2), 
          Ethylene: 10, 
          Ethane: 300, 
          Acethylene: 5, 
          DBDS: parseFloat(sensorData.dbds), 
          Power_factor: 1.5, 
          Interfacial_V: 45, 
          Dielectric_rigidity: parseInt(sensorData.dielectric), 
          Water_content: parseInt(sensorData.waterContent)
        })
      });
      const healthData = await healthRes.json();
      setHealthScore(healthData.predicted_health_index.toFixed(1));

      // 2. Fetch Weather Outage Prediction
      const weatherRes = await fetch('http://localhost:8000/predict/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tmpf: parseFloat(sensorData.temp), relh: 80.0, gust: parseFloat(sensorData.gusts), feel: 105.0, p01i: 1.5, sknt: 45.0
        })
      });
      const weatherData = await weatherRes.json();
      setOutageRisk(weatherData.predicted_outage_severity > 5000 ? 'HIGH RISK' : 'STABLE');

      // 3. Fetch Anomaly Prediction
      const anomalyRes = await fetch('http://localhost:8000/predict/anomaly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          VL1: parseFloat(sensorData.voltage), VL2: 240.0, VL3: 240.0, IL1: 10.0, IL2: 10.0, IL3: 10.0
        })
      });
      const anomalyData = await anomalyRes.json();
      setAnomaly(anomalyData.is_anomaly);

    } catch (err) {
      console.error("Error fetching predictions:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Simulate changing sensors
  const randomizeSensors = () => {
    const scenario = Math.random();
    
    if (scenario < 0.33) {
      // 1. HEALTHY SCENARIO (Will trigger > 80% Green)
      setSensorData({
        voltage: (Math.random() * (245 - 235) + 235).toFixed(1),
        temp: (Math.random() * (65 - 50) + 50).toFixed(1),
        gusts: (Math.random() * (15 - 5) + 5).toFixed(1),
        hydrogen: Math.floor(Math.random() * 100),
        methane: Math.floor(Math.random() * 20),
        waterContent: Math.floor(Math.random() * 5), 
        dbds: Math.floor(Math.random() * 10), 
        co2: Math.floor(Math.random() * 500), 
        dielectric: Math.floor(Math.random() * (60 - 55) + 55) 
      });
    } else if (scenario < 0.66) {
      // 2. WARNING SCENARIO (Will trigger 60-80% Orange)
      setSensorData({
        voltage: (Math.random() * (235 - 200) + 200).toFixed(1),
        temp: (Math.random() * (85 - 65) + 65).toFixed(1),
        gusts: (Math.random() * (40 - 15) + 15).toFixed(1),
        hydrogen: Math.floor(Math.random() * (5000 - 1000) + 1000),
        methane: Math.floor(Math.random() * (500 - 100) + 100),
        waterContent: Math.floor(Math.random() * (25 - 10) + 10), 
        dbds: Math.floor(Math.random() * (100 - 40) + 40), 
        co2: Math.floor(Math.random() * (3000 - 1000) + 1000), 
        dielectric: Math.floor(Math.random() * (45 - 35) + 35) 
      });
    } else {
      // 3. DANGER SCENARIO (Will trigger < 60% Red)
      setSensorData({
        voltage: (Math.random() * (150 - 100) + 100).toFixed(1),
        temp: (Math.random() * (120 - 90) + 90).toFixed(1),
        gusts: (Math.random() * (70 - 45) + 45).toFixed(1),
        hydrogen: Math.floor(Math.random() * (20000 - 10000) + 10000),
        methane: Math.floor(Math.random() * (2000 - 1000) + 1000),
        waterContent: Math.floor(Math.random() * (60 - 30) + 30), 
        dbds: Math.floor(Math.random() * (200 - 150) + 150), 
        co2: Math.floor(Math.random() * (10000 - 5000) + 5000), 
        dielectric: Math.floor(Math.random() * (25 - 10) + 10) 
      });
    }
  };

  // Re-fetch when sensor data changes
  useEffect(() => {
    fetchData();
  }, [sensorData]);

  return (
    <div className="main-content">
      <div className="panel">
        <h1 style={{ marginBottom: '5px' }}>Grid Overview</h1>
        <p className="text-small">Real-time analysis powered by Machine Learning.</p>
      </div>

      <div className="grid-2">
        <StatusCard 
          title="Overall Grid Health" 
          value={loading ? '...' : healthScore} 
          unit="%" 
          icon={ActivityIcon} 
          status={healthScore > 80 ? 'safe' : (healthScore > 60 ? 'warning' : 'danger')} 
        />
        <StatusCard 
          title="Predicted Outage Risk" 
          value={loading ? '...' : outageRisk} 
          unit="" 
          icon={AlertCircle} 
          status={outageRisk === 'HIGH RISK' ? 'danger' : 'safe'} 
        />
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3 className="text-title">Live Telemetry</h3>
          <div className="screen" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
            <div className="data-row">
              <span>Phase 1 Voltage</span>
              <strong style={{ color: anomaly ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                {sensorData.voltage} V {anomaly && '(ANOMALY)'}
              </strong>
            </div>
            <div className="data-row">
              <span>Transformer Temp</span>
              <strong style={{ color: sensorData.temp > 90 ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                {sensorData.temp} °C
              </strong>
            </div>
            <div className="data-row">
              <span>Weather (Gusts)</span>
              <strong>{sensorData.gusts} mph</strong>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
            <button className="button primary" onClick={randomizeSensors} disabled={loading}>
              {loading ? 'Analyzing...' : 'Simulate Spike'}
            </button>
          </div>
        </div>

        <div className="panel">
          <h3 className="text-title">Maintenance Queue</h3>
           <div className="screen" style={{ minHeight: '200px', padding: '10px' }}>
             <div className="data-row" style={{ borderBottom: '2px solid rgba(163, 177, 198, 0.4)', color: 'var(--text-secondary)' }}>
               <div style={{ flex: 1 }}>Asset ID</div>
               <div style={{ flex: 2 }}>Reason</div>
               <div style={{ width: '50px' }}>Status</div>
             </div>
             <div className="data-row">
               <div style={{ flex: 1 }}>SUB-01</div>
               <div style={{ flex: 2 }}>High DBDS (Model prediction)</div>
               <div style={{ width: '50px' }}><div className="indicator danger"></div></div>
             </div>
             <div className="data-row">
               <div style={{ flex: 1 }}>TR-X4</div>
               <div style={{ flex: 2 }}>Voltage Anomaly detected</div>
               <div style={{ width: '50px' }}><div className={`indicator ${anomaly ? 'danger' : 'safe'}`}></div></div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// Simple wrapper for Activity since it's already in lucide-react but we want to map it
const ActivityIcon = ({ size, color }) => <Zap size={size} color={color} />;
