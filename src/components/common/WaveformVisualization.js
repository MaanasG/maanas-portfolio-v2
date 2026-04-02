import React from 'react';

// Waveform Visualization Component
const WaveformVisualization = ({ waveform, isActive, color = "amber" }) => {
  const gradientMap = {
    amber: "from-amber-500 to-amber-300",
    yellow: "from-yellow-500 to-yellow-300",
    cyan: "from-cyan-500 to-cyan-300",
  };

  const activeGradient = gradientMap[color] || gradientMap.amber;

  return (
    <div className="flex items-end space-x-0.5 h-8">
      {waveform.map((height, index) => (
        <div
          key={index}
          className={`w-1 bg-gradient-to-t transition-all duration-300 ${
            isActive ? `${activeGradient} animate-pulse` : "from-gray-600 to-gray-400"
          }`}
          style={{ height: `${height * 100}%` }}
        />
      ))}
    </div>
  );
};

export default WaveformVisualization;