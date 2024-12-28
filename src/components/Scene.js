// src/components/Scene.js
import React from 'react';
import Rocket from './Rocket';

const Scene = ({ currentView, position, rotation, thrust, flightState }) => {
  const viewTransforms = {
    side: "",
    onboard: "translate(200, 250) scale(2.5) rotate(180)",
    top: "translate(200, 250) rotate(90) scale(1.2)"
  };

  // Pre-calculate star positions for static rendering
  const stars = React.useMemo(() => {
    return Array.from({ length: 200 }, () => ({
      x: Math.floor(Math.random() * 400),
      y: Math.floor(Math.random() * 300),
      size: Math.random() * 0.8 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleDelay: Math.random() * 5
    }));
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg 
        viewBox="0 0 400 500" 
        className="w-full h-full max-w-[1200px] max-h-[900px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Enhanced sky gradient */}
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B0B2A" />
            <stop offset="20%" stopColor="#141452" />
            <stop offset="40%" stopColor="#1A1A5C" />
            <stop offset="100%" stopColor="#20204F" />
          </linearGradient>

          {/* Star glow effect */}
          <filter id="starGlow">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>

          {/* Metal textures */}
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#444" />
            <stop offset="40%" stopColor="#888" />
            <stop offset="60%" stopColor="#888" />
            <stop offset="100%" stopColor="#444" />
          </linearGradient>

          {/* Fire effect gradients */}
          <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="20%" stopColor="#ff9933" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#ff571f" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff3300" stopOpacity="0" />
          </radialGradient>

          {/* Platform lighting */}
          <radialGradient id="platformLight" cx="50%" cy="0%" r="50%" fx="50%" fy="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g transform={viewTransforms[currentView]}>
          {/* Background */}
          <rect width="400" height="500" fill="url(#skyGradient)" />

          {/* Stars with subtle twinkling */}
          {stars.map((star, i) => (
            <circle
              key={i}
              cx={star.x}
              cy={star.y}
              r={star.size}
              fill="white"
              opacity={star.opacity}
              filter="url(#starGlow)"
            >
              <animate
                attributeName="opacity"
                values={`${star.opacity};${star.opacity * 0.5};${star.opacity}`}
                dur={`${3 + star.twinkleDelay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Enhanced Landing Platform */}
          <g transform="translate(150, 450)">
            {/* Platform base */}
            <rect x="-10" y="0" width="120" height="15" fill="url(#metalGradient)" />
            <rect x="0" y="-5" width="100" height="5" fill="#333" />
            
            {/* Platform details */}
            <rect x="45" y="2" width="10" height="11" fill="#ff3333" />
            <rect x="15" y="5" width="70" height="2" fill="#666" />
            
            {/* Platform markings */}
            <path d="M0 12 L100 12" stroke="#ffff00" strokeWidth="1" strokeDasharray="5,5" />
            
            {/* Warning lights */}
            {[10, 90].map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy={7}
                r={2}
                fill="#22ff22"
                opacity="0.8"
              >
                <animate
                  attributeName="opacity"
                  values="0.8;0.3;0.8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* Platform lighting effect */}
            <rect
              x="-20"
              y="-20"
              width="140"
              height="40"
              fill="url(#platformLight)"
              opacity="0.5"
            />

            {/* Company logo */}
            <text
              x="35"
              y="-10"
              fill="white"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              PHANEE
            </text>
          </g>

          {/* Rocket */}
          <Rocket
            position={position}
            rotation={rotation}
            thrust={thrust}
            flightState={flightState}
          />
        </g>
      </svg>
    </div>
  );
};

export default Scene;