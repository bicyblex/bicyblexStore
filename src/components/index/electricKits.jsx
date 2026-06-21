import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { IoFlash, IoBuild } from "react-icons/io5";
import { useGlobalData } from "@/src/context/GlobalContext";

export default function Kits() {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = useGlobalData();
  useEffect(() => {
    const fetchKits = async () => {
      setLoading(true);

      // 1. Quitamos el filtro temporalmente para ver qué llega
      // 2. Usamos .select("*, categories(*)") para ver la categoría asociada
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(*)");

      if (error) {
        console.error("Error al traer datos:", error);
      } else if (data) {
        console.log("Datos recibidos de Supabase:", data); // <--- MIRA ESTO EN LA CONSOLA (F12)

        // Filtramos en el frontend para estar 100% seguros de que el nombre coincide
        // Busca en tu base de datos cómo se escribe exactamente: "Kits Eléctricos"
        const kitsFiltrados = data.filter(
          (item) => item.categories?.name === "Kits Eléctricos"
        );

        console.log("Kits filtrados:", kitsFiltrados);

        const formattedKits = kitsFiltrados.slice(0, 3).map((item) => ({
          id: item.id,
          category: "MODULAR",
          name: item.name,
          desc:
            item.specs?.descripcion ||
            "Ingeniería de alta potencia para tu ruta.",
          price: `s/${item.price}`,
          progress: item.specs?.progress || "w-[80%]",
          icon: <IoFlash className="w-4 h-4 text-gray-500" />,
        }));

        setKits(formattedKits);
      }
      setLoading(false);
    };
    fetchKits();
  }, []);

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
        {/* LADO IZQUIERDO: TEXTO */}
        <div className="space-y-6">
          {/* ... tu contenido de texto se mantiene igual ... */}
          <div>
            <span className="font-mono text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
              Modular Power Kits
            </span>
            <h2 className="font-display text-[44px] sm:text-[56px] font-black uppercase tracking-normal leading-[0.95] mt-3">
              Transforma <br /> tu ruta
            </h2>
          </div>
          <p className="font-sans text-[#d5c4ab] text-sm leading-relaxed tracking-wide max-w-[380px]">
            Diseñados con arquitectura modular para una integración limpia.
            Potencia bruta sin comprometer la estética de tu build.
          </p>
        </div>

        {/* LADO DERECHO: GRID DE KITS */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-gray-500">Cargando kits...</p>
          ) : (
            kits.map((kit, index) => (
              <div
                key={kit.id}
                className="bg-[#121414]/90 border border-[#333535]/30 p-8 flex flex-col justify-between h-[280px] relative group hover:border-[#ffb800]/50 transition-colors duration-300"
              >
                <div>
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-[11px] text-[#ffb800] tracking-[0.2em] font-bold">
                      0{index + 1} <span className="text-gray-600 mx-1">/</span>{" "}
                      {kit.category}
                    </span>
                    <IoFlash className="w-4 h-4 text-gray-500" />
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase tracking-wide mt-5 text-white">
                    {kit.name}
                  </h3>
                  <p className="font-sans text-gray-400 text-xs mt-3 leading-relaxed">
                    {kit.desc}
                  </p>
                </div>

                {/* BARRA DE PROGRESO */}
                <div className="space-y-4">
                  <div className="w-full h-[2px] bg-[#222424]">
                    <div
                      className={`h-full ${
                        kit.progress || "w-[50%]"
                      } bg-[#ffb800]`}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-display text-xl font-black text-white">
                      {kit.price}
                    </span>
                    <a
                      href={`${
                        data.productWhatsAppMessageUrl
                      }+%20Kit%20Eléctrico+${encodeURIComponent(kit.name)}`}
                      className="font-mono text-[10px] font-bold uppercase text-[#ffb800] hover:text-white"
                    >
                      QUIERO ESTE →
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* CUARTA TARJETA FIJA */}
          <div
            className="border border-[#ffb800] p-8 flex flex-col justify-between h-[280px] relative overflow-hidden bg-[#0c0f0f] group"
            style={{
              backgroundImage: `linear-gradient(rgba(255,184,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.05) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          >
            <div className="relative z-10">
              <div className="font-mono text-[11px] text-[#ffb800] tracking-[0.2em] font-bold flex items-center gap-2">
                <IoBuild className="text-[#ffb800]" /> 04{" "}
                <span className="text-gray-600">/</span> CUSTOM SYSTEM
              </div>
              <h3 className="font-display text-2xl font-black uppercase mt-5 text-white">
                ¿PROYECTO <br />{" "}
                <span className="text-[#ffb800]">A MEDIDA?</span>
              </h3>
              <p className="font-sans text-gray-400 text-xs mt-3 leading-relaxed">
                Ingeniería de bobinados y sistemas de alta potencia para
                competición.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <a
                href={`${data.MoreElectricKitsMessageUrl}`}
                className="flex justify-center font-mono w-full bg-[#ffb800] text-black font-black text-[10px] uppercase py-4 hover:bg-white transition-all"
              >
                Consultar más kits
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
