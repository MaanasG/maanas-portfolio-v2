import React from "react";
import { Code, Music, ChevronDown, GraduationCap } from "lucide-react";

const HeroSection = ({ heroRef, scrollToSection }) => (
  <section
    id="home"
    ref={heroRef}
    className="min-h-screen bg-gray-50 relative overflow-hidden"
  >
    {/* Navigation Space */}
    <div className="h-16 w-full"></div>

    {/* Main Content */}
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-2">
      {/* Name + Circle Block */}
      <div className="flex items-end">
        {/* Names stacked + right aligned + perfectly flush */}
        <div className="flex flex-col text-right leading-none">
          <h1
            className="font-black text-gray-900 custom-font tracking-tighter"
            style={{
              fontSize: "min(16vw, 240px)",
              lineHeight: "1",
              marginBottom: "-0.20em", // tighter overlap, no space left
            }}
          >
            MAANAS
          </h1>
          <h2
            className="font-black text-gray-900 custom-font tracking-tighter"
            style={{
              fontSize: "min(4vw, 60px)",
              lineHeight: "1",
              marginTop: "0", // ensure no top margin at all
            }}
          >
            GOPI
          </h2>
        </div>

        {/* Circle — shrunk to match the new combined text height */}
        <div
          className="rounded-full border-4 border-gray-900 flex-shrink-0 overflow-hidden"
          style={{
            height: "calc(min(16vw, 240px) + min(4vw, 60px) - 1.75em)",
            width: "calc(min(16vw, 240px) + min(4vw, 60px) - 1.75em)",
            marginLeft: "-0.15em",
          }}
>
          <img
            src="/logos/face.jpg" // replace with your image path
            alt="Profile"
            className="w-full h-full object-cover overflow-hidden"
          />
          </div>
      </div>

      {/* Role indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 text-sm text-gray-700 uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Student</span>
          <span className="mx-2">•</span>
          <Code className="w-4 h-4" />
          <span>Developer</span>
          <span className="mx-2">•</span>
          <Music className="w-4 h-4" />
          <span>Producer</span>
        </div>
      </div>

      {/* Bottom Right Blurb + Buttons */}
      <div className="absolute bottom-10 right-8 max-w-md text-right">
        <p className="coolvetica-font text-base md:text-lg text-gray-800 mb-2 leading-6">
          Welcome! 
          <br />
          <span className="text-gray-600 italic">
            I'm an undergraduate student at the University of Maryland, currently studying computer science and finance.
          </span>
        </p>

        <div className="coolvetica-font flex gap-3 justify-end">
          <a
            href="#"
            className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-sm uppercase tracking-wide"
          >
            Resume
          </a>
          <a
            href="https://linkedin.com/in/maanas-gopi"
            className="px-6 py-2 border border-gray-600 text-gray-900 rounded-full font-medium hover:border-gray-800 transition-colors text-sm uppercase tracking-wide"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-8 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </div>
  </section>
);

export default HeroSection;
