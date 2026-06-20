import React from "react";
import { FaWhatsapp } from "react-icons/fa";
export default function TopNav() {
  const navLinks = [
    { name: "Bicicletas", href: "#Bicicletas" },
    { name: "Motos", href: "#Motos-electricas" },
    { name: "Kits", href: "#Kits-electricos" },
    { name: "Nosotros", href: "#Nosotros" }, // Cambiado a "Nosotros" para calcar exactamente tu diseño de imagen
    { name: "Contáctanos", href: "#Contáctanos" },
  ];

  return (
    <nav className="w-full bg-[#0c0f0f] border-b border-[#333535]/40 sticky top-0 z-50">
      <div className="max-w-[1920px] m-auto w-[90%] h-[88px] flex items-center justify-between">
        {/* BLOQUE IZQUIERDO: Logos */}
        <div className="flex items-center gap-5">
          {/* Isotipo: Escudo Amarillo */}
          <a href="#" className=" flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Isotipo" className="w-52 h-auto" />
          </a>
        </div>

        {/* BLOQUE CENTRAL: Menú utilizando la tipografía font-mono de telemetría */}
        <div className="hidden lg:flex items-center h-full">
          <ul className="flex items-center h-full m-0 p-0 list-none">
            {navLinks.map((link, index) => (
              <li key={index} className="h-full flex items-center">
                <a
                  href={link.href}
                  className="font-mono text-[#d5c4ab] px-5 hover:text-[#ffb800] font-bold tracking-[0.2em] text-xs uppercase transition-colors h-full flex items-center border-b-2 border-transparent hover:border-[#ffb800]"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* BLOQUE DERECHO: Whatsapp con font-mono, todo en mayúsculas sostenidas */}
        <div className="flex items-center h-full border-l border-[#333535]/30 pl-8 lg:pl-10">
          <a
            href="#"
            className="flex items-center  gap-2 font-mono text-[#d5c4ab] hover:text-[#ffb800] font-bold tracking-[0.2em] text-xs uppercase transition-colors"
          >
            <p className="text-4xl">
              <FaWhatsapp />
            </p>
            Whatsapp
          </a>
        </div>
      </div>
    </nav>
  );
}
