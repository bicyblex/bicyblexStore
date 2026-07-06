import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useGlobalData } from "@/src/context/GlobalContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiX } from "react-icons/fi";

export default function ElectricMotos() {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMoto, setSelectedMoto] = useState(null);
  const data = useGlobalData();

  useEffect(() => {
    fetchMotos();
  }, []);

  const fetchMotos = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)");
      if (error) throw error;

      const electricMotos = data.filter(
        (item) => item.categories?.name === "Bicimotos Eléctricas"
      );

      const formattedMotos = electricMotos.map((item) => ({
        id: item.id,
        tag: item.tag || "ELECTRICA",
        name: item.name,
        price: `s/${item.price}`,
        image: Array.isArray(item.image)
          ? item.image
          : [item.image].filter(Boolean),
        autonomia: item.specs?.autonomia || "N/A",
        motor: item.specs?.potencia || item.specs?.motor || "N/A",
        velocidad: item.specs?.velocidad || "N/A",
      }));

      setMotos(formattedMotos);
    } catch (error) {
      console.error("Error al cargar motos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full bg-[#0c0f0f] py-24 text-white border-t border-[#333535]/10"
      id="Motos-electricas"
    >
      <div className="max-w-[1920px] m-auto w-[90%]">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#333535]/20 pb-8 mb-16">
          <div>
            <span className="font-mono text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
              E-Mobility / Cero Emisiones
            </span>
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-black uppercase tracking-normal leading-[0.95] mt-3">
              Motos Eléctricas
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-mono">
            Cargando unidades...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {motos.map((moto) => (
              <div
                key={moto.id}
                className="bg-[#080a0a] border border-[#333535]/20 flex flex-col justify-between group"
              >
                {/* IMAGEN CON HOVER Y MODAL */}
                <div className="relative w-full h-[260px] bg-[#111414] overflow-hidden group">
                  <img
                    src={moto.image?.[0]}
                    alt={moto.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="font-mono absolute top-4 left-4 bg-[#ffb800] text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1">
                    {moto.tag}
                  </div>

                  <div
                    onClick={() => setSelectedMoto(moto)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10"
                  >
                    <button className="bg-[#ffb800] px-6 py-3 text-black font-bold text-xs uppercase hover:bg-white transition-colors pointer-events-none">
                      VER MÁS (+)
                    </button>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase tracking-wide flex items-baseline gap-x-2">
                      <span className="text-white">{moto.name}</span>
                      <span className="text-[#ffb800]">{moto.price}</span>
                    </h3>

                    <div className="mt-8 grid grid-cols-3 gap-2 border-t border-b border-[#333535]/20 py-4 font-mono">
                      <div className="text-center">
                        <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-[0.15em]">
                          Autonomía
                        </span>
                        <span className="block text-sm font-bold text-[#d5c4ab] mt-1">
                          {moto.autonomia}
                        </span>
                      </div>
                      <div className="text-center border-l border-r border-[#333535]/20">
                        <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-[0.15em]">
                          Motor
                        </span>
                        <span className="block text-[11px] font-bold text-[#d5c4ab] mt-1 leading-tight">
                          {moto.motor}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-[0.15em]">
                          Vel. Max
                        </span>
                        <span className="block text-sm font-bold text-[#d5c4ab] mt-1">
                          {moto.velocidad}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href={`${
                        data.productWhatsAppMessageUrl
                      }+${encodeURIComponent(moto.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center font-mono w-full bg-transparent border border-[#ffb800] text-[#ffb800] group-hover:bg-[#ffb800] group-hover:text-black font-bold text-xs uppercase tracking-[0.2em] py-4 transition-all duration-300"
                    >
                      Ordenar Ahora
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL SWIPER */}
      {selectedMoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#080a0a] border border-[#333535] w-full max-w-[600px] p-8 relative">
            <button
              onClick={() => setSelectedMoto(null)}
              className="cursor-pointer absolute top-4 right-4 z-10 text-white hover:text-[#ffb800]"
            >
              <FiX size={24} />
            </button>
            <h3 className="font-mono text-xl font-bold uppercase mb-6">
              {selectedMoto.name}
            </h3>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="w-full h-[350px]"
            >
              {selectedMoto.image?.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={selectedMoto.name}
                    className="w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
}
