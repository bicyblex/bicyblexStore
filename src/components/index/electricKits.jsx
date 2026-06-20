import React from "react";
import { IoFlash, IoLocate, IoBuild } from "react-icons/io5";

export default function Kits() {
  const kits = [
    {
      id: "01",
      category: "URBANO",
      name: "350W ELITE",
      desc: "Optimizado para la jungla de asfalto. Entrega de torque suave y batería discreta.",
      price: "$450 USD",
      progress: "w-[40%]",
      icon: <IoFlash className="w-4 h-4 text-gray-500" />,
    },
    {
      id: "02",
      category: "EXPLORADOR",
      name: "500W TERRA",
      desc: "El estándar de oro para XC. Balance perfecto entre peso suspendido y autonomía.",
      price: "$680 USD",
      progress: "w-[65%]",
      icon: <IoLocate className="w-4 h-4 text-gray-500" />,
    },
    {
      id: "03",
      category: "PRO",
      name: "1000W APEX",
      desc: "Ingeniería pura para Enduro. Sensor de torque ultra sensible para ascensos técnicos.",
      price: "$920 USD",
      progress: "w-[85%]",
      icon: <IoFlash className="w-4 h-4 text-gray-500" />,
    },
  ];

  return (
    <section
      className="w-full bg-[#0c0f0f] py-24 text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 50%, rgba(255,184,0,0.03) 0%, transparent 50%)",
      }}
      id="Kits-electricos"
    >
      <div className="max-w-[1920px] m-auto w-[90%] grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="space-y-6">
          <div>
            <span className="font-mono text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
              Modular Power Kits
            </span>
            <h2 className="font-display text-[44px] sm:text-[56px] font-black uppercase tracking-normal leading-[0.95] mt-3">
              Transforma <br /> tu ruta
            </h2>
          </div>
          <p className="font-sans text-[#d5c4ab] text-sm leading-relaxed tracking-wide max-w-[380px]">
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

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {kits.map((kit) => (
            <div
              key={kit.id}
              className="bg-[#121414]/90 border border-[#333535]/30 p-8 flex flex-col justify-between h-[280px] relative group hover:border-[#ffb800]/50 transition-colors duration-300"
            >
              <div>
                <div className="flex justify-between items-center font-mono">
                  <span className="text-[11px] text-[#ffb800] tracking-[0.2em] font-bold">
                    {kit.id} <span className="text-gray-600 mx-1">/</span>{" "}
                    {kit.category}
                  </span>
                  {kit.icon}
                </div>

                <h3 className="font-display text-2xl font-black uppercase tracking-wide leading-[1.0] mt-5 text-white">
                  {kit.name}
                </h3>
                <p className="font-sans text-gray-400 text-xs mt-3 leading-relaxed tracking-wide max-w-[290px]">
                  {kit.desc}
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-full h-[2px] bg-[#222424]">
                  <div className={`h-full ${kit.progress} bg-[#ffb800]`}></div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-display text-xl font-black tracking-wide text-white">
                    {kit.price}
                  </span>
                  <a
                    href="#"
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffb800] flex items-center gap-2 hover:text-white transition-colors"
                  >
                    QUIERO ESTE <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* CUARTA TARJETA: "CUSTOM SYSTEM" MEJORADA */}
          <div
            className="border border-[#ffb800] p-8 flex flex-col justify-between h-[280px] relative overflow-hidden bg-[#0c0f0f] group"
            style={{
              backgroundImage: `linear-gradient(rgba(255,184,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.05) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          >
            {/* Gradiente de fondo sutil para dar profundidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#ffb800]/10 to-transparent"></div>

            <div className="relative z-10">
              <div className="font-mono text-[11px] text-[#ffb800] tracking-[0.2em] font-bold flex items-center gap-2">
                <IoBuild className="text-[#ffb800]" /> 04{" "}
                <span className="text-gray-600">/</span> CUSTOM SYSTEM
              </div>

              <h3 className="font-display text-2xl font-black uppercase tracking-wide leading-[1.0] mt-5 text-white">
                ¿PROYECTO <br />{" "}
                <span className="text-[#ffb800]">A MEDIDA?</span>
              </h3>

              <p className="font-sans text-gray-400 text-xs mt-3 leading-relaxed tracking-wide">
                Ingeniería de bobinados y sistemas de potencia de alto voltaje
                para competición extrema.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <a
                href=""
                className="flex justify-center font-mono w-full bg-[#ffb800] text-black font-black text-[10px] uppercase tracking-[0.2em] py-4 text-center hover:bg-white transition-all duration-300 transform group-hover:scale-[1.02]"
              >
                Hablar con un Ingeniero
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
