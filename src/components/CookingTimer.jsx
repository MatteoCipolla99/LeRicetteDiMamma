import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, AlarmClock, Plus, Minus } from "lucide-react";

const CookingTimer = () => {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            // Qui potresti aggiungere un suono reale
            alert("⏰ DRIIIN! Timer scaduto!");
          } else {
            setMinutes((m) => m - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((s) => s - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(10);
    setSeconds(0);
  };

  const adjustTime = (amount) => {
    const newMin = minutes + amount;
    if (newMin >= 1 && newMin <= 120) setMinutes(newMin);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-6 text-gray-400 uppercase tracking-widest text-xs font-bold">
        <AlarmClock size={16} /> Timer di Cucina
      </div>

      <div className="font-mono text-7xl font-bold mb-8 tabular-nums tracking-tight">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      <div className="flex items-center gap-6 mb-8">
        <button
          onClick={resetTimer}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Resetta"
        >
          <RotateCcw size={20} />
        </button>

        <button
          onClick={toggleTimer}
          className={`p-6 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 ${
            isActive
              ? "bg-yellow-500 text-white shadow-yellow-500/40"
              : "bg-green-500 text-white shadow-green-500/40"
          }`}
        >
          {isActive ? (
            <Pause size={32} fill="currentColor" />
          ) : (
            <Play size={32} fill="currentColor" className="ml-1" />
          )}
        </button>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => adjustTime(1)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => adjustTime(-1)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
          >
            <Minus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookingTimer;
