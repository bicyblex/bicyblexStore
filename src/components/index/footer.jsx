import React from "react";
import { BsInstagram, BsTiktok, BsWhatsapp } from "react-icons/bs";

export default function Footer() {
  return (
    <footer
      className="w-full bg-[#0c0f0f] text-white pt-20 pb-10 border-t-4 border-[#ffb800]"
      id="Contáctanos"
    >
      <div className="max-w-[1920px] m-auto w-[90%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pb-20">
          {/* COLUMNA 1: LOGO, DESCRIPCIÓN E ICONOS */}
          <div className="space-y-6">
            <img src="/logo.png" alt="Logo" className="w-56" />
            <p className="text-[#d5c4ab] text-xs md:text-[13px] leading-relaxed tracking-wide max-w-[320px]">
              Diseñamos máquinas para quienes no conocen los límites. La
              convergencia entre ingeniería mecánica de precisión y propulsión
              eléctrica de vanguardia.
            </p>

            <div className="flex items-center gap-5 pt-2 text-[#d5c4ab]">
              {/* Solo los iconos son enlaces */}
              <a href="mailto:contacto@tuempresa.com" className="text-xs">
                bicyblex@gmail.com
              </a>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN (Estática) */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs text-white tracking-[0.25em] uppercase font-bold">
              NAVEGACIÓN
            </h4>
            <ul className="space-y-4 text-[11px] md:text-xs font-mono font-bold tracking-[0.15em] text-[#d5c4ab] list-none">
              <li>BICICLETAS</li>
              <li>BICI MOTOS ELÉCTRICAS</li>
              <li>KITS DE CONVERSION ELECTRICOS</li>
              <li>NOSOTROS</li>
            </ul>
          </div>

          {/* COLUMNA 3: DIVERSIÓN (Estática) */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs text-white tracking-[0.25em] uppercase font-bold">
              DIVERSIÓN
            </h4>
            <ul className="space-y-4 text-[11px] md:text-xs font-mono font-bold tracking-[0.15em] text-[#d5c4ab] list-none">
              <li>GARANTÍA DE CALIDAD</li>
              <li>INSTALACIONES POR EXPERTOS</li>
              <li>PROTOCOLOS SEGUROS</li>
            </ul>
          </div>

          {/* COLUMNA 4: REDES SOCIALES */}
          <div className="space-y-5">
            <h4 className="font-mono text-xs text-white tracking-[0.25em] uppercase font-bold">
              REDES SOCIALES
            </h4>
            <p className="text-[#d5c4ab] text-xs leading-relaxed tracking-wide max-w-[260px]">
              Síguenos para conocer especificaciones técnicas y nuevos
              productos.
            </p>
            <div className="flex gap-4">
              <a href="https://tiktok.com" className="text-[#ffb800] text-2xl">
                <BsTiktok />
              </a>
              <a
                href="https://instagram.com"
                className="text-[#ffb800] text-2xl"
              >
                <BsInstagram />
              </a>
              <a
                href="https://wa.me/tu-numero"
                className="text-[#ffb800] text-2xl"
              >
                <BsWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* BLOQUE INFERIOR */}
        <div className="border-t border-[#333535]/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase font-medium">
          <div>© 2026 BICYBLEX. TODOS LOS DERECHOS RESERVADOS.</div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ffb800] rounded-full animate-pulse"></span>
              <span>
                DEVELOPED BY:
                <a href="mailto:cornejo758@gmail.com">Saul</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
