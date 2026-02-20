import React from 'react';

export default function Sidebar({ time, setTime, weather, setWeather, selectedZone }) {
  return (
    <aside className="w-[340px] min-w-[300px] h-full 
        bg-gradient-to-b from-slate-900 via-slate-950 to-black 
        border-r border-slate-800 
        shadow-[4px_0_20px_rgba(0,0,0,0.5)]
        text-slate-100 flex flex-col p-6 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          GARUD <span className="text-emerald-400">COMMAND</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">
          NHAI Geospatial Risk Ops
        </p>
      </div>

      {/* Main Controls */}
      <div className="space-y-6">
        {/* Time Slider */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-tighter">
            Scene 2: Simulated Time
          </label>
          <input
            type="range" min="0" max="24" value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <div className="text-right text-sm text-emerald-400 mt-1 font-mono">
            {time}:00 hrs
          </div>
        </div>

        {/* Weather Condition */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">
            Scene 2: Weather Condition
          </label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-500 outline-none"
          >
            <option value="clear">Clear Skies</option>
            <option value="rainy">Heavy Rain</option>
            <option value="foggy">Thick Fog</option>
          </select>
        </div>

        {/* Dynamic Intelligence Section (Appears on Map Click) */}
        {selectedZone ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
            
            {/* Scene 3: XAI Deep-Dive */}
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <h3 className="text-[10px] font-bold text-emerald-400 uppercase mb-3">
                Scene 3: XAI Justification (SHAP)
              </h3>
              <div className="space-y-3">
                {selectedZone.factors.map((factor, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>{factor}</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-1000" 
                        style={{ width: factor.includes('50') ? '50%' : factor.includes('45') ? '45%' : '30%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scene 4: Proactive Intervention Panel */}
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="text-xs font-bold text-white uppercase">Scene 4: Decision Support</h3>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-2 list-disc ml-3">
                {selectedZone.interventions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
              <button 
                onClick={() => alert("Intervention Dispatched to Field Units")}
                className="mt-4 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-black py-2.5 rounded uppercase transition-colors"
              >
                Approve & Dispatch
              </button>
            </div>

            {/* Impact Metrics */}
            <div className="text-center p-2">
               <p className="text-[10px] text-emerald-400 font-bold tracking-widest">
                 SAFETY IMPACT: +{selectedZone.impact_metrics.lives_saved} LIVES SAVED
               </p>
            </div>

          </div>
        ) : (
          /* Default Status Card */
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              NHAI AI Status
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              System monitoring historical patterns. Select a <span className="text-emerald-400">Risk Hotspot</span> on the map to view proactive intervention logic.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
        <span>GARUD v1.0</span>
        <span className="text-emerald-500/50">● ENCRYPTED CONNECTION</span>
      </div>
    </aside>
  );
}