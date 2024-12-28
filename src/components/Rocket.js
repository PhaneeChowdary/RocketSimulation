// src/components/Rocket.js
import React from 'react';

const Rocket = ({ position, rotation, thrust, flightState, altitude }) => {
  return (
    <g transform={`translate(${position.x} ${position.y}) rotate(${rotation})`}>
      <defs>
        {/* Rocket body gradient */}
        <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>
        
        {/* Metal texture gradient */}
        <linearGradient id="metalTexture" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#666" />
          <stop offset="50%" stopColor="#999" />
          <stop offset="100%" stopColor="#666" />
        </linearGradient>
      </defs>

      {/* Main body structure */}
      <g>
        {/* Main rocket body */}
        <path
          d="M-10 -60 L-10 20 C-10 25 -8 30 0 30 C8 30 10 25 10 20 L10 -60 C10 -65 8 -70 0 -70 C-8 -70 -10 -65 -10 -60Z"
          fill="url(#rocketBody)"
          stroke="#999"
          strokeWidth="0.5"
        />

        {/* Nose cone */}
        <path
          d="M-10 -60 C-10 -75 -6 -85 0 -90 C6 -85 10 -75 10 -60"
          fill="url(#metalTexture)"
          stroke="#999"
          strokeWidth="0.5"
        />

        {/* Body details */}
        <path d="M-10 -40 L10 -40" stroke="#ccc" strokeWidth="0.5" />
        <path d="M-10 -20 L10 -20" stroke="#ccc" strokeWidth="0.5" />
        <path d="M-10 0 L10 0" stroke="#ccc" strokeWidth="0.5" />
        
        {/* Windows/ports */}
        <circle cx="0" cy="-45" r="2" fill="#333" />
        <circle cx="0" cy="-25" r="1.5" fill="#333" />

        {/* Company logo */}
        <text x="-8" y="-5" fill="#333" fontSize="4" fontWeight="bold">PHANEE</text>
      </g>

      {/* Grid fins - only shown during landing */}
      {flightState === 'LANDING' && (
        <g>
          <g transform="translate(-10, -40)">
            {/* Left grid fin */}
            <rect x="-15" y="0" width="15" height="20" fill="url(#metalTexture)" stroke="#666" strokeWidth="0.5" />
            {Array.from({ length: 3 }).map((_, i) => (
              <path
                key={`left-h-${i}`}
                d={`M-15 ${5 + i * 7} L0 ${5 + i * 7}`}
                stroke="#888"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <path
                key={`left-v-${i}`}
                d={`M${-12 + i * 4} 0 L${-12 + i * 4} 20`}
                stroke="#888"
                strokeWidth="0.5"
              />
            ))}
          </g>
          <g transform="translate(10, -40)">
            {/* Right grid fin */}
            <rect x="0" y="0" width="15" height="20" fill="url(#metalTexture)" stroke="#666" strokeWidth="0.5" />
            {Array.from({ length: 3 }).map((_, i) => (
              <path
                key={`right-h-${i}`}
                d={`M0 ${5 + i * 7} L15 ${5 + i * 7}`}
                stroke="#888"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <path
                key={`right-v-${i}`}
                d={`M${3 + i * 4} 0 L${3 + i * 4} 20`}
                stroke="#888"
                strokeWidth="0.5"
              />
            ))}
          </g>
        </g>
      )}

      {/* Landing legs */}
      {(flightState === 'LANDING' || flightState === 'LANDED') && (
        <g>
          {/* Left leg */}
          <path
            d="M-8 15 L-25 40 L-20 40 L-6 17"
            fill="url(#metalTexture)"
            stroke="#666"
            strokeWidth="0.5"
          />
          {/* Right leg */}
          <path
            d="M8 15 L25 40 L20 40 L6 17"
            fill="url(#metalTexture)"
            stroke="#666"
            strokeWidth="0.5"
          />
          {/* Center support */}
          <path
            d="M-4 20 L-6 40 L6 40 L4 20"
            fill="url(#metalTexture)"
            stroke="#666"
            strokeWidth="0.5"
          />
        </g>
      )}

      {/* Engine and fire effects */}
      {(thrust > 0 || (flightState === 'LANDING' && altitude <= 350)) && (
        <g>
          {/* Engine nozzle */}
          <circle cx="0" cy="25" r="5" fill="url(#metalTexture)" stroke="#666" strokeWidth="0.5" />
          <ellipse cx="0" cy="25" rx="3" ry="2" fill="#333" />
          
          {/* Main thrust flame */}
          <path
            d={`M-${4 + thrust/25} 25 
               C-${4 + thrust/25} ${30 + thrust/8}, 
                 0 ${40 + thrust/2}, 
                 0 ${50 + thrust} 
               C0 ${40 + thrust/2}, 
                 ${4 + thrust/25} ${30 + thrust/8}, 
                 ${4 + thrust/25} 25`}
            fill="url(#fireGradient)"
            opacity={0.8 + thrust/500}
          >
            <animate
              attributeName="d"
              dur="0.1s"
              repeatCount="indefinite"
              values={`
                M-${4 + thrust/25} 25 C-${4 + thrust/25} ${30 + thrust/8} 0 ${40 + thrust/2} 0 ${50 + thrust} C0 ${40 + thrust/2} ${4 + thrust/25} ${30 + thrust/8} ${4 + thrust/25} 25;
                M-${4 + thrust/25} 25 C-${3 + thrust/25} ${32 + thrust/8} 0 ${42 + thrust/2} 0 ${51 + thrust} C0 ${42 + thrust/2} ${3 + thrust/25} ${32 + thrust/8} ${4 + thrust/25} 25;
                M-${4 + thrust/25} 25 C-${4 + thrust/25} ${30 + thrust/8} 0 ${40 + thrust/2} 0 ${50 + thrust} C0 ${40 + thrust/2} ${4 + thrust/25} ${30 + thrust/8} ${4 + thrust/25} 25
              `}
            />
          </path>

          {/* Secondary flames for more realistic effect */}
          <g opacity={thrust/150}>
            {[1, -1].map((direction, i) => (
              <path
                key={i}
                d={`M${3 * direction} 25 
                   C${4 * direction} ${28 + thrust/10} 
                    ${2 * direction} ${35 + thrust/4} 
                    ${1 * direction} ${40 + thrust/3}`}
                fill="url(#fireGradient)"
                opacity={0.6}
              >
                <animate
                  attributeName="d"
                  dur="0.15s"
                  repeatCount="indefinite"
                  values={`
                    M${3 * direction} 25 C${4 * direction} ${28 + thrust/10} ${2 * direction} ${35 + thrust/4} ${1 * direction} ${40 + thrust/3};
                    M${3 * direction} 25 C${3 * direction} ${30 + thrust/10} ${1 * direction} ${37 + thrust/4} ${0 * direction} ${42 + thrust/3};
                    M${3 * direction} 25 C${4 * direction} ${28 + thrust/10} ${2 * direction} ${35 + thrust/4} ${1 * direction} ${40 + thrust/3}
                  `}
                />
              </path>
            ))}
          </g>
        </g>
      )}
    </g>
  );
};

export default Rocket;