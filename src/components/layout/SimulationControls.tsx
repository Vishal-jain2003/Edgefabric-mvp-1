interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  currentTick: number;
  scenario: string;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onScenarioChange: (scenario: string) => void;
  eventLog: string[];
}

export function SimulationControls({
  isPlaying,
  speed,
  currentTick,
  scenario,
  onPlay,
  onPause,
  onStep,
  onReset,
  onSpeedChange,
  onScenarioChange,
  eventLog,
}: ControlsProps) {
  return (
    <div className="glass rounded-xl p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>
          SIMULATION CONTROL
        </div>
        <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
          Tick #{currentTick}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {!isPlaying ? (
          <button
            onClick={onPlay}
            className="rounded-lg py-2 font-section text-xs"
            style={{ background: "rgba(16,185,129,0.14)", border: "1px solid rgba(16,185,129,0.35)", color: "#10b981" }}
          >
            Play
          </button>
        ) : (
          <button
            onClick={onPause}
            className="rounded-lg py-2 font-section text-xs"
            style={{ background: "rgba(245,158,11,0.14)", border: "1px solid rgba(245,158,11,0.35)", color: "#f59e0b" }}
          >
            Pause
          </button>
        )}

        <button
          onClick={onStep}
          className="rounded-lg py-2 font-section text-xs"
          style={{ background: "rgba(59,130,246,0.14)", border: "1px solid rgba(59,130,246,0.35)", color: "#60a5fa" }}
        >
          Step +1
        </button>

        <button
          onClick={onReset}
          className="rounded-lg py-2 font-section text-xs"
          style={{ background: "rgba(239,68,68,0.14)", border: "1px solid rgba(239,68,68,0.35)", color: "#ef4444" }}
        >
          Reset
        </button>

        <select
          value={scenario}
          onChange={(e) => onScenarioChange(e.target.value)}
          className="rounded-lg px-2 py-2 font-section text-xs"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--ef-border)", color: "var(--ef-lgray)" }}
        >
          <option value="basic">Basic Cluster</option>
          <option value="failure">Node Failure</option>
          <option value="read-repair">Read Repair</option>
          <option value="eviction">LRU Eviction</option>
          <option value="timewheel">TimeWheel Expiry</option>
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
            Speed
          </span>
          <span className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>
            {speed.toFixed(1)}x
          </span>
        </div>
        <div className="flex gap-2">
          {[0.5, 1, 2].map((value) => (
            <button
              key={value}
              onClick={() => onSpeedChange(value)}
              className="flex-1 rounded-md py-1 font-section text-xs"
              style={{
                background: speed === value ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.03)",
                border: speed === value ? "1px solid rgba(0,212,255,0.4)" : "1px solid var(--ef-border)",
                color: speed === value ? "var(--ef-cyan)" : "var(--ef-gray)",
              }}
            >
              {value}x
            </button>
          ))}
        </div>
      </div>

      <details className="rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--ef-border)" }}>
        <summary className="cursor-pointer px-2 py-1.5 font-section text-xs" style={{ color: "var(--ef-gray)" }}>
          Event Log ({eventLog.length})
        </summary>
        <div className="max-h-28 overflow-y-auto p-2 space-y-1">
          {eventLog.length === 0 && (
            <div className="font-section text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              No events yet.
            </div>
          )}
          {eventLog.slice(0, 20).map((event, index) => (
            <div key={`${event}-${index}`} className="font-section text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>
              {event}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
