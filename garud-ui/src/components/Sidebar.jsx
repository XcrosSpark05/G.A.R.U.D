export default function Sidebar({ time, setTime, weather, setWeather }) {
  return (
    <aside className="w-[340px] min-w-[300px] h-full 
        bg-gradient-to-b from-white via-slate-50 to-slate-100 
        border-r border-slate-200 
        shadow-[4px_0_20px_rgba(0,0,0,0.08)]
        text-slate-900 flex flex-col p-6">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight">
          GARUD <span className="text-emerald-400">COMMAND</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
          Geospatial Risk Ops Center
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-8">
        
        {/* Time */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
            Simulated Time
          </label>
          <input
            type="range"
            min="0"
            max="24"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
          <div className="text-right text-sm text-emerald-300 mt-1 font-mono">
            {time}:00 hrs
          </div>
        </div>

        {/* Weather */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
            Weather Condition
          </label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="clear">Clear Skies</option>
            <option value="rain">Rain</option>
            <option value="fog">Fog</option>
            <option value="storm">Storm</option>
          </select>
        </div>

        {/* Status Card */}
        <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-inner">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
            AI Status
          </p>
          <p className="text-sm text-slate-200">
            Predictive model actively simulating accident risk based on NHAI historical patterns.
          </p>
          <div className="mt-3 text-xs text-emerald-400 font-mono">
            ● System Online
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-slate-800 text-xs text-slate-500">
        GARUD v1.0 · Command Interface
      </div>
    </aside>
  );
}