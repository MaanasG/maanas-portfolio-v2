// src/components/common/CustomStyles.js
"use client";

import React from 'react';

const CustomStyles = () => {
  return (
    <style jsx global>{`
      :root {
        --almost-black: #0a0a0a;
        --off-white: #f3f2ef;
        --purple-highlight: #6c4eff;
        --blue-highlight: #00a2ff;
      }
      
      body {
        background-color: var(--almost-black);
        color: var(--off-white);
      }

      .purple-highlight {
        color: var(--purple-highlight);
      }

      .blue-highlight {
        color: var(--blue-highlight);
      }

      a {
        color: var(--blue-highlight);
        text-decoration: none;
      }

      a:hover {
        color: var(--purple-highlight);
      }
      
      /* === Font Faces === */
      @font-face {
        font-family: 'ABEAKRG';
        src: url('/fonts/ABEAKRG.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'Coolvetica';
        src: url('/fonts/Coolvetica-Rg.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      
      /* === Font Utilities === */
      .custom-font {
        font-family: 'ABEAKRG', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .coolvetica-font {
        font-family: 'Coolvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      /* === 3D Utils === */
      .perspective-1000 {
        perspective: 1000px;
      }
      
      .transform-style-preserve-3d {
        transform-style: preserve-3d;
      }
      
      .backface-hidden {
        backface-visibility: hidden;
      }
      
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
      
      /* === Marquee === */
      @keyframes marquee {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      .animate-marquee {
        animation: marquee 20s linear infinite;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .animate-marquee {
          animation-play-state: paused;
        }
      }
    `}</style>
  );
};

export default CustomStyles;
