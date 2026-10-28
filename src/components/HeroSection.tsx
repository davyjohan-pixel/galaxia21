"use client";

import React from "react";
import { RadioTowerIcon } from "./Navbar";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-[#061833]"
    >
      {/* High-Resolution Aerial Photo of Gracias, Lempira (Uncompressed native img) */}
      <div className="relative w-full min-h-[340px] sm:min-h-[480px] lg:min-h-[540px] flex items-center">
        <img
          src="/hero-gracias-lempira.jpg"
          alt="Vista aérea de Gracias, Lempira - Radio Galaxia 21 95.1 FM"
          className="absolute inset-0 w-full h-full object-cover object-[62%_35%] sm:object-[center_35%] select-none"
          decoding="async"
          fetchPriority="high"
        />

        {/* Left Dark Navy Gradient Overlay for crisp text contrast on mobile & desktop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,24,51,0.92) 0%, rgba(6,24,51,0.76) 42%, rgba(6,24,51,0.22) 72%, rgba(6,24,51,0.0) 100%)",
          }}
        />
        {/* Subtle top sky gradient */}
        <div
          className="absolute inset-x-0 top-0 h-20 sm:h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,52,110,0.45) 0%, rgba(12,52,110,0) 100%)",
          }}
        />

        {/* Hero Typography Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-7 pb-14 sm:pt-10 sm:pb-24">
          <div className="max-w-xl">
            {/* Top Yellow Accent Bar */}
            <div className="w-10 sm:w-14 h-1 sm:h-1.5 bg-[#facc15] rounded-full mb-2.5 sm:mb-4 shadow-sm" />

            {/* Main Heading: GALAXIA 21 */}
            <h1 className="text-3xl sm:text-6xl lg:text-[64px] font-black uppercase tracking-tight leading-none text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
              GALAXIA <span className="text-[#facc15]">21</span>
            </h1>

            {/* 95.1 FM Yellow Pill */}
            <div className="mt-2.5 sm:mt-4 inline-flex items-center gap-2 sm:gap-2.5 bg-[#facc15] text-[#081c38] px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full shadow-lg">
              <RadioTowerIcon className="w-4 h-4 sm:w-7 sm:h-7 stroke-[2.4]" />
              <span className="text-lg sm:text-3xl font-black tracking-tight leading-none">
                95.1 FM
              </span>
            </div>

            {/* Subtitle: La Radio de Lempira */}
            <h2 className="mt-2.5 sm:mt-4 text-lg sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
              La Radio de Lempira
            </h2>

            {/* Italic Tagline + Curved Yellow Brush Underline */}
            <div className="mt-2 sm:mt-3 inline-block">
              <p className="italic font-medium text-white/95 text-sm sm:text-xl leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] -rotate-1">
                Música, información y la
                <br />
                mejor compañía, siempre.
              </p>
              {/* Curved Yellow Brush Stroke */}
              <svg
                viewBox="0 0 260 22"
                fill="none"
                className="w-36 sm:w-60 h-3 sm:h-4 mt-1"
              >
                <path
                  d="M4 17C68 5 152 3 256 7"
                  stroke="#facc15"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Curved Wave Divider (Yellow Rim + Light Page Background) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
          <svg
            viewBox="0 0 1440 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[38px] sm:h-[80px] lg:h-[95px] preserve-3d"
            preserveAspectRatio="none"
          >
            {/* Yellow Wave Rim */}
            <path
              d="M0 18C340 92 1100 92 1440 18L1440 110L0 110Z"
              fill="#facc15"
            />
            {/* White/Light Wave Body */}
            <path
              d="M0 34C340 106 1100 106 1440 34L1440 110L0 110Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};
