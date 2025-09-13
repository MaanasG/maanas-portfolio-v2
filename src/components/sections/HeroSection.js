import React, { useRef, useEffect, useState } from "react";
import { Code, Music, ChevronDown, GraduationCap } from "lucide-react";
import AudioSpectralizer from "./AudioSpectralizer";

const HeroSection = ({ heroRef, mousePosition, scrollToSection, audioElement, isPlaying }) => {
  const maanasRef = useRef(null);
  const textContainerRef = useRef(null);
  const [maanasWidth, setMaanasWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);
  const [shouldCenterWelcome, setShouldCenterWelcome] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (maanasRef.current) {
        setMaanasWidth(maanasRef.current.getBoundingClientRect().width);
      }
      if (textContainerRef.current) {
        setTextHeight(textContainerRef.current.getBoundingClientRect().height);
      }
      setShouldCenterWelcome(window.innerWidth < 480);
    };

    measure();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const getSpectralizerWidth = () => {
    return maanasWidth || 400; 
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen bg-gray-50 relative overflow-hidden"
    >
      <div className="h-16 w-full"></div>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 relative">
        <div className="flex items-end relative z-10">
          {/* Text + spectralizer */}
          <div className="relative flex flex-col text-right leading-none">
            <div
              style={{
                position: "absolute",
                bottom: "100%", 
                right: 0, 
                width: `${getSpectralizerWidth()}px`,
                height: "150px",
                transform: "translateY(10px)", 
              }}
            >
              <AudioSpectralizer audioElement={audioElement} isPlaying={isPlaying} />
            </div>

            <div ref={textContainerRef} className="flex flex-col leading-none">
              <h1
                ref={maanasRef}
                className="font-black text-gray-900 custom-font tracking-tighter"
                style={{
                  fontSize: "min(16vw, 240px)",
                  lineHeight: "1",
                  marginBottom: "-0.20em",
                }}
              >
                MAANAS
              </h1>
              <h2
                className="font-black text-gray-900 custom-font tracking-tighter"
                style={{
                  fontSize: "min(4vw, 60px)",
                  lineHeight: "1",
                  marginTop: "0",
                }}
              >
                GOPI
              </h2>
            </div>
          </div>

          {/* Profile image */}
          <div
            className="rounded-full border-4 border-gray-900 flex-shrink-0 overflow-hidden"
            style={{
              height: `${textHeight || 300}px`, 
              width: `${textHeight || 300}px`,  
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

        {/* Bottom icons - responsive positioning */}
        <div className="absolute bottom-16 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-700 uppercase tracking-wider">
            <GraduationCap className="w-3 h-3 md:w-4 md:h-4" />
            <span>Student</span>
            <span className="mx-1 md:mx-2">•</span>
            <Code className="w-3 h-3 md:w-4 md:h-4" />
            <span>Developer</span>
            <span className="mx-1 md:mx-2">•</span>
            <Music className="w-3 h-3 md:w-4 md:h-4" />
            <span>Producer</span>
          </div>
        </div>

        {/* Welcome text - conditionally positioned */}
        <div
          className={`absolute z-10 max-w-xs md:max-w-md ${
            shouldCenterWelcome
              ?
                'bottom-32 sm:bottom-24 md:bottom-10 left-1/2 transform -translate-x-1/2 text-center'
              : 
                'bottom-12 sm:bottom-10 md:bottom-6 right-4 md:right-8 text-right'
          }`}
        >
          <p className="coolvetica-font text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-800 mb-1 md:mb-2 leading-4 sm:leading-5 md:leading-6">
            Welcome!
            <br />
            <span className="text-gray-600 italic">
              I&apos;m an undergraduate student at the University of Maryland, currently studying
              computer science and finance.
            </span>
          </p>

          <div className={`coolvetica-font flex gap-2 md:gap-3 ${
            shouldCenterWelcome ? 'justify-center' : 'justify-end'
          }`}>
            <a
              href="./Maanas_Gopi_Resume.pdf"
              className="px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-xs sm:text-sm uppercase tracking-wide"
            >
              Resume
            </a>
            <a
              href="https://linkedin.com/in/maanas-gopi"
              className="px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 border border-gray-600 text-gray-900 rounded-full font-medium hover:border-gray-800 transition-colors text-xs sm:text-sm uppercase tracking-wide"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Scroll button */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-6 md:bottom-8 left-4 md:left-8 text-gray-600 hover:text-gray-900 transition-colors z-10"
        >
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;