import React, { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import AudioSpectralizer from "./AudioSpectralizer";

const HeroSection = ({ heroRef, mousePosition, scrollToSection, audioElement, isPlaying }) => {
  const maanasRef = useRef(null);
  const textContainerRef = useRef(null);
  const [maanasWidth, setMaanasWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (maanasRef.current) {
        setMaanasWidth(maanasRef.current.getBoundingClientRect().width);
      }
      if (textContainerRef.current) {
        setTextHeight(textContainerRef.current.getBoundingClientRect().height);
      }
    };

    measure();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const spectralizerWidth = maanasWidth || 400;

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-[52vh] max-h-[560px] bg-[var(--almost-black)] relative overflow-hidden"
    >
      {/* Offset content below the fixed navigation bar */}
      <div className="h-20 w-full"></div>

      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[calc(52vh-5rem)] max-h-[calc(560px-5rem)] px-4 sm:px-6 relative py-4">
        <div className="flex flex-col items-center relative z-10">
          {/* Waveform — width matches MAANAS; sits slightly above the headline */}
          <div className="flex items-end">
            <div className="relative flex flex-col text-right leading-none">
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 2px)",
                  right: 0,
                  width: `${spectralizerWidth}px`,
                  height: "80px",
                }}
              >
                <AudioSpectralizer audioElement={audioElement} isPlaying={isPlaying} />
              </div>

              <div ref={textContainerRef} className="flex flex-col leading-none">
                <h1
                  ref={maanasRef}
                  className="font-black text-[var(--off-white)] custom-font tracking-tighter"
                  style={{
                    fontSize: "min(10vw, 140px)",
                    lineHeight: "1",
                    marginBottom: "-0.20em",
                  }}
                >
                  MAANAS
                </h1>
                <h2
                  className="font-black text-[var(--off-white)] custom-font tracking-tighter"
                  style={{
                    fontSize: "min(2.5vw, 38px)",
                    lineHeight: "1",
                    marginTop: "0",
                  }}
                >
                  GOPI
                </h2>
              </div>
            </div>

            <div
              className="rounded-full border-4 border-[var(--off-white)] flex-shrink-0 overflow-hidden"
              style={{
                height: `${Math.min(textHeight || 220, 220)}px`,
                width: `${Math.min(textHeight || 220, 220)}px`,
                marginLeft: "-0.15em",
              }}
            >
              <img
                src="/logos/face.jpg"
                alt="Profile"
                className="w-full h-full object-cover overflow-hidden"
              />
            </div>
          </div>

          {/* Resume / LinkedIn */}
          <div className="mt-5 flex justify-center">
            <div className="coolvetica-font flex gap-2 md:gap-3">
              <a
                href="./Maanas_Gopi_Resume.pdf"
                className="px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 bg-gray-900/80 text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-xs sm:text-sm uppercase tracking-wide"
              >
                Resume
              </a>
              <a
                href="https://linkedin.com/in/maanas-gopi"
                className="px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 border border-gray-700 text-[var(--off-white)] rounded-full font-medium hover:border-amber-400 transition-colors text-xs sm:text-sm uppercase tracking-wide"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-4 md:bottom-5 left-4 md:left-6 text-gray-400 hover:text-[var(--off-white)] transition-colors z-10"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
