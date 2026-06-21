import React from "react";

export default function Hero() {
  return (
    <header className="relative w-full min-h-[calc(100vh-88px)] bg-[#0c0f0f] overflow-hidden flex items-center">
      {/* 1. IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradientes: Ajustados para móvil (más oscuros) y escritorio */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0f0f] via-[#0c0f0f]/80 to-[#0c0f0f]/20 md:to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f] via-transparent to-transparent z-10"></div>
      </div>

      {/* 2. CONTENEDOR DE CONTENIDO */}
      <div className="relative z-20 max-w-[1920px] m-auto w-[90%] py-10 md:py-20 flex flex-col justify-center">
        <div className="max-w-[850px] space-y-4 md:space-y-6">
          {/* Badge */}
          <div className="inline-block bg-[#ffb800] text-black px-3 py-1 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-mono font-bold">
            Aventura sin límites
          </div>

          {/* Título Principal: Ajustado con leading más cerrado en móvil */}
          <h1 className="font-display text-[42px] sm:text-[64px] md:text-[96px] lg:text-[110px] text-white uppercase leading-[0.85] tracking-tighter">
            DOMINA CUALQUIER <br />
            <span className="text-[#ffb800]">TERRENO</span>
          </h1>

          {/* Bloque de descripción */}
          <div className="border-l-2 border-[#ffb800] pl-5 md:pl-8 max-w-[500px]">
            <p className="font-sans text-[#d5c4ab] text-sm md:text-base leading-relaxed tracking-wide font-medium">
              Transforma tus traslados diarios en la parte favorita de tu día.
              Bicicletas urbanas diseñadas para la eficiencia, el estilo y la
              comodidad en la jungla de asfalto.
            </p>
          </div>

          {/* Botón */}
          <div className="pt-2 md:pt-4">
            <a
              href="#Bicicletas"
              className="font-display bg-[#ffb800] text-black text-md md:text-xl px-8 py-3 md:px-10 md:py-3 uppercase tracking-wider hover:bg-white transition-colors duration-200"
            >
              Ver modelos
            </a>
          </div>
        </div>
      </div>

      {/* 3. DETALLE INFERIOR: Solo visible en tablets y desktop */}
      <div className="absolute bottom-8 left-[5%] z-20 hidden md:flex items-center gap-4">
        <span className="font-mono text-[#d5c4ab]/40 text-[10px] uppercase tracking-[0.3em] font-bold">
          Desliza para ver contenido
        </span>
        <div className="w-16 h-[1px] bg-[#333535]"></div>
      </div>
    </header>
  );
}
