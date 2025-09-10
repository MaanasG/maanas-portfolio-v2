import React, { useRef, useEffect, useState } from "react";

const AudioSpectralizer = ({ audioElement, isPlaying }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const analyserRef = useRef();
  const audioContextRef = useRef();
  const sourceRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);
  const [showNudge, setShowNudge] = useState(true);

  useEffect(() => {
    if (sourceRef.current) {
      sourceRef.current = null;
      setIsInitialized(false);
    }
  }, [audioElement]);

  useEffect(() => {
    // Show nudge after 3 seconds on startup if not playing
    const startupTimer = setTimeout(() => {
      if (!isPlaying) {
        setShowNudge(true);
      }
    }, 3000);

    return () => clearTimeout(startupTimer);
  }, []);

  useEffect(() => {
    // Hide nudge when audio starts playing
    if (isPlaying) {
      setShowNudge(false);
    } else {
      // Show nudge again after a delay when audio stops
      const timer = setTimeout(() => setShowNudge(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioElement) return;

    const initAudioContext = () => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext ||
            window.webkitAudioContext)();
        }

        if (!analyserRef.current) {
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 256;
          analyserRef.current.smoothingTimeConstant = 0.85;
        }

        if (!sourceRef.current) {
          sourceRef.current =
            audioContextRef.current.createMediaElementSource(audioElement);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Audio context initialization failed:", error);
      }
    };

    const handlePlay = () => {
      if (!isInitialized) {
        initAudioContext();
      }
    };

    audioElement.addEventListener("play", handlePlay);

    return () => {
      audioElement.removeEventListener("play", handlePlay);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioElement, isInitialized]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      if (
        isInitialized &&
        isPlaying &&
        analyserRef.current &&
        audioContextRef.current?.state === "running"
      ) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        drawFrequencyBars(ctx, dataArray, width, height);
      } else {
        drawStaticBars(ctx, width, height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const drawRoundedRect = (ctx, x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    };

    const drawStaticBars = (ctx, width, height) => {
      const numBars = 48;
      const spacing = (width * 0.7) / numBars;
      const barWidth = spacing * 0.6;
      const baseY = height - 50;
      const maxBarHeight = height * 0.25;

      for (let i = 0; i < numBars; i++) {
        const x = (i - numBars / 2) * spacing + width / 2;
        const barHeight = maxBarHeight * 0.05;

        ctx.fillStyle = "rgba(0,0,0,0.6)";
        drawRoundedRect(
          ctx,
          x - barWidth / 2,
          baseY - barHeight,
          barWidth,
          barHeight,
          4 
        );
      }
    };

    const drawFrequencyBars = (ctx, dataArray, width, height) => {
      const numBars = 64;
      const spacing = (width * 0.7) / numBars;
      const barWidth = spacing * 0.6;
      const baseY = height - 20;
      const maxBarHeight = height * 0.4;

      for (let i = 0; i < numBars; i++) {
        const value = dataArray[i];

        const sensitivityBoost = 2;
        const barHeight = Math.max(
          3,
          ((value / 255) ** 0.8) * maxBarHeight * sensitivityBoost
        );

        const x = (i - numBars / 2) * spacing + width / 2;

        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = value > 160 ? 12 : 6;

        drawRoundedRect(
          ctx,
          x - barWidth / 2,
          baseY - barHeight,
          barWidth,
          barHeight,
          6 
        );

        ctx.shadowBlur = 0;
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInitialized, isPlaying]);

  return (
    <div className="relative w-full h-full">
      <div 
        className={`custom-font absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500 ease-in-out ${
          showNudge && !isPlaying 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="px-3 py-1.5">
          <p className="text-black/80 text-xs font-medium tracking-wide">
            <span className="inline-block animate-pulse mr-1">▶</span> Hit play to see the visualizer in action
          </p>
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-in-out"
        style={{
          zIndex: 20,
          opacity: isPlaying ? 1 : 0,
          mixBlendMode: "normal",
        }}
      />
    </div>
  );
};

export default AudioSpectralizer;