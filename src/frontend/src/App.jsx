import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import GridMap from './components/GridMap'
import RiskAssets from './components/RiskAssets'
import Settings from './components/Settings'
import Emergency from './components/Emergency'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'map' && <GridMap />}
      {activeTab === 'risk' && <RiskAssets />}
      {activeTab === 'settings' && <Settings />}
      {activeTab === 'emergency' && <Emergency />}
    </div>
  )
}

export default App
