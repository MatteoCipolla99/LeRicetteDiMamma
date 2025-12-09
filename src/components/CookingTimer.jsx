import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, AlarmClock } from "lucide-react";

const CookingTimer = () => {
  const [minutes, setMinutes] = useState(10); // Default 10 min
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
            alert("⏰ Timer scaduto! Controlla la cottura!"); // In prod useremmo un suono
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
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
    setMinutes((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-gray-700">
        <AlarmClock className="w-5 h-5 text-orange-500" />
        <h3 className="font-bold">Timer di Cucina</h3>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-5xl font-mono font-bold text-gray-800 mb-6 tracking-wider">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={toggleTimer}
            className={`flex items-center px-6 py-2 rounded-full font-bold text-white transition-all ${
              isActive
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isActive ? (
              <Pause className="w-5 h-5 mr-2" />
            ) : (
              <Play className="w-5 h-5 mr-2" />
            )}
            {isActive ? "Pausa" : "Avvia"}
          </button>

          <button
            onClick={resetTimer}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            title="Resetta"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {!isActive && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => adjustTime(-1)}
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              -1 min
            </button>
            <button
              onClick={() => adjustTime(1)}
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              +1 min
            </button>
            <button
              onClick={() => adjustTime(5)}
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              +5 min
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookingTimer;
