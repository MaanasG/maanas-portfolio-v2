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
      className="min-h-[52vh] max-h-[620px] relative overflow-x-hidden overflow-y-visible"
      style={{
        background: "transparent",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Offset content below the fixed navigation bar */}
      <div className="h-20 w-full"></div>

      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[calc(52vh-5rem)] max-h-[calc(620px-5rem)] px-4 sm:px-6 relative py-6 sm:py-8">
        <div className="flex flex-col items-center relative z-10">
          {/* Waveform: in-flow so it never tucks under the fixed nav when resizing */}
          <div className="flex items-end">
            <div className="flex flex-col items-end text-right leading-none">
              <div
                className="shrink-0 mb-2"
                style={{
                  width: `${spectralizerWidth}px`,
                  height: "96px",
                }}
              >
                <AudioSpectralizer audioElement={audioElement} isPlaying={isPlaying} />
              </div>

              <div ref={textContainerRef} className="flex flex-col leading-none">
                <h1
                  ref={maanasRef}
                  className="font-black custom-font tracking-tighter"
                  style={{
                    color: "var(--foreground)",
                    fontSize: "min(10vw, 140px)",
                    lineHeight: "1",
                    marginBottom: "-0.20em",
                  }}
                >
                  MAANAS
                </h1>
                <h2
                  className="font-black custom-font tracking-tighter"
                  style={{
                    color: "var(--foreground)",
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
              className="rounded-full border-4 flex-shrink-0 overflow-hidden"
              style={{
                borderColor: "var(--foreground)",
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
        </div>

        <button
          onClick={() => scrollToSection("intro")}
          className="absolute bottom-4 md:bottom-5 left-4 md:left-6 z-10 opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll to next section"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ChevronDown className="chevron-scroll-hint w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
