import React from 'react';

export default function StatusCard({ title, value, unit, status = 'safe', icon: Icon }) {
  return (
    <div className="panel" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div className="screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }}>
        {Icon && <Icon size={28} color={status === 'danger' ? 'var(--accent-red)' : 'var(--accent-blue)'} />}
      </div>
      <div style={{ flex: 1 }}>
        <p className="text-small">{title}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
          <h2 style={{ fontSize: '2rem' }}>{value}</h2>
          <span className="text-small">{unit}</span>
        </div>
      </div>
      <div className={`indicator ${status}`}></div>
    </div>
  );
}
