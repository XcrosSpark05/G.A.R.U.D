import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RiskMap from './components/RiskMap';

function App() {
  const [time, setTime] = useState(8);
  const [weather, setWeather] = useState('clear');

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-slate-950">
      {/* Sidebar */}
      <Sidebar 
        time={time} 
        setTime={setTime} 
        weather={weather} 
        setWeather={setWeather} 
      />
      
      {/* Main Map Area - Forced Relative Positioning */}
      <main className="flex-1 h-full" style={{ position: 'relative' }}>
        
        {/* LIVE VIEW HUD - FORCED TO BOTTOM LEFT USING INLINE STYLES */}
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', zIndex: 2000, pointerEvents: 'none' }}>
          
          {/* Forced dark background and border */}
          <div style={{ 
            pointerEvents: 'auto', 
            backgroundColor: 'rgba(15, 23, 42, 0.9)', /* Dark slate background */
            border: '1px solid #334155', 
            padding: '12px 16px', 
            borderRadius: '12px', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ display: 'inline-block', height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#34d399' }}></span>
              <h2 style={{ fontSize: '11px', fontWeight: 'bold', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                Live View
              </h2>
            </div>
            <p style={{ fontSize: '14px', color: '#f1f5f9', fontWeight: '500', whiteSpace: 'nowrap', margin: 0 }}>
              NHAI National Network: Active
            </p>
          </div>

        </div>

        <RiskMap time={time} weather={weather} />
      </main>
    </div>
  );
}

export default App;