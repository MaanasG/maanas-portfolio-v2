import React, { useRef, useEffect, useState } from "react";

const AudioSpectralizer = ({ audioElement, isPlaying }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const analyserRef = useRef();
  const audioContextRef = useRef();
  const sourceRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);
  const [showNudge, setShowNudge] = useState(true);

  const previousHeightsRef = useRef([]); 

  useEffect(() => {
    if (sourceRef.current) {
      sourceRef.current = null;
      setIsInitialized(false);
    }
  }, [audioElement]);

  useEffect(() => {
    const startupTimer = setTimeout(() => {
      if (!isPlaying) {
        setShowNudge(true);
      }
    }, 3000);

    return () => clearTimeout(startupTimer);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      setShowNudge(false);
    } else {
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

    const drawRoundedRect = (ctx, x, y, width, height, radius) => {
      const r = Math.min(radius, width / 2, height / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + width - r, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + r);
      ctx.lineTo(x + width, y + height - r);
      ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
      ctx.lineTo(x + r, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
    };


    const drawBars = (ctx, dataArray, width, height, isActive) => {
      const numBars = 64;
      const spacing = width / numBars;
      const barWidth = spacing * 0.6;
      const baseY = height - 20;
      const maxBarHeight = height * 0.4;

      if (!previousHeightsRef.current.length) {
        previousHeightsRef.current = new Array(numBars).fill(3);
      }

      const decayRate = 4; 
      const sensitivityBoost = 2;

      for (let i = 0; i < numBars; i++) {
        let targetHeight = previousHeightsRef.current[i];

        if (isActive) {
          const value = dataArray[i];
          targetHeight = Math.max(
            3,
            ((value / 255) ** 0.8) * maxBarHeight * sensitivityBoost
          );
        } else {
          targetHeight = Math.max(3, targetHeight - decayRate);
        }

        const smoothedHeight =
          previousHeightsRef.current[i] * 0.6 + targetHeight * 0.4;
        previousHeightsRef.current[i] = smoothedHeight;

        const x = Math.round(i * spacing + spacing / 2);
        const y = Math.round(baseY - smoothedHeight);
        const w = Math.round(barWidth);
        const h = Math.round(smoothedHeight);

        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = "rgba(0,0,0,0.8)";
        drawRoundedRect(ctx, x - w / 2, y, w, h, 6);
      }

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    };


    const animate = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      if (
        isInitialized &&
        analyserRef.current &&
        audioContextRef.current?.state === "running"
      ) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        drawBars(ctx, dataArray, width, height, isPlaying);
      } else {
        drawBars(ctx, [], width, height, false);
      }

      animationRef.current = requestAnimationFrame(animate);
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
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-in-out"
        style={{
          zIndex: 20,
          opacity: isPlaying ? 1 : 0,
          mixBlendMode: "normal",
        }}
      />

      {/* Nudge */}
      <div
        className={`custom-font z-30 pointer-events-none transition-all duration-500 ease-in-out
          ${showNudge && !isPlaying ? "opacity-100 translate-y-12" : "opacity-0 translate-y-2"}
          sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
        `}
      >
        <div className="px-3 py-1.5">
          <p className="text-black/80 text-[10px] sm:text-xs font-medium tracking-wide whitespace-nowrap text-center">
            <span className="inline-block animate-pulse mr-1">▶</span>
            Hit play to see the visualizer in action
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioSpectralizer;
