"use client";

import React from "react";

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* About Card */}
        <div className="flex-1 relative rounded-2xl overflow-hidden bg-white shadow-xl min-h-[400px] flex">
          
          {/* Background Image Container (Right side only) */}
          <div 
            className="absolute inset-y-0 right-0 w-full md:w-[65%] h-full pointer-events-none"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)"
            }}
          >
             <img 
               src="/about-bg.jpg" 
               alt="Gracias, Lempira"
               className="w-full h-full object-cover object-[75%_center]" 
               decoding="async"
             />
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 w-full md:w-[60%] h-full flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] uppercase mb-4 sm:mb-6 tracking-tight drop-shadow-sm">
              ¿Quiénes Somos?
            </h2>
            
            <div className="text-[#334155] font-medium text-sm sm:text-base leading-relaxed">
              <p>
                Con más de 30 años de trayectoria ininterrumpida, Radio Galaxia 21 es la emisora referente del departamento de Lempira. A través de la frecuencia 95.1 FM, hemos consolidado un espacio de comunicación que trasciende el entretenimiento para convertirse en un verdadero pilar institucional y social de nuestra comunidad.
              </p>
            </div>
          </div>
        </div>

        {/* Síguenos Card */}
        <div className="w-full lg:w-[340px] shrink-0 rounded-2xl bg-[#0f141e] shadow-2xl p-8 flex flex-col justify-center border border-slate-800/60">
           
           {/* Custom Antenna Icon matching mockup */}
           <div className="mb-5">
             <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M12 2v20" />
               <path d="M4 10a11 11 0 0 1 16 0" />
               <path d="M7 13a7.5 7.5 0 0 1 10 0" />
               <circle cx="12" cy="7" r="1.5" fill="#eab308" />
             </svg>
           </div>
           
           <h3 className="text-2xl font-black text-white uppercase tracking-wide mb-3">
             Síguenos
           </h3>
           <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
             No te pierdas de nada, síguenos en nuestras redes sociales.
           </p>
           
           <div className="flex items-center gap-4">
             {/* Facebook */}
             <a href="#" className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:-translate-y-1 transition-transform shadow-lg">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
             </a>
             
             {/* Instagram */}
             <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#C13584] flex items-center justify-center text-white hover:-translate-y-1 transition-transform shadow-lg">
                <svg className="w-5 h-5 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
             </a>

             {/* YouTube */}
             <a href="#" className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:-translate-y-1 transition-transform shadow-lg">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.498-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
             </a>

             {/* WhatsApp */}
             <a href="#" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:-translate-y-1 transition-transform shadow-lg">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
             </a>
           </div>

        </div>

      </div>
    </section>
  );
};
