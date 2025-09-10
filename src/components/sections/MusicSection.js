// src/app/components/sections/musicSection.js

import React, { useState, useEffect, useRef } from 'react';
import { Music, ExternalLink, Calendar, Headphones, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { spotifyTrackConfig, DEFAULT_ROLE } from '../../data/spotifyTracks';

const SpotifyIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const YouTubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SoundCloudIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.104.101.104.053 0 .094-.046.101-.104l.269-2.105-.269-2.154c-.007-.058-.048-.1-.101-.1zm1.49.518c-.059 0-.105.053-.105.117l-.183 1.642.183 1.611c0 .064.046.117.105.117.061 0 .106-.053.106-.117l.214-1.611-.214-1.642c0-.064-.045-.117-.106-.117zm1.459.094c-.061 0-.112.057-.112.128l-.214 1.548.214 1.547c0 .071.051.128.112.128.063 0 .113-.057.113-.128l.246-1.547-.246-1.548c0-.071-.05-.128-.113-.128zm1.43.094c-.064 0-.118.061-.118.138l-.183 1.454.183 1.423c0 .077.054.138.118.138.067 0 .119-.061.119-.138l.212-1.423-.212-1.454c0-.077-.052-.138-.119-.138zm1.413.106c-.069 0-.125.065-.125.144l-.153 1.348.153 1.318c0 .08.056.144.125.144.07 0 .126-.064.126-.144l.174-1.318-.174-1.348c0-.079-.056-.144-.126-.144zm1.404.127c-.073 0-.132.069-.132.154l-.124 1.221.124 1.19c0 .085.059.154.132.154.074 0 .133-.069.133-.154l.142-1.19-.142-1.221c0-.085-.059-.154-.133-.154zm1.395.141c-.077 0-.139.073-.139.162l-.093 1.08.093 1.055c0 .089.062.162.139.162.078 0 .14-.073.14-.162l.109-1.055-.109-1.08c0-.089-.062-.162-.14-.162zm1.376.162c-.081 0-.147.077-.147.171l-.062.918.062.889c0 .094.066.171.147.171.082 0 .148-.077.148-.171l.073-.889-.073-.918c0-.094-.066-.171-.148-.171zm1.371.2c-.085 0-.153.081-.153.181l-.031.718.031.708c0 .1.068.181.153.181.086 0 .154-.081.154-.181l.038-.708-.038-.718c0-.1-.068-.181-.154-.181zm1.353.218c-.089 0-.16.085-.16.189v.499c0 .104.071.189.16.189.09 0 .161-.085.161-.189v-.499c0-.104-.071-.189-.161-.189zm8.787-.905c-.187 0-.358.038-.51.107-.403-1.425-1.354-2.543-2.697-2.864-.248-.059-.505.097-.564.348-.059.251.097.507.348.566.912.218 1.634.967 1.916 1.954-.188-.035-.384-.054-.584-.054-1.405 0-2.544 1.139-2.544 2.544 0 1.405 1.139 2.544 2.544 2.544h8.787c1.168 0 2.113-.945 2.113-2.113s-.945-2.032-2.113-2.032z"/>
  </svg>
);

