import React from "react";

export default function TopNav() {
  const navLinks = [
    { name: "Bicicletas", href: "#" },
    { name: "Motos", href: "#" },
    { name: "Kits", href: "#" },
    { name: "Nosotros", href: "#" }, // Cambiado a "Nosotros" para calcar exactamente tu diseño de imagen
    { name: "Contáctanos", href: "#" },
  ];

  return (
    <nav className="w-full bg-[#0c0f0f] border-b border-[#333535]/40 sticky top-0 z-50">
      <div className="max-w-[1920px] m-auto w-[90%] h-[88px] flex items-center justify-between">
        {/* BLOQUE IZQUIERDO: Logos */}
        <div className="flex items-center gap-5">
          {/* Isotipo: Escudo Amarillo */}
          <div className="w-[45px] h-[45px] bg-[#ffb800] flex items-center justify-center shrink-0">
            <span className="text-black font-black text-xl font-display">
              B
            </span>
          </div>

          {/* Logotipo: Texto BICYBLEX utilizando font-display */}
          <div className="h-[32px] flex items-center">
            <span className="text-[#ffb800] font-black tracking-widest text-xl italic font-display">
              BICYBLEX
            </span>
          </div>
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
            className="font-mono text-[#d5c4ab] hover:text-[#ffb800] font-bold tracking-[0.2em] text-xs uppercase transition-colors"
          >
            Whatsapp
          </a>
        </div>
      </div>
    </nav>
  );
}
