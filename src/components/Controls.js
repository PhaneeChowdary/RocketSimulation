import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Controls = ({ 
  flightState,
  windSpeed,
  thrust,
  isPaused,
  onWindChange,
  onThrustChange,
  onLaunch,
  onLand,
  onPause,
  onReset
}) => {
  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Wind Speed</label>
          <input
            type="range"
            min="0"
            max="10"
            value={windSpeed}
            onChange={(e) => onWindChange(Number(e.target.value))}
            className="w-full"
            disabled={flightState === 'LANDED'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Thrust Power</label>
          <input
            type="range"
            min="0"
            max="150"
            value={thrust}
            onChange={(e) => onThrustChange(Number(e.target.value))}
            className="w-full"
            disabled={flightState === 'READY' || flightState === 'LANDED'}
          />
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onLaunch}
          disabled={flightState !== 'READY'}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Launch
        </button>
        <button
          onClick={onLand}
          disabled={flightState !== 'HOVERING'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Begin Landing
        </button>
        <button
          onClick={onPause}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPaused ? <Play size={18} /> : <Pause size={18} />}
        </button>
        <button
          onClick={onReset}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
};

export default Controls;