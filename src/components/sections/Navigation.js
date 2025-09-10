import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { tracks } from '../../data/tracks.js';

const Navigation = ({ isScrolled, activeSection, mobileMenuOpen, setMobileMenuOpen, scrollToSection, onAudioReady, onPlayingStateChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const scrollingTextRef = useRef(null);
  
  const currentTrack = tracks[currentTrackIndex];

  // init audio
useEffect(() => {
  const audioInstance = new Audio();
  setAudio(audioInstance);

  const updateTime = () => setCurrentTime(audioInstance.currentTime);
  const updateDuration = () => setDuration(audioInstance.duration);
  const handleEnded = () => {
    nextTrack();
    if (onPlayingStateChange) {
      onPlayingStateChange(false);
    }
  };

  audioInstance.addEventListener('timeupdate', updateTime);
  audioInstance.addEventListener('loadedmetadata', updateDuration);
  audioInstance.addEventListener('ended', handleEnded);

  return () => {
    audioInstance.removeEventListener('timeupdate', updateTime);
    audioInstance.removeEventListener('loadedmetadata', updateDuration);
    audioInstance.removeEventListener('ended', handleEnded);
    audioInstance.pause();
  };
}, []); 

useEffect(() => {
  if (audio && currentTrack) {
    console.log('Changing track to:', currentTrack.title);
    audio.src = currentTrack.link;
    audio.load(); 
    setIsPlaying(false);
    setCurrentTime(0);
  }
}, [currentTrackIndex, audio, currentTrack]);

  useEffect(() => {
    const scrollElement = scrollingTextRef.current;
    if (!scrollElement) return;

    const text = scrollElement.textContent;
    const textWidth = scrollElement.scrollWidth;
    const containerWidth = scrollElement.parentElement.offsetWidth;
    
    if (textWidth > containerWidth) {
      scrollElement.style.animation = 'none';
      // reset
      scrollElement.offsetHeight; 
      scrollElement.style.animation = `scroll-text ${Math.max(text.length * 0.1, 8)}s linear infinite`;
    }
  }, [currentTrack, isScrolled]);

    useEffect(() => {
      if (audio && onAudioReady) {
        onAudioReady(audio);
      }
    }, [audio, onAudioReady]);

  const toggleMusic = () => {
    if (!audio) return;
    
    const newPlayingState = !isPlaying;
    
    if (newPlayingState) {
      audio.play().catch(e => console.error('Audio play failed:', e));
    } else {
      audio.pause();
    }
    setIsPlaying(!isPlaying);

    if (onPlayingStateChange) {
      onPlayingStateChange(newPlayingState);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style jsx>{`
        @keyframes scroll-text {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .scrolling-container {
          overflow: hidden;
          white-space: nowrap;
        }
        
        .scrolling-text {
          display: inline-block;
          padding-left: 100%;
        }
      `}</style>

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
                    
            <div className="hidden lg:flex items-center space-x-8">
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
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="flex flex-col items-end min-w-0 max-w-48">
                <div className="scrolling-container w-full">
                  <div 
                    ref={scrollingTextRef}
                    className="scrolling-text text-sm font-medium text-white truncate"
                  >
                    {currentTrack.title} • {currentTrack.artist}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {formatTime(currentTime)} / {currentTrack.duration}
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevTrack}
                  className="p-2 rounded-full bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                >
                  <SkipBack className="w-4 h-4 text-gray-300" />
                </button>
                
                <button
                  onClick={toggleMusic}
                  className="p-3 rounded-full bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                >
                  {isPlaying ? 
                    <Pause className="w-5 h-5 text-cyan-400" /> : 
                    <Play className="w-5 h-5 text-cyan-400 ml-0.5" />
                  }
                </button>
                
                <button
                  onClick={nextTrack}
                  className="p-2 rounded-full bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                >
                  <SkipForward className="w-4 h-4 text-gray-300" />
                </button>
              </div>

              {/* Volume Control (Visual Only) */}
              <button className="p-2 rounded-full bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
                <Volume2 className="w-4 h-4 text-gray-300" />
              </button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {duration > 0 && (
            <div className="hidden md:block pb-2">
              <div className="w-full bg-gray-800/50 rounded-full h-1">
                <div 
                  className="bg-cyan-400 h-1 rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="md:hidden flex items-center justify-between pb-4">
            <div className="flex flex-col min-w-0 flex-1">
              <div className="scrolling-container">
                <div className="scrolling-text text-sm font-medium text-white truncate">
                  {currentTrack.title} • {currentTrack.artist}
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {formatTime(currentTime)} / {currentTrack.duration}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={prevTrack}
                className="p-2 rounded-full bg-gray-800/50 border border-gray-700/50"
              >
                <SkipBack className="w-4 h-4 text-gray-300" />
              </button>
              
              <button
                onClick={toggleMusic}
                className="p-2 rounded-full bg-cyan-500/20 border border-cyan-500/30"
              >
                {isPlaying ? 
                  <Pause className="w-4 h-4 text-cyan-400" /> : 
                  <Play className="w-4 h-4 text-cyan-400" />
                }
              </button>
              
              <button
                onClick={nextTrack}
                className="p-2 rounded-full bg-gray-800/50 border border-gray-700/50"
              >
                <SkipForward className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;