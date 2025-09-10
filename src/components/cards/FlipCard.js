import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';

const FlipCard = ({ experience, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 h-80"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className={`h-full bg-gradient-to-br ${experience.color} p-8 rounded-2xl text-white relative overflow-hidden`}>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            <h3 className="text-2xl font-bold mb-2">{experience.title}</h3>
            <p className="text-xl opacity-90 mb-4">{experience.company}</p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Calendar className="w-4 h-4" />
              {experience.period}
            </div>
            <div className="flex items-center gap-2 text-sm opacity-80 mt-1">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="h-full bg-gray-900/95 backdrop-blur-sm p-6 rounded-2xl border-2 border-gray-700">
            <ul className="space-y-3 mb-4 text-gray-300">
              {experience.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-cyan-400 mr-2">▸</span>
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {experience.tech.map((tech, idx) => (
                <span key={idx} className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-xs border border-cyan-500/30">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;   