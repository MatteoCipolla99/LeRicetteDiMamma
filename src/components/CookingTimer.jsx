import React, { useState, useEffect, useRef } from "react";
import { Clock, Play, Pause, RotateCcw, Plus, Minus, Bell } from "lucide-react";

const CookingTimer = ({ recipeName = "Ricetta" }) => {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(600);
  const [initialSeconds, setInitialSeconds] = useState(600);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    } else if (totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      playAlarm();
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  useEffect(() => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    setMinutes(mins);
    setSeconds(secs);
  }, [totalSeconds]);

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Timer Terminato!", {
        body: `Il timer per ${recipeName} è terminato!`,
        icon: "🍳",
      });
    }
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const handleStart = () => {
    if (totalSeconds > 0) {
      setIsRunning(true);
      requestNotificationPermission();
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(initialSeconds);
  };

  const adjustTime = (amount) => {
    if (!isRunning) {
      const newTotal = Math.max(60, totalSeconds + amount);
      setTotalSeconds(newTotal);
      setInitialSeconds(newTotal);
    }
  };

  const setPreset = (mins) => {
    if (!isRunning) {
      const newTotal = mins * 60;
      setTotalSeconds(newTotal);
      setInitialSeconds(newTotal);
    }
  };

  const progress = ((initialSeconds - totalSeconds) / initialSeconds) * 100;
  const isAlmostDone = totalSeconds <= 60 && totalSeconds > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuFzvLZiTYIHm3A7+eVTAwOUqzn77RiGQU7ldny0IAqBSl+zPLaizsIHG/E7+GVSA0MUrTq77RiFgo6ldny0H8pBCt7yfLdi0EIGWzD7+GVRw0LUbbq7rdkGQU4kdfy0IAqBSl+zPLaizsIHG/E7+GVSA0MUrTq77RiFgo6ldny0H8pBCt7yfLdi0EIGWzD7+GVRw0LUbbq7rdkGQU4kdfy0IAqBSl+zPLaizsIHG/E7+GVRw0MUrTq77RiFgo6ldny0H8pBCt7yfLdi0EIGWzD7+GVRw0LUbbq7rdkGQU4kdfy0IAqBSl+zPLaizsIHG/E7+GVRw0MUrTq77RiFgo6ldny0H8pBCt7yfLdi0EIGWzD7+GVRw0LUbbq7rdkGQU4kdfy0IAqBSl+zPLaizsIHG/E7+GVRw0MUrTq77RiFgo6ldny0H8pBCt7yfLdi0EIGWzD7+GVRw0LUbbq7rdkGQU4kdfy0IAqBSl+zPLaizsIHG/E7+GVRw0MUrTq77RiFgo6ldny0H8pBCt7yfLdi0EIGWzD7+GVRw0LUbbq7rdkGQU4kdfy0IAqBSl+zPLaizsIHG/E7+GVRw0MUrTq77RiFgo6ldny0H8pBCt7yfLdi0EIGWzD7+GVRw0LUbbq7rdkGQU4kdfy0IAqBSl+zPLaizsIHG/E7+GVRw0MUrTq77RiFgo6ldny0H8pBCt7yfLdi0EIGWzD7+GVRw0LUbbq7rdkGQU4kdfy0IAqBSl+zPLaizsIHG/E7+GVRw0MUrTq77RiFgo6ldny0H8pBCt7yfLdi0EIGWzD7+GVRw0LUbbq7rdkGQU4kdfy0IAqBSl+zPLaizsI"
      />

      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Timer Cucina</span>
        </div>
        <p className="text-sm text-gray-600">{recipeName}</p>
      </div>

      <div className="relative mb-8">
        <svg className="w-full h-64" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="12"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={isAlmostDone ? "#ef4444" : "#f97316"}
            strokeWidth="12"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            className="transition-all duration-300"
          />
          <text
            x="100"
            y="90"
            textAnchor="middle"
            className={`text-5xl font-bold ${
              isAlmostDone ? "fill-red-500" : "fill-gray-800"
            }`}
          >
            {String(minutes).padStart(2, "0")}
          </text>
          <text
            x="100"
            y="105"
            textAnchor="middle"
            className="text-3xl font-bold fill-gray-800"
          >
            :
          </text>
          <text
            x="100"
            y="130"
            textAnchor="middle"
            className={`text-5xl font-bold ${
              isAlmostDone ? "fill-red-500" : "fill-gray-800"
            }`}
          >
            {String(seconds).padStart(2, "0")}
          </text>
        </svg>

        {totalSeconds === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-green-500 text-white px-6 py-3 rounded-full animate-pulse flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span className="font-bold">Tempo scaduto!</span>
            </div>
          </div>
        )}
      </div>

      {!isRunning && totalSeconds > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => adjustTime(-60)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Minus className="w-4 h-4" />
            <span className="text-sm font-medium">1 min</span>
          </button>
          <button
            onClick={() => adjustTime(60)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">1 min</span>
          </button>
        </div>
      )}

      <div className="flex space-x-3 mb-6">
        {!isRunning ? (
          <button
            onClick={handleStart}
            disabled={totalSeconds === 0}
            className="flex-1 flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            <span>Avvia</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex-1 flex items-center justify-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl font-semibold transition-colors"
          >
            <Pause className="w-5 h-5" />
            <span>Pausa</span>
          </button>
        )}
        <button
          onClick={handleReset}
          className="flex items-center justify-center px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-semibold transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-600 mb-3 font-medium">Preset rapidi:</p>
        <div className="grid grid-cols-4 gap-2">
          {[5, 10, 15, 20].map((preset) => (
            <button
              key={preset}
              onClick={() => setPreset(preset)}
              disabled={isRunning}
              className="px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {preset}m
            </button>
          ))}
        </div>
      </div>

      {isAlmostDone && isRunning && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2 animate-pulse">
          <Bell className="w-5 h-5" />
          <span className="text-sm font-medium">Quasi pronto!</span>
        </div>
      )}
    </div>
  );
};

export default CookingTimer;
