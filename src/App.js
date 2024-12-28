// src/App.js
import React, { useState } from 'react';
import { Eye, Camera, Gauge, PlayCircle, PauseCircle, RotateCcw, Rocket } from 'lucide-react';
import Scene from './components/Scene';
import { usePhysicsEngine } from './components/PhysicsEngine';

function App() {
  const [flightState, setFlightState] = useState('READY');
  const [windSpeed, setWindSpeed] = useState(0);
  const [thrust, setThrust] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentView, setCurrentView] = useState('side');
  const [missionStatus, setMissionStatus] = useState('Ready for launch');

  const handleStateChange = (newState, data) => {
    if (newState === 'HOVERING') {
      setFlightState('HOVERING');
      setMissionStatus('Reached hover altitude');
      setThrust(50);
    } else if (newState === 'LANDED') {
      setFlightState('LANDED');
      setThrust(0); // Cut off thrust when landed
      setMissionStatus(data?.success 
        ? 'Landing successful!' 
        : 'Landing failed - Impact velocity too high');
    } else if (newState === 'ALTITUDE_UPDATE' && flightState === 'LANDING') {
      const altitude = data.altitude;
      const velocity = data.velocity;
      
      // Cut thrust when very close to ground
      if (altitude < 1) {
        setThrust(0);
        return;
      }

      const getTargetVelocity = (alt) => {
        if (alt > 300) return -15;
        if (alt > 200) return -10;
        if (alt > 100) return -7;
        if (alt > 50) return -5;
        return -2;
      };

      const targetVelocity = getTargetVelocity(altitude);
      const velocityError = velocity - targetVelocity;

      if (altitude > 350) {
        setThrust(0);
        setMissionStatus('Beginning descent...');
      } else if (altitude <= 350 && altitude > 200) {
        const suggestedThrust = Math.max(30, 45 + (velocityError * 5));
        setThrust(suggestedThrust);
        setMissionStatus('Main landing burn initiated');
      } else if (altitude <= 200 && altitude > 50) {
        const suggestedThrust = Math.max(35, 48 + (velocityError * 6));
        setThrust(suggestedThrust);
        setMissionStatus('Final approach - adjusting velocity');
      } else if (altitude <= 50) {
        const suggestedThrust = Math.max(40, 50 + (velocityError * 7));
        setThrust(suggestedThrust);
        setMissionStatus('Terminal landing phase - preparing for touchdown');
      }
    }
  };

  const {
    position,
    velocity,
    altitude,
    rotation,
    resetPhysics
  } = usePhysicsEngine(flightState, isPaused, windSpeed, thrust, handleStateChange);

  const renderNavButton = (view, icon, label) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
        currentView === view 
          ? 'bg-blue-500 text-white shadow-lg' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  const startLaunch = () => {
    if (flightState === 'READY') {
      setFlightState('LAUNCHING');
      setMissionStatus('Launching...');
      setThrust(80);
    }
  };

  const startLanding = () => {
    if (flightState === 'HOVERING') {
      setFlightState('LANDING');
      setMissionStatus('Beginning landing sequence - Initial descent');
      setThrust(0); // Cut thrust to begin descent
    }
  };

  const resetSimulation = () => {
    setFlightState('READY');
    setThrust(0);
    setWindSpeed(0);
    setIsPaused(false);
    setMissionStatus('Ready for launch');
    resetPhysics();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center max-w-8xl mx-auto">
          <div className="flex items-center gap-2">
            <Rocket className="text-blue-400" size={24} />
            <h1 className="text-xl font-bold">Phanee Rocket Simulation</h1>
          </div>
          <div className="flex gap-2">
            {renderNavButton('side', <Eye size={20} />, 'Side View')}
            {renderNavButton('onboard', <Camera size={20} />, 'Onboard')}
            {renderNavButton('top', <Gauge size={20} />, 'Top View')}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Control Panel */}
        <div className="w-64 bg-gray-800 p-4 flex flex-col gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Mission Status</h2>
            <p className="text-blue-400">{missionStatus}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Flight Controls</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={startLaunch}
                disabled={flightState !== 'READY'}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Launch
              </button>
              <button
                onClick={startLanding}
                disabled={flightState !== 'HOVERING'}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Begin Landing
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                {isPaused ? <PlayCircle size={20} /> : <PauseCircle size={20} />}
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={resetSimulation}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Telemetry</h2>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-300">Altitude</label>
                <p className="text-lg font-mono">{Math.round(altitude)}m</p>
              </div>
              <div>
                <label className="text-sm text-gray-300">Velocity</label>
                <p className="text-lg font-mono">{Math.round(velocity * 10) / 10}m/s</p>
              </div>
              <div>
                <label className="text-sm text-gray-300">Wind Speed</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  disabled={flightState === 'LANDED'}
                />
                <p className="text-lg font-mono">{windSpeed}m/s</p>
              </div>
              <div>
                <label className="text-sm text-gray-300">Thrust Power</label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={thrust}
                  onChange={(e) => setThrust(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  disabled={flightState === 'READY' || flightState === 'LANDED'}
                />
                <p className="text-lg font-mono">{thrust}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Simulation View */}
        <div className="flex-1 bg-gray-900">
          <Scene
            currentView={currentView}
            position={position}
            rotation={rotation}
            thrust={thrust}
            flightState={flightState}
            altitude={altitude}
          />
        </div>
      </div>
    </div>
  );
}

export default App;