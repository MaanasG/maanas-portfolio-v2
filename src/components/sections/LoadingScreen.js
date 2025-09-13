import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval;
    let minLoadTime;

    const checkLoadingComplete = () => {
      // Check if fonts are loaded
      const fontsLoaded = document.fonts ? document.fonts.check('16px custom-font') : true;
      
      // Check if critical images are loaded
      const faceImage = new Image();
      faceImage.src = '/logos/face.jpg';
      
      const imageLoaded = new Promise((resolve) => {
        if (faceImage.complete) {
          resolve(true);
        } else {
          faceImage.onload = () => resolve(true);
          faceImage.onerror = () => resolve(true); // Still resolve if image fails
        }
      });

      const fontLoaded = document.fonts ? document.fonts.ready : Promise.resolve();

      // Ensure minimum loading time of 1 second for smooth experience
      minLoadTime = new Promise(resolve => setTimeout(resolve, 1000));

      Promise.all([imageLoaded, fontLoaded, minLoadTime])
        .then(() => {
          setProgress(100);
          setTimeout(() => {
            setIsLoading(false);
            onLoadComplete();
          }, 500); // Small delay for smooth transition
        });
    };

    // Simulate progress
    progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 90) {
          return prev + Math.random() * 15;
        }
        return prev;
      });
    }, 100);

    // Start checking for load completion after a brief delay
    setTimeout(checkLoadingComplete, 200);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-600"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Main logo/name */}
        <div className="mb-8">
          <h1 className="font-black text-gray-900 custom-font tracking-tighter text-6xl md:text-8xl lg:text-9xl">
            MAANAS
          </h1>
          <h2 className="font-black text-gray-900 custom-font tracking-tighter text-lg md:text-2xl lg:text-3xl -mt-2">
            GOPI
          </h2>
        </div>

        {/* Loading bar */}
        <div className="w-64 md:w-80 mx-auto mb-4">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gray-900 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Loading text */}
        <p className="coolvetica-font text-gray-600 text-sm uppercase tracking-wide">
          {progress < 30 && "Loading fonts..."}
          {progress >= 30 && progress < 70 && "Loading images..."}
          {progress >= 70 && progress < 100 && "Almost ready..."}
          {progress >= 100 && "Welcome!"}
        </p>
      </div>

      {/* Animated dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;