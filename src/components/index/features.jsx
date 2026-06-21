import React from "react";
import { IoHeart, IoShieldCheckmark, IoPeople } from "react-icons/io5";

export default function Features() {
  const points = [
    {
      title: "CALIDAD QUE SE SIENTE",
      desc: "No solo vendemos tecnología, entregamos pasión. Cada componente es seleccionado y probado minuciosamente para garantizarte una experiencia superior y duradera.",
      icon: <IoHeart className="w-10 h-10 text-[#ffb800]" />,
    },
    {
      title: "CONFIANZA TOTAL",
      desc: "Tu tranquilidad es nuestra prioridad. Te acompañamos en cada etapa, asegurando que tu elección sea la correcta y que tu inversión esté siempre protegida.",
      icon: <IoShieldCheckmark className="w-10 h-10 text-[#ffb800]" />,
    },
    {
      title: "TRATO CERCANO Y AMABLE",
      desc: "Aquí no eres un número, eres parte de nuestra comunidad. Estamos siempre listos para escucharte, asesorarte y ayudarte con una sonrisa en cada paso.",
      icon: <IoPeople className="w-10 h-10 text-[#ffb800]" />,
    },
  ];

  return (
    <section className="w-full bg-[#0c0f0f] py-24 text-white" id="Nosotros">
      <div className="max-w-[1920px] m-auto w-[90%] grid grid-cols-1 md:grid-cols-3 gap-8">
        {points.map((point, idx) => (
          <div
            key={idx}
            className="bg-[#080a0a]/40 border border-[#333535]/10 px-8 py-14 flex flex-col items-center text-center group hover:border-[#ffb800]/20 hover:bg-[#080a0a]/80 transition-all duration-300"
          >
            {/* CONTENEDOR DEL ICONO */}
            <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300">
              {point.icon}
            </div>

            {/* TÍTULO */}
            <h3 className="font-display text-lg md:text-xl font-black uppercase tracking-wide leading-[1.1] text-white">
              {point.title}
            </h3>

            {/* LÍNEA DE SEPARACIÓN SUTIL */}
            <div className="w-12 h-[1px] bg-[#333535] my-6"></div>

            {/* DESCRIPCIÓN */}
            <p className="font-sans text-gray-400 text-xs md:text-[13px] leading-relaxed tracking-wide max-w-[270px]">
              {point.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
