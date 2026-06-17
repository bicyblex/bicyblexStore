import React from "react";

export default function Features() {
  const points = [
    {
      title: "PRECISION ENGINEERING",
      desc: "Componentes mecanizados mediante CNC con tolerancias de micras. Fiabilidad absoluta en condiciones extremas.",
      icon: (
        <svg
          className="w-10 h-10 text-[#ffb800]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {/* Icono de Brazo Robótico / Maquinaria CNC */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 22V11m6 11V11"
          />
        </svg>
      ),
    },
    {
      title: "INSTALACIÓN CERTIFICADA",
      desc: "Ecosistema de soporte técnico directo. Guías de montaje interactivas para una integración perfecta.",
      icon: (
        <svg
          className="w-10 h-10 text-[#ffb800]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {/* Icono de Sello de Garantía / Certificación */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      title: "ELITE SUPPORT",
      desc: "Canal directo con nuestros ingenieros de desarrollo. Disponibilidad global para asistencia técnica 24/7.",
      icon: (
        <svg
          className="w-10 h-10 text-[#ffb800]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {/* Icono de Agente / Soporte con Auriculares */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M5.636 5.636l3.536 3.536m0 5.656l-3.536 3.536M12 21a9 9 0 100-18 9 9 0 000 18zm0-6a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#0c0f0f] py-24 text-white">
      {/* CONTENEDOR PRINCIPAL: Alineado al 90% general de toda la web */}
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

            {/* TÍTULO EN MAYÚSCULAS COMPACTO */}
            <h3 className="text-[22px] font-black uppercase tracking-tighter leading-none text-white font-sans">
              {point.title.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h3>

            {/* DESCRIPCIÓN DETALLADA */}
            <p className="text-gray-400 text-xs md:text-[13px] leading-relaxed tracking-wide mt-6 max-w-[270px]">
              {point.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
