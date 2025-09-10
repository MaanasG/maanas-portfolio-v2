import React from 'react';

// Waveform Visualization Component
const WaveformVisualization = ({ waveform, isActive, color = "cyan" }) => (
  <div className="flex items-end space-x-0.5 h-8">
    {waveform.map((height, index) => (
      <div
        key={index}
        className={`w-1 bg-gradient-to-t transition-all duration-300 ${
          isActive 
            ? `from-${color}-500 to-${color}-300 animate-pulse` 
            : `from-gray-600 to-gray-400`
        }`}
        style={{ height: `${height * 100}%` }}
      />
    ))}
  </div>
);

export default WaveformVisualization;