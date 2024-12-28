# Rocket Landing Simulation 🚀

An interactive web-based simulation of rocket landing, inspired by modern reusable rockets. The simulation demonstrates the complex physics and control systems involved in landing a rocket vertically.

## Features

- 🎮 Real-time rocket control
- 📊 Live telemetry data
- 🌪️ Wind effects simulation
- 🎯 Precision landing system
- 🎥 Multiple camera views
- 🔄 Grid fin deployment
- 🦿 Landing leg animation
- 🔥 Dynamic engine effects

## Installation

1. Clone the repository
```bash
git clone https://github.com/PhaneeChowdary/RocketSimulation.git
cd RocketSimulation-master
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application should now be running on `http://localhost:3000`

## Operating System-Specific Instructions

### Windows
- Open Command Prompt
- Navigate to project directory
- Run installation commands as shown above

### macOS
- Install Node.js using Homebrew:
```bash
brew install node
```
- Open Terminal
- Navigate to project directory
- Run installation commands as shown above

### Linux
- Install Node.js using package manager:
```bash
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Usage Guide

1. **Launch Sequence**
   - Click "Launch" to initiate takeoff
   - The rocket will automatically achieve hover altitude

2. **Landing Sequence**
   - Click "Begin Landing" when ready to attempt landing
   - The rocket will:
     - Deploy grid fins
     - Begin controlled descent
     - Perform landing burn
     - Deploy landing legs
     - Attempt precise touchdown

3. **Controls**
   - Wind Speed: Adjust environmental conditions
   - Thrust Power: Control engine power (when applicable)
   - View Controls: Switch between side, onboard, and top views

4. **Telemetry**
   - Real-time altitude
   - Vertical velocity
   - Engine thrust percentage
   - Mission status updates

## Technology Stack

- React.js
- SVG Graphics
- Tailwind CSS
- Lucide Icons

## Acknowledgments

- Inspired by modern reusable rocket technology


## Thank you!