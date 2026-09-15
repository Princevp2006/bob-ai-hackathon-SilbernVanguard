import React, { useState } from 'react';
import { Power, ShieldAlert, XCircle, CheckCircle } from 'lucide-react';

export default function Emergency() {
  const [shutdownInitiated, setShutdownInitiated] = useState(false);

  return (
    <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="panel" style={{ width: '600px', border: '1px solid rgba(239, 68, 68, 0.5)', boxShadow: shutdownInitiated ? '0 0 50px rgba(239, 68, 68, 0.3)' : '0 8px 32px 0 rgba(0, 0, 0, 0.4)' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center', padding: '20px' }}>
          
          <ShieldAlert size={60} color="var(--accent-red)" />
          
          <h1 style={{ color: 'var(--accent-red)', fontSize: '2rem', letterSpacing: '2px' }}>
            MANUAL OVERRIDE
          </h1>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            WARNING: Initiating an emergency stop will immediately cut power to all active subsystems on the grid. This action cannot be undone from this dashboard and requires physical engineer reset.
          </p>

          {!shutdownInitiated ? (
            <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
              <button 
                className="button" 
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: 'var(--accent-red)', color: 'var(--accent-red)', fontSize: '1.2rem', padding: '15px 40px' }}
                onClick={() => setShutdownInitiated(true)}
              >
                <Power size={24} /> CONFIRM SHUTDOWN
              </button>
            </div>
          ) : (
            <div className="screen" style={{ marginTop: '20px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-red)', width: '100%' }}>
              <h2 style={{ color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <XCircle size={28} /> SYSTEM OFFLINE
              </h2>
              <p style={{ marginTop: '10px', color: '#fca5a5' }}>
                Shutdown command transmitted successfully. All nodes disconnected.
              </p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
