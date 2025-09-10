import React from 'react';
import { Menu, X, Play, Pause } from 'lucide-react';

// Navigation Component
const Navigation = ({ isScrolled, activeSection, mobileMenuOpen, setMobileMenuOpen, scrollToSection, toggleMusic, isPlaying }) => (
  <nav className={`coolvetica-font fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
  }`}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-center py-6">
        <div className="text-2xl font-bold custom-font">
        <span className={isScrolled ? "text-white" : "text-[var(--almost-black)]"}>
          MG
        </span>
        <span className="text-cyan-400">.</span>
      </div>
              
        <div className="hidden md:flex items-center space-x-8">
          {['home', 'experience', 'projects', 'music', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`capitalize font-medium transition-colors duration-200 relative ${
                activeSection === section 
                  ? 'text-cyan-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {section}
              {activeSection === section && (
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-cyan-400 rounded-full"></div>
              )}
            </button>
          ))}
          
          <button
            onClick={toggleMusic}
            className="ml-4 p-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </div>
  </nav>
);

export default Navigation;
