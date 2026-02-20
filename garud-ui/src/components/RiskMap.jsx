import React from 'react';
import { MapContainer, TileLayer, ZoomControl, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function RiskMap({ time, weather }) {
  const hotspots = [
    { id: 1, pos: [19.0760, 72.8777], risk: 'High', factor: 'Heavy Traffic Congestion' },
    { id: 2, pos: [28.7041, 77.1025], risk: 'Medium', factor: 'Poor Visibility' },
    { id: 3, pos: [21.1458, 79.0882], risk: 'High', factor: 'Poor Road Geometry' }
  ];

  return (
    <div className="h-full w-full relative" style={{ backgroundColor: '#1E3A8A' }}>
      <MapContainer
        center={[20.5937, 78.9629]} 
        zoom={5}
        className="h-full w-full"
        zoomControl={false} 
        attributionControl={false}
        style={{ background: '#1E3A8A' }} 
      >
        <ZoomControl position="bottomright" />

        {/* FIXED: Using standard Voyager (includes labels) with a CSS class for tinting */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          className="blue-tint-map" 
        />

        {hotspots.map((spot) => (
          <CircleMarker
            key={spot.id}
            center={spot.pos}
            pathOptions={{
              color: spot.risk === 'High' ? '#DC143C' : '#FFD700',
              fillColor: spot.risk === 'High' ? '#DC143C' : '#FFD700',
              fillOpacity: 0.8,
              weight: 3
            }}
            radius={15}
          >
            <Popup>
              <div style={{ 
                textAlign: 'center', 
                padding: '4px', 
                backgroundColor: '#1E3A8A', 
                borderRadius: '4px' 
              }}>
                <h3 style={{ 
                  margin: 0, 
                  fontWeight: 'bold', 
                  color: '#FFFFFF', 
                  letterSpacing: '1px',
                  borderBottom: `2px solid ${spot.risk === 'High' ? '#DC143C' : '#FFD700'}`,
                  paddingBottom: '4px'
                }}>
                  {spot.risk.toUpperCase()} RISK
                </h3>
                <p style={{ margin: '10px 0 0 0', fontSize: '13px', color: '#FFFFFF' }}>
                  <b style={{ color: '#FFD700' }}>FACTOR:</b> {spot.factor}
                </p>
                <p style={{ 
                  margin: '6px 0 0 0', 
                  fontSize: '11px', 
                  color: '#FFFFFF',
                  opacity: 0.9,
                  fontStyle: 'italic' 
                }}>
                  {time}:00 Hrs | {weather.toUpperCase()}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}