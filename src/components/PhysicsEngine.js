// src/components/PhysicsEngine.js
import { useState, useEffect } from 'react';

export const usePhysicsEngine = (flightState, isPaused, windSpeed, thrust, onStateChange) => {
  const [position, setPosition] = useState({ x: 200, y: 450 });
  const [velocity, setVelocity] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrame;
    let time = 0;

    const animate = () => {
      if (!isPaused && flightState !== 'READY' && flightState !== 'LANDED') {
        time += 0.016;
        const windEffect = Math.sin(time) * windSpeed;
        const gravity = 9.81;
        
        // Calculate thrust and physics
        let effectiveThrust = thrust;
        const thrustForce = effectiveThrust * 0.3;
        const netForce = thrustForce - gravity;
        const newVelocity = velocity + netForce * 0.016;
        const newAltitude = Math.max(0, altitude + newVelocity * 0.016);
        const newY = 450 - newAltitude;
        const newX = Math.max(50, Math.min(350, position.x + windEffect * 0.016));

        // State transitions
        if (flightState === 'LAUNCHING' && newAltitude > 300) {
          onStateChange && onStateChange('HOVERING');
        }

        // Landing checks
        if (flightState === 'LANDING') {
          if (newAltitude === 0) {
            const landingSuccess = Math.abs(newVelocity) < 2;
            onStateChange && onStateChange('LANDED', { success: landingSuccess });
          }
          // Report current altitude for landing burn control
          onStateChange && onStateChange('ALTITUDE_UPDATE', { altitude: newAltitude, velocity: newVelocity });
        }

        console.log('Physics Update:', {
          thrust: effectiveThrust,
          altitude: newAltitude,
          velocity: newVelocity,
          flightState
        });

        setVelocity(newVelocity);
        setAltitude(newAltitude);
        setPosition({ x: newX, y: newY });
        setRotation(windEffect);
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, flightState, windSpeed, thrust, velocity, altitude, position.x, onStateChange]);

  const resetPhysics = () => {
    setPosition({ x: 200, y: 450 });
    setVelocity(0);
    setAltitude(0);
    setRotation(0);
  };

  return {
    position,
    velocity,
    altitude,
    rotation,
    resetPhysics
  };
};

export default usePhysicsEngine;