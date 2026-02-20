import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RiskMap from './components/RiskMap';

function App() {
  const [time, setTime] = useState(8);
  const [weather, setWeather] = useState('clear');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black font-sans">
      {/* Sidebar */}
      <Sidebar 
        time={time} 
        setTime={setTime} 
        weather={weather} 
        setWeather={setWeather} 
      />
      
      {/* Main Map Area */}
      <main className="flex-1 relative h-full">
        {/* Live View HUD — moved to bottom-left */}
        <div className="pointer-events-none absolute bottom-6 left-6 z-[2000]">
          <div className="pointer-events-auto bg-black/70 backdrop-blur-xl border border-slate-700 px-4 py-3 rounded-xl shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest">
                Live View
              </h2>
            </div>
            <p className="text-sm text-slate-100 font-medium whitespace-nowrap">
              NHAI National Network: Active
            </p>
          </div>
        </div>

        {/* Subtle Gradient Overlay (kept below HUD) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 z-[300]" />

        <RiskMap time={time} weather={weather} />
      </main>
    </div>
  );
}

export default App;