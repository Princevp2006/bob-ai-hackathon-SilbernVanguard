import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom custom icons
const safeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const dangerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const warningIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


export default function GridMap() {
  // Center map on Mumbai, India
  const center = [19.0760, 72.8777];

  return (
    <div className="main-content">
      <div className="panel">
        <h1 style={{ marginBottom: '5px' }}>Geospatial Grid Map (India)</h1>
        <p className="text-small">Live asset locations and weather overlays mapped across the region.</p>
      </div>

      <div className="panel" style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
          <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%', backgroundColor: '#0a0f18' }}>
            
            {/* Standard OSM map tiles for Light mode */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Simulated Weather Storm over Navi Mumbai */}
            <Circle 
              center={[19.0330, 73.0297]} 
              radius={8000} 
              pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2 }}
            >
              <Popup>
                <strong style={{ color: 'red' }}>Severe Storm Cell</strong>
                <br />Wind Gusts: 65mph
              </Popup>
            </Circle>

            {/* Markers for Substations / Transformers */}
            <Marker position={[19.0430, 73.0297]} icon={dangerIcon}>
              <Popup>
                <strong>Navi Mumbai Substation (TR-X4)</strong><br />
                Status: <span style={{ color: 'red' }}>CRITICAL RISK</span><br />
                Reason: Inside Storm Path & Voltage Drop
              </Popup>
            </Marker>

            <Marker position={[19.0380, 72.8538]} icon={safeIcon}>
              <Popup>
                <strong>Dharavi Grid Center</strong><br />
                Status: <span style={{ color: 'green' }}>STABLE</span>
              </Popup>
            </Marker>

            <Marker position={[19.1136, 72.8697]} icon={warningIcon}>
              <Popup>
                <strong>Andheri East Substation (SUB-01)</strong><br />
                Status: <span style={{ color: 'orange' }}>WARNING</span><br />
                Reason: High DBDS in Oil
              </Popup>
            </Marker>

            <Marker position={[19.2183, 72.9781]} icon={safeIcon}>
              <Popup>
                <strong>Thane Main Grid (TR-Z9)</strong><br />
                Status: <span style={{ color: 'green' }}>STABLE</span>
              </Popup>
            </Marker>

          </MapContainer>
        </div>
      </div>
    </div>
  );
}
