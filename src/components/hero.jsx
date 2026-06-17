import React from "react";

export default function Hero() {
  return (
    <header className="relative w-full min-h-[calc(100vh-88px)] bg-[#0c0f0f] overflow-hidden flex items-center">
      {/* 1. IMAGEN DE FONDO CON CAPA OSCURA */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradiente de izquierda a derecha para oscurecer la zona del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0f0f] via-[#0c0f0f]/70 to-transparent z-10"></div>
        {/* Gradiente de abajo hacia arriba para fusionar con la siguiente sección */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f] via-transparent to-transparent z-10"></div>
      </div>

      {/* 2. CONTENEDOR DE CONTENIDO */}
      <div className="relative z-20 max-w-[1920px] m-auto w-[90%] py-20 flex flex-col justify-center">
        {/* CONTENEDOR ESTRUCTURAL DEL TEXTO */}
        <div className="max-w-[850px] space-y-6">
          {/* Tag superior: BEST BIKE BUILDS (font-mono con espaciado amplio y caja amarilla) */}
          <div className="inline-block bg-[#ffb800] text-black px-3 py-1 text-[11px] uppercase tracking-[0.25em] font-mono font-bold">
            Best Bike Builds
          </div>

          {/* Título Principal Gigante (font-display con Bebas Neue) */}
          <h1 className="font-display text-[52px] sm:text-[72px] md:text-[96px] lg:text-[110px] text-white uppercase leading-[0.89] tracking-tighter">
            DOMINA CUALQUIER <br />
            <span className="text-[#ffb800]">TERRENO</span>
          </h1>

          {/* Bloque de descripción técnica con borde izquierdo */}
          <div className="border-l-2 border-[#ffb800] pl-6 md:pl-8 max-w-[580px]">
            <p className="font-sans text-[#d5c4ab] text-xs md:text-sm leading-relaxed tracking-wide font-medium">
              Ingeniería de precisión aplicada al ciclismo extremo. Diseñamos
              máquinas de alto rendimiento y kits de conversión eléctrica con
              estándares de grado aeroespacial.
            </p>
          </div>

          {/* Botón de Acción Principal (Letras gordas de Bebas Neue para el botón) */}
          <div className="pt-4">
            <button className="font-display bg-[#ffb800] text-black text-lg md:text-xl px-10 py-3 uppercase tracking-wider hover:bg-white transition-colors duration-200 shrink-0">
              Ver modelos
            </button>
          </div>
        </div>
      </div>

      {/* 3. DETALLE INFERIOR: SCROLL TO EXPLORE */}
      <div className="absolute bottom-8 left-[5%] z-20 hidden md:flex items-center gap-4">
        <span className="font-mono text-[#d5c4ab]/40 text-[10px] uppercase tracking-[0.3em] font-bold">
          Scroll to explore
        </span>
        <div className="w-16 h-[1px] bg-[#333535]"></div>
      </div>
    </header>
  );
}
