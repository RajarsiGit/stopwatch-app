import React, { useState, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
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
    setLaps([]);
  };

  const recordLap = () => {
    if (isRunning) {
      const lapTime = time;
      const lapNumber = laps.length + 1;
      const previousLapTime = laps.length > 0 ? laps[laps.length - 1].time : 0;
      const duration = lapTime - previousLapTime;
      setLaps(prev => [...prev, { number: lapNumber, time: lapTime, duration: duration }]);
    }
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

  const formatTimeWords = (time) => {
    const totalMs = Math.floor(time);
    const ms = totalMs % 1000;
    const sec = Math.floor((totalMs / 1000) % 60);
    const min = Math.floor((totalMs / (1000 * 60)) % 60);
    const hr = Math.floor((totalMs / (1000 * 60 * 60)) % 24);

    const parts = [];
    
    if (hr > 0) {
      parts.push(`${hr} ${hr === 1 ? 'hour' : 'hours'}`);
    }
    if (min > 0) {
      parts.push(`${min} ${min === 1 ? 'minute' : 'minutes'}`);
    }
    if (sec > 0) {
      parts.push(`${sec} ${sec === 1 ? 'second' : 'seconds'}`);
    }
    if (ms > 0 && parts.length === 0) {
      parts.push(`${ms} ${ms === 1 ? 'millisecond' : 'milliseconds'}`);
    }

    if (parts.length === 0) {
      return '0 seconds';
    }
    
    if (parts.length === 1) {
      return parts[0];
    }
    
    if (parts.length === 2) {
      return parts.join(' and ');
    }
    
    return parts.slice(0, -1).join(', ') + ', and ' + parts[parts.length - 1];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">⏱ Stopwatch</h1>
        <div className="bg-black text-green-400 font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl rounded-lg py-3 sm:py-4 md:py-6 mb-6 sm:mb-8 shadow-inner">
          {formatTime(time)}
        </div>
        <div className="flex justify-center space-x-2 sm:space-x-3 flex-wrap gap-2">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg rounded-xl bg-green-600 hover:bg-green-700 transition shadow-lg text-white font-semibold"
            >
              Start
            </button>
          ) : (
            <>
              <button
                onClick={stopTimer}
                className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg rounded-xl bg-yellow-600 hover:bg-yellow-700 transition shadow-lg text-white font-semibold"
              >
                Pause
              </button>
              <button
                onClick={recordLap}
                className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg rounded-xl bg-blue-600 hover:bg-blue-700 transition shadow-lg text-white font-semibold"
              >
                Lap
              </button>
            </>
          )}
          <button
            onClick={resetTimer}
            className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg rounded-xl bg-red-600 hover:bg-red-700 transition shadow-lg text-white font-semibold"
          >
            Reset
          </button>
        </div>
        
        {laps.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-white">Lap Times</h2>
            <div className="bg-gray-700 rounded-xl p-4 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-600 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-300">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-2 sm:px-3 text-gray-300 font-semibold text-sm sm:text-base">Lap</th>
                    <th className="py-2 px-2 sm:px-3 text-gray-300 font-semibold text-sm sm:text-base">Total Time</th>
                    <th className="py-2 px-2 sm:px-3 text-gray-300 font-semibold text-sm sm:text-base">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {laps.map((lap, index) => (
                    <tr key={index} className="border-b border-gray-600 last:border-b-0">
                      <td className="py-2 px-2 sm:px-3 text-white font-semibold text-sm sm:text-base">#{lap.number}</td>
                      <td className="py-2 px-2 sm:px-3 text-green-400 font-mono text-sm sm:text-base">{formatTime(lap.time)}</td>
                      <td className="py-2 px-2 sm:px-3 text-blue-400 text-sm sm:text-base">{formatTimeWords(lap.duration)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
