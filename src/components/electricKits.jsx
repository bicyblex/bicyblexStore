import React from "react";

export default function Kits() {
  // Array con los 3 kits disponibles de tu catálogo
  const kits = [
    {
      id: "01",
      category: "URBANO",
      name: "350W ELITE",
      desc: "Optimizado para la jungla de asfalto. Entrega de torque suave y batería discreta.",
      price: "$450 USD",
      progress: "w-[40%]", // Nivel de potencia/batería visual
      icon: (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: "02",
      category: "EXPLORADOR",
      name: "500W TERRA",
      desc: "El estándar de oro para XC. Balance perfecto entre peso suspendido y autonomía.",
      price: "$680 USD",
      progress: "w-[65%]",
      icon: (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
      ),
    },
    {
      id: "03",
      category: "PRO",
      name: "1000W APEX",
      desc: "Ingeniería pura para Enduro. Sensor de torque ultra sensible para ascensos técnicos.",
      price: "$920 USD",
      progress: "w-[85%]",
      icon: (
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="w-full bg-[#0c0f0f] py-24 text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 50%, rgba(255,184,0,0.03) 0%, transparent 50%)",
      }}
    >
      {/* CONTENEDOR PRINCIPAL: Alineado perfectamente con w-[90%] */}
      <div className="max-w-[1920px] m-auto w-[90%] grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* BLOQUE IZQUIERDO: Título y Presentación */}
        <div className="space-y-6">
          <div>
            <span className="text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
              Modular Power Kits
            </span>
            <h2 className="text-[44px] sm:text-[56px] font-black uppercase tracking-tighter leading-[0.9] mt-2">
              Transforma <br /> tu ruta
            </h2>
          </div>
          <p className="text-[#d5c4ab] text-sm leading-relaxed tracking-wide max-w-[380px]">
            Nuestros kits de conversión de alta potencia están diseñados con
            arquitectura modular para una integración limpia. Potencia bruta sin
            comprometer la estética de tu build.
          </p>
          <div className="pt-4 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-[#333535]"></div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">
              Select Voltage Range
            </span>
          </div>
        </div>

        {/* REJILLA DERECHA (2x2): Ocupa 2 de las 3 columnas del contenedor principal */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Mapeo de los 3 Kits Reales */}
          {kits.map((kit) => (
            <div
              key={kit.id}
              className="bg-[#121414]/90 border border-[#333535]/30 p-8 flex flex-col justify-between h-[280px] relative group hover:border-[#ffb800]/50 transition-colors duration-300"
            >
              <div>
                {/* Header de la tarjeta */}
                <div className="flex justify-between items-center font-mono">
                  <span className="text-[11px] text-[#ffb800] tracking-widest font-bold">
                    {kit.id} <span className="text-gray-600 mx-1">/</span>{" "}
                    {kit.category}
                  </span>
                  {kit.icon}
                </div>

                {/* Nombre y descripción */}
                <h3 className="text-2xl font-black uppercase tracking-tight mt-4 text-white font-sans">
                  {kit.name}
                </h3>
                <p className="text-gray-400 text-xs mt-3 leading-relaxed tracking-wide font-sans max-w-[290px]">
                  {kit.desc}
                </p>
              </div>

              {/* Barra de progreso y footer de la tarjeta */}
              <div className="space-y-4">
                <div className="w-full h-[2px] bg-[#222424]">
                  <div className={`h-full ${kit.progress} bg-[#ffb800]`}></div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-black text-lg tracking-tight font-sans text-white">
                    {kit.price}
                  </span>
                  <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffb800] flex items-center gap-2 hover:text-white transition-colors">
                    Specs <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* CUARTO ESPACIO: Bloque "Custom / Custom Build" Llamativo */}
          <div
            className="border border-[#ffb800] p-8 flex flex-col justify-between h-[280px] relative overflow-hidden bg-gradient-to-br from-[#161919] to-[#0c0f0f] group"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #111414 0px, #111414 2px, transparent 2px, transparent 10px)`,
            }}
          >
            {/* Efecto de luz amarilla en la esquina */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#ffb800]/10 rounded-full blur-2xl"></div>

            <div>
              <div className="font-mono text-[11px] text-[#ffb800] tracking-widest font-bold">
                04 <span className="text-gray-600 mx-1">/</span> CUSTOM SYSTEM
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mt-4 text-white">
                ¿Buscas más <br />{" "}
                <span className="text-[#ffb800]">potencia?</span>
              </h3>
              <p className="text-gray-400 text-xs mt-3 leading-relaxed tracking-wide max-w-[260px]">
                Configuramos sistemas de voltaje personalizados y bobinados de
                motor a medida para proyectos de alta competición.
              </p>
            </div>

            <div className="pt-4">
              <button className="w-full bg-[#ffb800] text-black hover:bg-white transition-colors text-[10px] font-black uppercase tracking-[0.2em] py-3 text-center">
                Consultar con Ingeniero
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
