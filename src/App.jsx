import React, { useState, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10); // update every 10 ms
      }, 10);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const ms = Math.floor((time % 1000) / 10);
    const sec = Math.floor((time / 1000) % 60);
    const min = Math.floor((time / (1000 * 60)) % 60);
    const hr = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hr.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${ms
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">⏱ Stopwatch</h1>
        <div className="bg-black text-green-400 font-mono text-3xl rounded-lg py-4 mb-8 shadow-inner">
          {formatTime(time)}
        </div>
        <div className="flex justify-center space-x-4">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 transition shadow-lg text-white"
            >
              Start
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="px-6 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition shadow-lg text-white"
            >
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition shadow-lg text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
