"use client";

import React, { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import LoadingScreen from './sections/LoadingScreen';
import CustomStyles from './common/CustomStyles';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import MusicSection from './sections/MusicSection';
import ContactSection from './sections/ContactSection';
import Footer from './ui/Footer';

import { experiences } from '../data/experiences';
import { projects } from '../data/projects';
import { tracks } from '../data/tracks';

const Portfolio = () => {
  const {
    isScrolled,
    activeSection,
    mobileMenuOpen,
    setMobileMenuOpen,
    mousePosition,
    isPlaying,
    isMuted,
    currentTrack,
    setCurrentTrack,
    heroRef,
    scrollToSection,
    toggleMusic,
    toggleMute
  } = usePortfolio();

  const [audioElement, setAudioElement] = useState(null);
  const [actuallyPlaying, setActuallyPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const playTrack = (index) => {
    if (currentTrack !== index) {
      setCurrentTrack(index);
    }
    if (!isPlaying) {
      toggleMusic();
    }
  };

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <CustomStyles />
      
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      
      {/* Main Content with fade transition */}
      <div className={`transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Navigation 
          isScrolled={isScrolled}
          activeSection={activeSection}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          scrollToSection={scrollToSection}
          toggleMusic={toggleMusic}
          isPlaying={isPlaying}
          onAudioReady={setAudioElement} 
          onPlayingStateChange={setActuallyPlaying}
        />

        <HeroSection 
          heroRef={heroRef}
          mousePosition={mousePosition}
          scrollToSection={scrollToSection}
          audioElement={audioElement}    
          isPlaying={actuallyPlaying}  
        />

        {/* <AboutSection /> */}
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <MusicSection 
          isPlaying={isPlaying}
          isMuted={isMuted}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          toggleMusic={toggleMusic}
          toggleMute={toggleMute}
          tracks={tracks}
        />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;