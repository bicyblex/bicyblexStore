import React, { useState } from "react";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import { useGlobalData } from "@/src/context/GlobalContext";
export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const data = useGlobalData();
  const navLinks = [
    { name: "Bicicletas", href: "#Bicicletas" },
    { name: "Motos", href: "#Motos-electricas" },
    { name: "Kits", href: "#Kits-electricos" },
    { name: "Nosotros", href: "#Nosotros" },
    { name: "Contáctanos", href: "#Contáctanos" },
  ];

  return (
    <nav className="w-full bg-[#0c0f0f] border-b border-[#333535]/40 sticky top-0 z-50">
      <div className="max-w-[1920px] m-auto w-[90%] h-[88px] flex items-center justify-between">
        {/* LOGO */}
        <a href="#" className="flex items-center shrink-0">
          <img src="/logo.png" alt="Logo" className="w-32 lg:w-52 h-auto" />
        </a>

        {/* MENÚ DESKTOP */}
        <div className="hidden lg:flex items-center h-full">
          <ul className="flex items-center h-full">
            {navLinks.map((link) => (
              <li key={link.name} className="h-full flex items-center">
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

        {/* BOTÓN WHATSAPP Y HAMBURGUESA */}
        <div className="flex items-center h-full gap-4">
          <a
            href={`${data.defaultWhatsAppMessageUrl}`}
            target="_blank"
            className="flex items-center gap-2 font-mono text-[#d5c4ab] hover:text-[#ffb800] font-bold tracking-[0.2em] text-xs uppercase transition-colors border-l border-[#333535]/30 pl-4 lg:pl-10"
          >
            <span className="text-2xl lg:text-4xl">
              <FaWhatsapp />
            </span>
            <span className="hidden sm:inline">Whatsapp</span>
          </a>

          {/* BOTÓN HAMBURGUESA */}
          <button
            className="lg:hidden text-[#d5c4ab] text-2xl ml-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE */}
      {isOpen && (
        <div className="lg:hidden bg-[#0c0f0f] border-b border-[#333535]/40 absolute w-full left-0">
          <ul className="flex flex-col items-center py-5 gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="font-mono text-[#d5c4ab] hover:text-[#ffb800] font-bold tracking-[0.2em] text-sm uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
