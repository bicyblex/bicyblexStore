import React from "react";
import { IoCog, IoShieldCheckmark, IoHeadset } from "react-icons/io5";

export default function Features() {
  const points = [
    {
      title: "INGENIERÍA DE PRECISIÓN",
      desc: "Componentes mecanizados mediante CNC con tolerancias de micras. Fiabilidad absoluta en condiciones extremas.",
      icon: <IoCog className="w-10 h-10 text-[#ffb800]" />,
    },
    {
      title: "INSTALACIÓN CERTIFICADA",
      desc: "Ecosistema de soporte técnico directo. Guías de montaje interactivas para una integración perfecta.",
      icon: <IoShieldCheckmark className="w-10 h-10 text-[#ffb800]" />,
    },
    {
      title: "SOPORTE ÉLITE",
      desc: "Canal directo con nuestros ingenieros de desarrollo. Disponibilidad global para asistencia técnica 24/7.",
      icon: <IoHeadset className="w-10 h-10 text-[#ffb800]" />,
    },
  ];

  return (
    <section className="w-full bg-[#0c0f0f] py-24 text-white" id="Nosotros">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-[1920px] m-auto w-[90%] grid grid-cols-1 md:grid-cols-3 gap-8">
        {points.map((point, idx) => (
          <div
            key={idx}
            className="bg-[#080a0a]/40 border border-[#333535]/10 px-8 py-14 flex flex-col items-center text-center group hover:border-[#333535]/30 hover:bg-[#080a0a]/80 transition-all duration-300"
          >
            {/* CONTENEDOR DEL ICONO */}
            <div className="mb-8 transform group-hover:scale-105 transition-transform duration-300">
              {point.icon}
            </div>

            {/* TÍTULO OPTIMIZADO */}
            <h3 className="font-display text-lg md:text-xl font-black uppercase tracking-wide leading-[1.1] text-white max-w-[220px]">
              {point.title}
            </h3>

            {/* DESCRIPCIÓN DETALLADA */}
            <p className="font-sans text-gray-400 text-xs md:text-[13px] leading-relaxed tracking-wide mt-5 max-w-[270px]">
              {point.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
