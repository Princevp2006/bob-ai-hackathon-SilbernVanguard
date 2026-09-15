import React from 'react';
import { Settings as SettingsIcon, Save, Bell, Database } from 'lucide-react';

export default function Settings() {
  return (
    <div className="main-content">
      <div className="panel">
        <h1 style={{ marginBottom: '5px' }}>System Settings</h1>
        <p className="text-small">Configure dashboard parameters and AI models.</p>
      </div>

      <div className="grid-2">
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 className="text-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={20} /> Data Sources
          </h3>
          
          <div className="screen" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px', fontSize: '0.9rem' }}>FastAPI Backend URL</label>
              <input 
                type="text" 
                defaultValue="http://localhost:8000" 
                style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '5px' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px', fontSize: '0.9rem' }}>Telemetry Refresh Rate (ms)</label>
              <input 
                type="number" 
                defaultValue="5000" 
                style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '5px' }} 
              />
            </div>
          </div>
        </div>

        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 className="text-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={20} /> Alert Preferences
          </h3>
          
          <div className="screen" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Critical Anomaly SMS Alerts</span>
              <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Auto-Dispatch Maintenance Crews</span>
              <input type="checkbox" style={{ width: '20px', height: '20px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Weather Storm Push Notifications</span>
              <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="button" onClick={() => alert("Settings saved successfully!")}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
