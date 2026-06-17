import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0c0f0f] text-white pt-20 pb-10 border-t-4 border-[#ffb800]">
      {/* CONTENEDOR PRINCIPAL: Alineado al 90% general de tu ecosistema */}
      <div className="max-w-[1920px] m-auto w-[90%]">
        {/* BLOQUE SUPERIOR: REJILLA DE 4 COLUMNAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pb-20">
          {/* COLUMNA 1: LOGO, DESCRIPCIÓN E ICONOS */}
          <div className="space-y-6">
            {/* Logos agrupados */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#ffb800] flex items-center justify-center shrink-0">
                {/* Reemplaza este SVG por tu isotipo real si lo tienes en asset */}
                <span className="text-black font-black text-xl italic">B</span>
              </div>
              <span className="text-white font-black tracking-widest text-xl italic">
                BICYBLEX
              </span>
            </div>

            {/* Texto descriptivo exacto */}
            <p className="text-[#d5c4ab] text-xs md:text-[13px] leading-relaxed tracking-wide max-w-[320px]">
              Diseñamos máquinas para quienes no conocen los límites. La
              convergencia entre ingeniería mecánica de precisión y propulsión
              eléctrica de vanguardia.
            </p>

            {/* Iconos de Redes / Links */}
            <div className="flex items-center gap-5 pt-2 text-[#d5c4ab]">
              {/* Icono Compartir / Share */}
              <button className="hover:text-[#ffb800] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 10.742l4.576-2.288m0 7.092l-4.576-2.288M21 12a3 3 0 11-6 0 3 3 0 016 0zm-12 6a3 3 0 11-6 0 3 3 0 016 0zm0-12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              {/* Icono Correo */}
              <button className="hover:text-[#ffb800] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </button>
              {/* Icono Red Global / Web */}
              <button className="hover:text-[#ffb800] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* COLUMNA 2: NAVIGATION */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs text-white tracking-[0.25em] uppercase font-bold">
              NAVIGATION
            </h4>
            <ul className="space-y-4 text-[11px] md:text-xs font-mono font-bold tracking-[0.15em] text-[#d5c4ab] p-0 m-0 list-none">
              <li>
                <a href="#" className="hover:text-[#ffb800] transition-colors">
                  2024 COLLECTION
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ffb800] transition-colors">
                  KITS & MOTORS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ffb800] transition-colors">
                  CUSTOM BUILDS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ffb800] transition-colors">
                  DEALER LOCATOR
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: ENGINEERING */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs text-white tracking-[0.25em] uppercase font-bold">
              ENGINEERING
            </h4>
            <ul className="space-y-4 text-[11px] md:text-xs font-mono font-bold tracking-[0.15em] text-[#d5c4ab] p-0 m-0 list-none">
              <li>
                <a href="#" className="hover:text-[#ffb800] transition-colors">
                  WARRANTY DATA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ffb800] transition-colors">
                  INSTALL MANUALS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ffb800] transition-colors">
                  SAFETY PROTOCOLS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ffb800] transition-colors">
                  R&D LOGS
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: FIELD REPORTS (SUSCRIPCIÓN) */}
          <div className="space-y-5">
            <h4 className="font-mono text-xs text-white tracking-[0.25em] uppercase font-bold">
              FIELD REPORTS
            </h4>
            <p className="text-[#d5c4ab] text-xs leading-relaxed tracking-wide max-w-[260px]">
              Suscríbete para recibir especificaciones técnicas y lanzamientos
              de prototipos.
            </p>

            {/* Caja de Input + Botón Acoplados */}
            <div className="flex border border-[#333535]/40 max-w-[280px]">
              <input
                type="email"
                placeholder="EMAIL"
                className="bg-[#080a0a] text-xs font-mono tracking-widest px-4 py-3 text-white placeholder-gray-600 focus:outline-none w-full uppercase"
              />
              <button className="bg-[#ffb800] text-black font-mono font-black text-xs tracking-widest px-6 py-3 uppercase hover:bg-white transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* BLOQUE INFERIOR: METADATOS Y TELEMETRÍA */}
        <div className="border-t border-[#333535]/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase font-medium">
          {/* Copyright izquierdo */}
          <div>© 2024 BICYBLEX PRECISION ENGINEERING. ALL RIGHTS RESERVED.</div>

          {/* Status e Info de Compilación a la derecha */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ffb800] rounded-full animate-pulse"></span>
              <span>GLOBAL OPS: ONLINE</span>
            </div>
            <div className="text-gray-600">V2.4.1 BUILD 99</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
