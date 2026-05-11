import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
} from "lucide-react";
import { tracks } from "../../data/tracks.js";

const Navigation = ({
  isScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  onAudioReady,
  onPlayingStateChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const desktopScrollingTextRef = useRef(null);
  const mobileScrollingTextRef = useRef(null);

  const currentTrack = tracks[currentTrackIndex];

  // Initialize audio
  useEffect(() => {
    const audioInstance = new Audio();
    setAudio(audioInstance);

    const updateTime = () => setCurrentTime(audioInstance.currentTime);
    const updateDuration = () => setDuration(audioInstance.duration);
    const handleEnded = () => {
      nextTrack();
      onPlayingStateChange && onPlayingStateChange(false);
    };

    audioInstance.addEventListener("timeupdate", updateTime);
    audioInstance.addEventListener("loadedmetadata", updateDuration);
    audioInstance.addEventListener("ended", handleEnded);

    return () => {
      audioInstance.removeEventListener("timeupdate", updateTime);
      audioInstance.removeEventListener("loadedmetadata", updateDuration);
      audioInstance.removeEventListener("ended", handleEnded);
      audioInstance.pause();
    };
  }, []);

  useEffect(() => {
    if (audio && currentTrack) {
      audio.src = currentTrack.link;
      setCurrentTime(0);

      // audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

      setIsPlaying(false);
    }
  }, [currentTrackIndex, audio, currentTrack]);

  // Scrolling text animation
  const setupScrollingAnimation = (scrollElement) => {
    if (!scrollElement) return;

    const textWidth = scrollElement.scrollWidth;
    const container = scrollElement.parentElement;
    const containerWidth = container.offsetWidth;

    const distance = textWidth + containerWidth;
    const speed = 40; // px/sec
    const duration = Math.max(distance / speed, 12);

    scrollElement.style.animation = "none";
    scrollElement.offsetHeight; // force reflow
    scrollElement.style.animation = `scroll-loop ${duration}s linear infinite`;
  };

  useEffect(() => {
    setupScrollingAnimation(desktopScrollingTextRef.current);
    setupScrollingAnimation(mobileScrollingTextRef.current);
  }, [currentTrack, isScrolled]);

  useEffect(() => {
    if (audio && onAudioReady) onAudioReady(audio);
  }, [audio, onAudioReady]);

  const toggleMusic = () => {
    if (!audio) return;
    const newPlayingState = !isPlaying;
    if (newPlayingState) {
      audio.play().then(() => {
        setIsPlaying(true);
        onPlayingStateChange && onPlayingStateChange(true);
      }).catch((e) => console.error("Playback error:", e));
    } else {
      audio.pause();
      setIsPlaying(false);
      onPlayingStateChange && onPlayingStateChange(false);
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
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <style jsx>{`
        @keyframes scroll-loop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scrolling-container {
          overflow: hidden;
          white-space: nowrap;
          flex: 1;
          min-width: 0;
          position: relative;
        }
        .scrolling-text {
          display: inline-block;
          white-space: nowrap;
        }
        .scrolling-text span {
          display: inline-block;
          padding-right: 2rem;
        }
        .scrolling-text:hover {
          animation-play-state: paused;
        }
      `}</style>

      <nav
        className="coolvetica-font fixed top-0 w-full z-50 transition-[background-color,border-color,backdrop-filter,-webkit-backdrop-filter] duration-300 ease-out"
        style={{
          borderBottom: isScrolled ? "1px solid var(--border)" : "1px solid transparent",
          backgroundColor: isScrolled ? "rgba(251, 250, 247, 0.76)" : "rgba(251, 250, 247, 0.45)",
          backdropFilter: isScrolled ? "blur(18px) saturate(1.4)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(18px) saturate(1.4)" : "none",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
          <div className="flex items-center justify-between py-4 relative">
            {/* Logo */}
            <div className="text-2xl font-bold custom-font z-50 relative">
              <span
                style={{ color: "var(--foreground)" }}
              >
                MG
              </span>
              <span style={{ color: "var(--muted-foreground)" }}>.</span>
            </div>

            {/* Desktop Music Player */}
            <div className="hidden md:flex flex-1 mx-4 items-center justify-center space-x-4">
              <div className="flex flex-col min-w-0 flex-1 max-w-lg">
                <div className="scrolling-container">
                  <div
                    ref={desktopScrollingTextRef}
                    className="scrolling-text text-sm sm:text-base font-medium"
                    style={{
                      animation: "scroll-loop 15s linear infinite",
                      color: "var(--foreground)",
                    }}
                  >
                    <span>{currentTrack.title} • {currentTrack.artist}</span>
                    <span>{currentTrack.title} • {currentTrack.artist}</span>
                  </div>
                </div>
                <div
                    className="text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                >
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={prevTrack}
                  className="p-2 rounded-full transition-colors"
                  style={{ background: "rgba(0,0,0,0.04)", border: "1px solid var(--border)" }}
                >
                  <SkipBack
                    className="w-4 h-4"
                    style={{ color: "var(--muted-foreground)" }}
                  />
                </button>
                <button
                  onClick={toggleMusic}
                  className="p-2 sm:p-3 rounded-full transition-colors"
                  style={{ background: "rgba(0,0,0,0.06)", border: "1px solid var(--border)" }}
                >
                  {isPlaying ? (
                    <Pause className="w-4 sm:w-5 h-4 sm:h-5" style={{ color: "var(--foreground)" }} />
                  ) : (
                    <Play className="w-4 sm:w-5 h-4 sm:h-5 ml-0.5" style={{ color: "var(--foreground)" }} />
                  )}
                </button>
                <button
                  onClick={nextTrack}
                  className="p-2 rounded-full transition-colors"
                  style={{ background: "rgba(0,0,0,0.04)", border: "1px solid var(--border)" }}
                >
                  <SkipForward
                    className="w-4 h-4"
                    style={{ color: "var(--muted-foreground)" }}
                  />
                </button>
                <button
                  className="p-2 rounded-full transition-colors"
                  style={{ background: "rgba(0,0,0,0.04)", border: "1px solid var(--border)" }}
                >
                  <Volume2
                    className="w-4 h-4"
                    style={{ color: "var(--muted-foreground)" }}
                  />
                </button>
              </div>
            </div>

            {/* Mobile Player */}
            <div
              className={`md:hidden flex flex-1 justify-center transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="flex flex-col items-center max-w-[180px] w-full">
                <div className="scrolling-container w-full mb-1">
                  <div
                    ref={mobileScrollingTextRef}
                    className="scrolling-text text-sm font-medium"
                    style={{
                      animation: "scroll-loop 15s linear infinite",
                      color: "var(--foreground)",
                    }}
                  >
                    <span>{currentTrack.title} • {currentTrack.artist}</span>
                    <span>{currentTrack.title} • {currentTrack.artist}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevTrack}
                    className="p-2 rounded-full transition-colors"
                    style={{ background: "rgba(0,0,0,0.04)", border: "1px solid var(--border)" }}
                  >
                    <SkipBack
                      className="w-4 h-4"
                      style={{ color: "var(--muted-foreground)" }}
                    />
                  </button>
                  <button
                    onClick={toggleMusic}
                    className="p-2 rounded-full transition-colors"
                    style={{ background: "rgba(0,0,0,0.06)", border: "1px solid var(--border)" }}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" style={{ color: "var(--foreground)" }} />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" style={{ color: "var(--foreground)" }} />
                    )}
                  </button>
                  <button
                    onClick={nextTrack}
                    className="p-2 rounded-full transition-colors"
                    style={{ background: "rgba(0,0,0,0.04)", border: "1px solid var(--border)" }}
                  >
                    <SkipForward
                      className="w-4 h-4"
                      style={{ color: "var(--muted-foreground)" }}
                    />
                  </button>
                </div>

                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>

            {/* Hamburger */}
            <button
              className="flex xl:hidden z-50 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: "var(--foreground)" }}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Progress bar */}
            {duration > 0 && !mobileMenuOpen && (
              <div className="absolute bottom-0 left-0 w-full">
                <div className="w-full h-1" style={{ background: "rgba(0,0,0,0.06)" }}>
                  <div
                      className="h-1 rounded-full transition-all duration-100"
                    style={{
                      background: "rgba(0,0,0,0.35)",
                      width: `${(currentTime / duration) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile slideout */}
      {mobileMenuOpen && (
        <div className="coolvetica-font fixed inset-0 z-[100] flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="relative w-64 h-full shadow-2xl transform transition-transform duration-300 ease-out translate-x-0"
            style={{ background: "var(--background)", borderLeft: "1px solid var(--border)" }}
          >
            <div className="p-6 flex justify-between items-center" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: "var(--muted-foreground)" }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              {/* Nav buttons removed to prevent horizontal overflow on wide viewports. */}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ borderTop: "1px solid var(--border)", background: "var(--background)" }}>
              <div className="text-sm font-medium mb-2 truncate" style={{ color: "var(--foreground)" }}>
                Now Playing:
              </div>
              <div className="text-xs mb-3 truncate" style={{ color: "var(--muted-foreground)" }}>
                {currentTrack.title} • {currentTrack.artist}
              </div>
              <div className="text-xs text-center" style={{ color: "var(--muted-foreground)" }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
