"use client";

import React from "react";
import { RadioTowerIcon } from "./Navbar";

export const FooterSection: React.FC = () => {
  return (
    <footer id="contacto" className="w-full relative overflow-hidden mt-2 sm:mt-4">
      {/* Panoramic Mountain Banner Section */}
      <div className="relative w-full h-[180px] sm:h-[250px] lg:h-[280px] overflow-hidden">
        {/* Top White Curve Merging smoothly from the white section above */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[28px] sm:h-[50px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0L1440 0L1440 20C1060 70 380 70 0 20Z"
              fill="#f8fafc"
            />
          </svg>
        </div>

        {/* Scenic Mountain Horizon of Gracias, Lempira */}
        <img
          src="/bg-gracias-lempira.jpg"
          alt="Montañas de Gracias, Lempira"
          className="w-full h-full object-cover object-[center_8%] scale-105 select-none"
          decoding="async"
        />

        {/* Cool Blue Mountain Tint Overlay to match the reference panorama */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,65,130,0.35) 0%, rgba(8,28,56,0.55) 100%)",
          }}
        />

        {/* Handwritten Calligraphy Overlay: "Gracias, Lempira - tierra hermosa, gente noble" */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center pt-1 pb-3">
          <div className="transform -rotate-3 flex flex-col items-center">
            <h3 className="font-script text-4xl sm:text-6xl lg:text-7xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] leading-none">
              Gracias, Lempira
            </h3>
            <p className="text-white font-bold text-xs sm:text-xl tracking-wide -mt-0.5 sm:-mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              tierra hermosa, gente noble
            </p>
            {/* Curved Yellow Brush Underline */}
            <svg
              viewBox="0 0 300 26"
              fill="none"
              className="w-40 sm:w-72 h-4 sm:h-5 mt-0.5 sm:mt-1"
            >
              <path
                d="M6 20C95 6 195 4 294 8"
                stroke="#facc15"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Bottom Curved Yellow & Dark Navy Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[32px] sm:h-[60px]"
            preserveAspectRatio="none"
          >
            {/* Yellow Wave Border */}
            <path
              d="M0 12C420 68 1020 68 1440 12L1440 80L0 80Z"
              fill="#facc15"
            />
            {/* Dark Navy Footer Fill */}
            <path
              d="M0 28C420 82 1020 82 1440 28L1440 80L0 80Z"
              fill="#061833"
            />
          </svg>
        </div>
      </div>

      {/* Deep Navy Footer Body */}
      <div className="w-full bg-[#061833] text-white pt-4 pb-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center divide-y divide-slate-800/80 md:divide-y-0 gap-4">
          {/* Column 1: Logo + Station Name + 95.1 FM Pill */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-start gap-3.5 sm:gap-4 pb-4 md:pb-0">
            <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-white p-1 shrink-0 shadow-lg">
              <img
                src="/logo-galaxia-hd.png"
                alt="Galaxia 21 HRNS"
                className="w-full h-full object-contain rounded-full select-none"
                decoding="async"
              />
            </div>

            <div className="flex flex-col items-start">
              <span className="font-black text-lg sm:text-2xl tracking-tight text-white leading-none">
                GALAXIA 21
              </span>
              <span className="text-xs sm:text-sm text-slate-200 font-medium mt-1">
                La Radio de Lempira
              </span>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-[#facc15] text-[#081c38] px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full font-extrabold text-xs sm:text-sm shadow-sm">
                <RadioTowerIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>95.1 FM</span>
              </div>
            </div>
          </div>

          {/* Column 2: Location Pin (Gracias, Lempira Honduras) */}
          <div className="md:col-span-4 flex items-center justify-center md:border-x border-slate-700/70 py-3.5 md:py-2 px-4 gap-3">
            <div className="text-[#facc15] shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 sm:w-8 sm:h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-xs sm:text-sm text-white">
                Gracias, Lempira
              </span>
              <span className="text-xs text-slate-300 font-normal mt-0.5">
                Honduras
              </span>
            </div>
          </div>

          {/* Column 3: Antenna Icon + "La radio que nos une" */}
          <div className="md:col-span-3 flex items-center justify-center md:justify-end gap-3 pt-3.5 md:pt-0">
            <div className="text-[#facc15] shrink-0">
              <RadioTowerIcon className="w-7 h-7 sm:w-9 sm:h-9 stroke-[2.2]" />
            </div>
            <p className="italic font-semibold text-sm sm:text-base text-white leading-tight">
              La radio que
              <br />
              nos une
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Solid Yellow Accent Bar */}
      <div className="w-full h-3 bg-[#facc15]" />
    </footer>
  );
};
