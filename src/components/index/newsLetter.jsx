import React, { useState } from "react";

export default function NewsLetter() {
  // Simulación de los datos que vendrían de tu base de datos (Supabase)
  const slides = [
    {
      id: 1,
      tag: "NUEVO INGRESO",
      tagColor: "bg-[#ffb800] text-black",
      title: "MOTOR 30000W // ULTRA POTENCIA",
      desc: "Llegó el nuevo lote de motores electricos para bicicletas de 3000w, aprovecha y encuentrala hoy con descuento.",
      image:
        "https://image.made-in-china.com/202f0j00DMzkGhURvLco/14inch-3000W-60V-120km-H-Hub-Motor-with-Disc-Brake-for-Electric-Bike.webp",
      linkText: "PREGUNTAR POR WHATSAPP",
      linkUrl: "#",
    },
    {
      id: 2,
      tag: "PROMOCIÓN",
      tagColor: "bg-red-600 text-white",
      title: "DUO DINÁMICO // PROMOCION ÚNICA",
      desc: "15% de descuento en la compra de dos bicicletas eléctricas, aprovecha esta oferta por tiempo limitado y equipa tu garaje con lo mejor en movilidad urbana.",
      image:
        "https://thumbs.dreamstime.com/z/ejemplo-de-dos-bicicletas-68710765.jpg",
      linkText: "APLICAR DESCUENTO",
      linkUrl: "#",
    },
    {
      id: 3,
      tag: "EVENTO / COMUNIDAD",
      tagColor: "bg-blue-600 text-white",
      title: "NIGHT RADAR // LIMA NIGHT RIDE",
      desc: "Prueba de potencia en vivo y test de autonomía urbana colectiva. Punto de encuentro en base central este viernes a las 20:00.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpIih2Ry9Ss0k1YXEa_ga6sFGoI2HfmbRwqQ&s",
      linkText: "REGISTRAR ASISTENCIA",
      linkUrl: "#",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1)); // Corregido el prev - 1 que sumaba en vez de restar
  };

  return (
    <section className="w-full bg-[#0c0f0f] py-24 text-white">
      <div className="max-w-[1920px] m-auto w-[90%]">
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="flex items-end justify-between border-b border-[#333535]/20 pb-8 mb-12">
          <div>
            {/* Tag superior en font-mono con tracking amplio */}
            <span className="font-mono text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
              RADAR DE OPERACIONES
            </span>
            {/* Título de sección en font-display cambiado de tracking-tighter a tracking-normal */}
            <h2 className="font-display text-[38px] sm:text-[48px] md:text-[56px] font-black uppercase tracking-normal leading-[0.95] mt-3">
              NOTICIAS & EVENTOS
            </h2>
          </div>

          {/* CONTROLES DE NAVEGACIÓN TÉCNICOS */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="border border-[#333535]/40 p-3 hover:border-[#ffb800] hover:text-[#ffb800] transition-colors"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="border border-[#333535]/40 p-3 hover:border-[#ffb800] hover:text-[#ffb800] transition-colors"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* CONTENEDOR DEL SLIDER */}
        <div className="relative w-full h-[550px] md:h-[450px] bg-[#080a0a] border border-[#333535]/20 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full flex flex-col md:flex-row transition-opacity duration-500 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* BLOQUE IZQUIERDO: TEXTOS */}
              <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-between order-2 md:order-1 h-1/2 md:h-full bg-[#080a0a]">
                <div className="space-y-6">
                  {/* Etiqueta dinámica en font-mono con tracking expandido */}
                  <div>
                    <span
                      className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 ${slide.tagColor}`}
                    >
                      {slide.tag}
                    </span>
                  </div>

                  {/* Título cambiado de tracking-tight a tracking-wide para separar los caracteres */}
                  <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-wide leading-[1.0] text-white">
                    {slide.title}
                  </h3>

                  {/* Párrafo explicativo */}
                  <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed tracking-wide max-w-[480px]">
                    {slide.desc}
                  </p>
                </div>

                {/* Botón Call to Action */}
                <div className="pt-6 md:pt-0">
                  <a
                    href={slide.linkUrl}
                    className="font-mono inline-block border border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black text-xs font-bold uppercase tracking-[0.2em] py-4 px-8 transition-all duration-300"
                  >
                    {slide.linkText}
                  </a>
                </div>
              </div>

              {/* BLOQUE DERECHO: IMAGEN */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden order-1 md:order-2 bg-[#111414]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#080a0a] via-transparent to-transparent"></div>
              </div>
            </div>
          ))}

          {/* INDICADORES DE BARRAS DE PROGRESO DEBAJO */}
          <div className="absolute bottom-4 left-8 md:left-14 z-20 flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-[3px] transition-all duration-300 cursor-pointer ${
                  index === currentSlide
                    ? "w-12 bg-[#ffb800]"
                    : "w-4 bg-[#333535]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