const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes vinylSlideIn {
  from {
    opacity: 0;
    transform: translateX(-100px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes vinylSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-vinylSlideIn {
  animation: vinylSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animate-slideInRight {
  animation: slideInRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
}

.animate-vinylSpin {
  animation: vinylSpin 4s linear infinite;
}
`;

// inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  if (!document.head.querySelector('[data-vinyl-styles]')) {
    styleSheet.setAttribute('data-vinyl-styles', 'true');
    document.head.appendChild(styleSheet);
  }
}

const MusicSection = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiSource, setApiSource] = useState('unknown');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [viewMode, setViewMode] = useState('vinyl'); // 'vinyl' or 'list'
  const [trackPosition, setTrackPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    async function fetchCredits() {
      try {
        setLoading(true);
        
        // check if we have tracks configured
        if (!spotifyTrackConfig || spotifyTrackConfig.length === 0) {
          setCredits([]);
          setApiSource('no-config');
          setLoading(false);
          return;
        }

        // fetch Spotify data first
        try {
          const res = await fetch('/api/spotify-credits');
          const data = await res.json();
          
          console.log('Spotify credits response:', data);
          
          if (data?.credits && data.credits.length > 0) {
            // merge Spotify data with our custom config
            const enhancedCredits = data.credits.map(credit => {
              const config = spotifyTrackConfig.find(track => 
                track.url.includes(credit.spotifyId) || 
                credit.spotifyUrl === track.url ||
                track.url.includes(credit.spotifyUrl)
              );
              
          return {
            ...credit,
            role: config?.role || credit.role || DEFAULT_ROLE,
            customGenre: config?.customGenre || credit.genre,
            description: config?.description || credit.description,
            year: config?.year || new Date(credit.releaseDate).getFullYear(),
            source: config?.source || 'spotify',
            plays: config?.plays || credit.plays,
            youtubeUrl: config?.youtubeUrl || credit.youtubeUrl,
          };

            });
            
            // filter out config tracks that are already in Spotify API response
            const spotifyUrls = data.credits.map(c => c.spotifyUrl);
            const spotifyIds = data.credits.map(c => c.spotifyId);
            
            const additionalTracks = spotifyTrackConfig
              .filter(config => {
                // skip if config track matches any Spotify API track
                const isSpotifyDuplicate = spotifyUrls.some(url => url === config.url) ||
                                          spotifyIds.some(id => config.url.includes(id)) ||
                                          config.source === 'spotify';
                return !isSpotifyDuplicate;
              })
              .map((config, index) => ({
                trackTitle: config.title || `Track ${index + 1}`,
                artist: config.artist || '1mains',
                role: config.role || DEFAULT_ROLE,
                genre: config.customGenre || config.genre || 'Electronic',
                customGenre: config.customGenre,
                spotifyUrl: config.source === 'spotify' ? config.url : undefined,
                url: config.source === 'soundcloud' ? config.url : undefined,
                youtubeUrl: config.youtubeUrl,
                description: config.description,
                imageUrl: config.imageUrl || `https://images.unsplash.com/photo-${1493225457124 + index}?w=400&h=400&fit=crop`,
                year: config.year || '2024',
                source: config.source || 'spotify-fallback',
                duration: config.duration,
                plays: config.plays
              }));

            
            const allTracks = [...enhancedCredits, ...additionalTracks];
            setCredits(allTracks);
            setApiSource(additionalTracks.length > 0 ? 'combined' : 'spotify');
          } else {
            throw new Error('No Spotify data available');
          }
        } catch (spotifyError) {
          console.log('Spotify API not available, using config data:', spotifyError);
          
          // fallback 
          const fallbackCredits = spotifyTrackConfig.map((config, index) => ({
            trackTitle: config.title || `Track ${index + 1}`,
            artist: config.artist || '1mains',
            role: config.role || DEFAULT_ROLE,
            genre: config.customGenre || config.genre || 'Electronic',
            customGenre: config.customGenre,
            spotifyUrl: config.source === 'spotify' ? config.url : undefined,
            url: config.source === 'soundcloud' ? config.url : undefined,
            youtubeUrl: config.youtubeUrl,
            description: config.description,
            imageUrl: config.imageUrl || `https://images.unsplash.com/photo-${1493225457124 + index}?w=400&h=400&fit=crop`,
            year: config.year || '2024',
            source: config.source || 'spotify-fallback',
            duration: config.duration,
            plays: config.plays
          }));

          
          setCredits(fallbackCredits);
          setApiSource('config-only');
        }
      } catch (err) {
        console.error('Failed to fetch credits', err);
        setCredits([]);
        setApiSource('error');
      } finally {
        setLoading(false);
      }
    }
    fetchCredits();
  }, []);

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartPosition(trackPosition);
  };

  const handleMouseDown = (e) => {
    handleDragStart(e.clientX);
  };

  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    
    const deltaX = clientX - startX;
    const sensitivity = 0.5; 
    const newPosition = startPosition + (deltaX * sensitivity);
    
    setTrackPosition(newPosition);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleAlbumClick = (track, absoluteIndex) => {
    if (!isDragging) {
      const normalizedIndex = absoluteIndex % credits.length;
      setSelectedTrack({ ...track, index: normalizedIndex });
    }
  };

  const closeTrackDetails = () => {
    setSelectedTrack(null);
  };

  const navigateTrack = (direction) => {
    const currentIndex = selectedTrack.index;
    let newIndex;

    if (direction === "next") {
      newIndex = currentIndex === credits.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? credits.length - 1 : currentIndex - 1;
    }

    setSelectedTrack({ ...credits[newIndex], index: newIndex });
  };

  // global event listeners for drag
  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalTouchMove = (e) => handleTouchMove(e);
    const handleGlobalMouseUp = () => handleDragEnd();
    const handleGlobalTouchEnd = () => handleDragEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, startX, startPosition]);

  const formatStreams = (plays) => {
    if (!plays || plays === 'N/A') return null;
    const playCount = typeof plays === 'string' ? plays.replace(/[^\d]/g, '') : plays;
    if (!playCount) return null;
    
    // format large numbers (e.g., 1000000 -> "1M")
    const num = parseInt(playCount);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M streams`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K streams`;
    }
    return `${num} streams`;
  };

  if (loading) {
    return (
      <section id="music" className="py-32 px-6 bg-stone-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-xl">Loading vinyl collection...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="music" className="py-32 px-6 bg-stone-50 min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="custom-font text-5xl font-bold mb-6">
            <span className="text-black">Music</span>
            <span className="text-gray-600"> Production</span>
          </h2>
          <p className="coolvetica-font text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            I love making music too! I work a lot of my passion for audio + tech into my 
            technical projects, but I also produce tracks for some artists... check them out below!
          </p>
          
          {/* View Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setViewMode('vinyl')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                viewMode === 'vinyl'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Vinyl View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {/* API Status Indicators */}
        {apiSource === 'combined' && credits.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-center">
            <p className="text-green-700 text-sm flex items-center justify-center">
              <Music className="w-4 h-4 mr-2" />
              Live Spotify data + Config tracks • {credits.length} tracks total
            </p>
          </div>
        )}
        
        {apiSource === 'spotify' && credits.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-center">
            <p className="text-green-700 text-sm flex items-center justify-center">
              <Music className="w-4 h-4 mr-2" />
              Live data from Spotify • {credits.length} tracks found
            </p>
          </div>
        )}
        
        {apiSource === 'config-only' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-center">
            <p className="text-blue-700 text-sm">
              🎵 Using track data from spotifyTracks.js config
            </p>
          </div>
        )}

        {apiSource === 'no-config' && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 text-center">
            <p className="text-orange-700 text-sm">
              🎵 No tracks configured in spotifyTracks.js
            </p>
          </div>
        )}

        {apiSource === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-center">
            <p className="text-red-700 text-sm">
              ⚠️ Error loading track data. Check configuration.
            </p>
          </div>
        )}

        {credits.length > 0 ? (
          <>
            
            {/* Vinyl Carousel View */}
            {viewMode === 'vinyl' && (
              <div className="relative">
                {/* Carousel Container */}
                <div className="relative h-96 flex items-start justify-center overflow-hidden mb-8 pt-8">
                  <div
                    ref={trackRef}
                    className="flex gap-8 absolute left-1/2 cursor-grab active:cursor-grabbing select-none"
                    style={{
                      transform: `translateX(calc(-50% + ${trackPosition}px))`,
                      transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                      top: '2rem'
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                  >
                    {/* Render multiple copies for infinite scroll effect */}
                    {[...Array(3)].map((_, copyIndex) =>
                      credits.map((track, index) => {
                        const absoluteIndex = copyIndex * credits.length + index;
                        return (
                          <div
                            key={`${copyIndex}-${index}`}
                            className="flex-shrink-0 w-80 h-80 relative group cursor-pointer"
                            onClick={() => handleAlbumClick(track, absoluteIndex)}
                          >
                          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
                            <img
                              src={track.imageUrl || `https://images.unsplash.com/photo-${1493225457124 + index}?w=400&h=400&fit=crop`}
                              alt={track.trackTitle || track.title}
                              className="w-full h-full object-cover"
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-bold text-lg mb-1">{track.trackTitle || track.title}</h3>
                                <p className="text-gray-300 text-sm">{track.artist}</p>
                                <div className="flex items-center justify-between">
                                  <p className="text-gray-400 text-xs">{track.role}</p>
                                  {track.source === 'soundcloud' && (
                                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">SC</span>
                                  )}
                                  {(track.source === 'spotify' || track.spotifyUrl) && (
                                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">SP</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        );
                      })
                    )}
                  </div>
                </div>
                
                {/* Instructions */}
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Drag to browse • Click to explore</p>
                </div>
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {credits.map((credit, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-400 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedTrack({ ...credit, index: i })}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={credit.imageUrl || `https://images.unsplash.com/photo-${1493225457124 + i}?w=400&h=400&fit=crop`}
                        alt={credit.trackTitle || credit.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      <div className="flex-grow">
                        <h4 className="text-xl font-semibold text-black mb-2">
                          {credit.trackTitle || credit.title}
                        </h4>
                        <p className="text-gray-700 text-sm font-medium mb-1">
                          {credit.role}
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          {credit.artist} • {credit.year}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {credit.duration && (
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {credit.duration}
                            </div>
                          )}
                          {credit.plays && formatStreams(credit.plays) && (
                            <div className="flex items-center">
                              <Headphones className="w-4 h-4 mr-1" />
                              {formatStreams(credit.plays)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {credit.spotifyUrl && (
                          <a
                            href={credit.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-green-600 hover:bg-green-700 !text-white visited:!text-white hover:!text-white focus:!text-white no-underline px-3 py-2 rounded-lg text-sm flex items-center justify-center transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 mr-1 text-white" />
                            Spotify
                          </a>
                        )}
                        {credit.url && credit.source === 'soundcloud' && (
                          <a
                            href={credit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-orange-600 hover:bg-orange-700 !text-white visited:!text-white hover:!text-white focus:!text-white no-underline px-3 py-2 rounded-lg text-sm flex items-center justify-center transition-colors"
                            style={{ textDecoration: 'none' }}
                          >
                            <ExternalLink className="w-4 h-4 mr-1 text-white" />
                            SoundCloud
                          </a>
                        )}

                        {credit.youtubeUrl && (
                          <a
                            href={credit.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-red-600 hover:bg-red-700 !text-white visited:!text-white hover:!text-white focus:!text-white no-underline px-3 py-2 rounded-lg text-sm flex items-center justify-center transition-colors"
                            style={{ textDecoration: 'none' }}
                          >
                            <ExternalLink className="w-4 h-4 mr-1 text-white" />
                            YouTube
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      {(credit.customGenre || credit.genre) && (
                        <span className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                          {credit.customGenre || credit.genre}
                        </span>
                      )}
                      
                      <span className="text-xs text-gray-500">
                        Click to view details
                      </span>
                    </div>
                    
                    {credit.description && (
                      <p className="text-gray-600 text-sm mt-3 pt-3 border-t border-gray-200">
                        {credit.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Music className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">No Music Credits Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Configuring tracks... 
            </p>
          </div>
        )}
      </div>

      {/* Vinyl Details Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative animate-slideUp">
            {/* Close Button */}
            <button
              onClick={closeTrackDetails}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-black" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Album Cover - Vinyl Style */}
              <div className="lg:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="relative animate-vinylSlideIn">
                  {/* Vinyl Record */}
                  <div className="w-80 h-80 bg-black rounded-full shadow-2xl relative overflow-hidden animate-vinylSpin">
                    <div className="absolute inset-4 rounded-full overflow-hidden">
                      <img
                        src={selectedTrack.imageUrl || `https://images.unsplash.com/photo-${1493225457124 + selectedTrack.index}?w=400&h=400&fit=crop`}
                        alt={selectedTrack.trackTitle || selectedTrack.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Vinyl Details */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    {/* Vinyl Ridges */}
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className="absolute border border-gray-300 rounded-full"
                        style={{
                          top: `${i * 12}%`,
                          left: `${i * 12}%`,
                          right: `${i * 12}%`,
                          bottom: `${i * 12}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Track Details - Sliding Panel */}
              <div className="lg:w-1/2 p-8 overflow-y-auto animate-slideInRight">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigateTrack('prev')}
                      className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-black" />
                    </button>

                    <button
                      onClick={() => navigateTrack('next')}
                      className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-black" />
                    </button>

                    <span className="text-gray-600 text-sm ml-2">
                      {selectedTrack.index + 1} of {credits.length}
                    </span>
                  </div>
                  <div></div>
                </div>

                {/* Track Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-black mb-2">{selectedTrack.trackTitle || selectedTrack.title}</h2>
                    <p className="text-gray-700 text-lg font-medium">{selectedTrack.artist}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {selectedTrack.source === 'soundcloud' && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">SoundCloud</span>
                      )}
                      {(selectedTrack.source === 'spotify' || selectedTrack.spotifyUrl) && (
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Spotify</span>
                      )}
                      {selectedTrack.youtubeUrl && (
                        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">YT</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {selectedTrack.customGenre || selectedTrack.genre}
                    </span>
                    {selectedTrack.duration && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {selectedTrack.duration}
                      </span>
                    )}
                    {selectedTrack.year && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {selectedTrack.year}
                      </span>
                    )}
                    {selectedTrack.plays && formatStreams(selectedTrack.plays) && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {formatStreams(selectedTrack.plays)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-black">My Role</h3>
                    <p className="text-gray-700 font-medium">{selectedTrack.role}</p>
                  </div>

                  {selectedTrack.description && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-black">Details</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedTrack.description}</p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {selectedTrack.spotifyUrl && (
                      <a
                        href={selectedTrack.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="service-button inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                      >
                        <SpotifyIcon className="w-5 h-5" />
                      </a>
                    )}
                    {selectedTrack.url && selectedTrack.source === 'soundcloud' && (
                      <a
                        href={selectedTrack.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="service-button inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                      >
                        <SoundCloudIcon className="w-5 h-5" />
                      </a>
                    )}
                    {selectedTrack.youtubeUrl && (
                      <a
                        href={selectedTrack.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="service-button inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                      >
                        <YouTubeIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MusicSection;