import React, { useState } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function RiskAssets() {
  const [trx4Dispatched, setTrx4Dispatched] = useState(false);
  const [sub01Scheduled, setSub01Scheduled] = useState(false);

  return (
    <div className="main-content">
      <div className="panel">
        <h1 style={{ marginBottom: '5px' }}>At-Risk Assets</h1>
        <p className="text-small">Prioritized list based on ML predictions.</p>
      </div>

      <div className="panel" style={{ flex: 1 }}>
        <h3 className="text-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertTriangle size={20} color="var(--accent-red)" />
          Critical Maintenance Required
        </h3>
        <div className="screen" style={{ padding: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Asset ID</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Location</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Health Index</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Risk Factor</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>TR-X4</td>
                <td style={{ padding: '12px' }}>Navi Mumbai</td>
                <td style={{ padding: '12px', color: 'var(--accent-red)' }}>54.2%</td>
                <td style={{ padding: '12px' }}>Voltage Anomaly + Storm</td>
                <td style={{ padding: '12px' }}>
                  {!trx4Dispatched ? (
                    <button className="button" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => setTrx4Dispatched(true)}>
                      Dispatch Crew
                    </button>
                  ) : (
                    <span className="text-small" style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <CheckCircle size={16} /> Dispatched!
                    </span>
                  )}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>SUB-01</td>
                <td style={{ padding: '12px' }}>Andheri East</td>
                <td style={{ padding: '12px', color: 'var(--accent-yellow)' }}>68.1%</td>
                <td style={{ padding: '12px' }}>High DBDS in Oil</td>
                <td style={{ padding: '12px' }}>
                  {!sub01Scheduled ? (
                    <button className="button" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => setSub01Scheduled(true)}>
                      Schedule Maint
                    </button>
                  ) : (
                    <span className="text-small" style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <CheckCircle size={16} /> Scheduled!
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>TR-Z9</td>
                <td style={{ padding: '12px' }}>Thane Main Grid</td>
                <td style={{ padding: '12px', color: 'var(--accent-green)' }}>89.5%</td>
                <td style={{ padding: '12px' }}>None</td>
                <td style={{ padding: '12px' }}><span className="text-small" style={{ color: 'var(--accent-green)' }}>Stable</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
