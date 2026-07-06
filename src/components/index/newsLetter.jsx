import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useGlobalData } from "@/src/context/GlobalContext";

export default function NewsLetter() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const data = useGlobalData();
  // 1. Carga de datos desde Supabase
  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error al cargar noticias:", error);
      } else {
        setSlides(data || []);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  // 2. Lógica de Autoplay
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 segundos de intervalo

    return () => clearInterval(interval);
  }, [slides]);

  if (loading)
    return (
      <div className="text-white text-center py-20 font-mono">
        INICIALIZANDO NOTICIAS...
      </div>
    );
  if (slides.length === 0) return null;

  return (
    <section className="w-full bg-[#0c0f0f] py-16 md:py-24 text-white">
      <div className="max-w-[1920px] m-auto w-[90%]">
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#333535]/20 pb-8 mb-10 gap-6">
          <div>
            <span className="font-mono text-[#ffb800] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
              NOTICIAS RECIENTES
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-normal leading-[0.95] mt-3">
              NOTICIAS & EVENTOS
            </h2>
          </div>

          {/* CONTROLES MANUALES */}
          <div className="flex gap-2">
            {["prev", "next"].map((dir, i) => (
              <button
                key={i}
                onClick={() =>
                  setCurrentSlide((prev) =>
                    dir === "prev"
                      ? prev === 0
                        ? slides.length - 1
                        : prev - 1
                      : prev === slides.length - 1
                      ? 0
                      : prev + 1
                  )
                }
                className="cursor-pointer border border-[#333535] p-3 hover:border-[#ffb800] hover:text-[#ffb800] transition-colors"
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
                    d={dir === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* SLIDER CONTAINER */}
        <div className="relative w-full h-[600px] md:h-[450px] bg-[#080a0a] border border-[#333535] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full flex flex-col md:flex-row transition-opacity duration-1000 ${
                index === currentSlide
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* TEXTO */}
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center gap-4 md:gap-6 order-2 md:order-1">
                <span className="font-mono text-[#ffb800] text-[10px] font-bold uppercase tracking-[0.2em]">
                  {new Date(slide.published_at).toLocaleDateString()} //{" "}
                  {slide.author}
                </span>
                <h3 className="font-display text-2xl md:text-4xl font-black uppercase text-white leading-tight">
                  {slide.title}
                </h3>
                <p className="font-sans text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3">
                  {slide.excerpt}
                </p>
                <a
                  href={`${
                    data.newsLetterWhatsAppMessageUrl
                  }+${encodeURIComponent(slide.title)}`}
                  className="font-mono inline-block border border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black text-xs font-bold uppercase tracking-[0.2em] py-3 px-6 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PREGUNTAR POR WHATSAPP →
                </a>
              </div>

              {/* IMAGEN */}
              <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden order-1 md:order-2">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#080a0a] via-transparent to-transparent"></div>
              </div>
            </div>
          ))}

          {/* INDICADORES DE PROGRESO */}
          <div className="absolute bottom-6 left-6 md:left-12 z-20 flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-[3px] transition-all duration-500 ${
                  index === currentSlide
                    ? "w-10 bg-[#ffb800]"
                    : "w-6 bg-[#333535]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
