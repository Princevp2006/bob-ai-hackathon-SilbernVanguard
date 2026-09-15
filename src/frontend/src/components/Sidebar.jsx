import React from 'react';
import { Activity, Map, AlertTriangle, Settings, Power } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <div className="indicator safe" style={{ width: '24px', height: '24px' }}></div>
        <h2 style={{ fontSize: '1.2rem', textAlign: 'center', color: 'var(--text-primary)' }}>SYSTEM ONLINE</h2>
      </div>

      <div className="panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button 
          className={`button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Activity size={20} />
          <span>Dashboard</span>
        </button>
        <button 
          className={`button ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <Map size={20} />
          <span>Grid Map</span>
        </button>
        <button 
          className={`button ${activeTab === 'risk' ? 'active' : ''}`}
          onClick={() => setActiveTab('risk')}
        >
          <AlertTriangle size={20} />
          <span>Risk Assets</span>
        </button>
        
        <div style={{ flex: 1 }}></div>

        <button 
          className={`button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
        
        <button 
          className={`button primary ${activeTab === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergency')}
        >
          <Power size={20} color="white" />
          <span style={{ color: 'white' }}>Emergency</span>
        </button>
      </div>
    </div>
  );
}
