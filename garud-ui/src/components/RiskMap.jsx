import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, CircleMarker, Popup, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet markers in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper component to move the map to your location automatically
function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords]);
  return null;
}

export default function RiskMap({ time, weather, setSelectedZone }) {
  const [hotspots, setHotspots] = useState([]);
  const [userLocation, setUserLocation] = useState([20.5937, 78.9629]);

  // 1. Get User Geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  // 2. Fetch AI Data from Backend
  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            lat: userLocation[0], 
            lon: userLocation[1],
            time: String(time), 
            weather: String(weather) 
          }),
        });
        
        const data = await response.json();
        
        const formatted = data.map((point, index) => ({
          id: index,
          pos: [point.latitude, point.longitude],
          risk: point.risk_level,
          factors: point.factors,
          interventions: point.interventions,
          impact_metrics: point.impact_metrics
        }));

        setHotspots(formatted);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchRiskData();
  }, [time, weather, userLocation]); // Updates when you move or change sliders

  return (
    <div className="h-full w-full relative">
      <MapContainer center={userLocation} zoom={15} className="h-full w-full" zoomControl={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        <ZoomControl position="bottomright" />
        
        {/* Moves the map view when userLocation updates */}
        <RecenterMap coords={userLocation} />

        {/* 🌟 USER MARKER */}
        <Marker position={userLocation} icon={userIcon}>
          <Popup className="custom-popup">
            <div className="text-center font-bold">YOU ARE HERE</div>
          </Popup>
        </Marker>

        {/* 🌟 AI HOTSPOTS */}
        {hotspots.map((spot) => (
          <CircleMarker
            key={spot.id}
            center={spot.pos}
            eventHandlers={{ click: () => setSelectedZone(spot) }}
            pathOptions={{
              color: spot.risk === 'CRITICAL' ? '#EF4444' : '#F59E0B',
              fillColor: spot.risk === 'CRITICAL' ? '#EF4444' : '#F59E0B',
              fillOpacity: 0.6,
              weight: 2
            }}
            radius={20}
          >
            <Popup>
              <div className="text-xs font-bold">{spot.risk} RISK ZONE</div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}