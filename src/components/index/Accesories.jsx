import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useGlobalData } from "@/src/context/GlobalContext";

export default function Accesories() {
  const [accesorios, setAccesorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = useGlobalData();

  useEffect(() => {
    fetchAccesorios();
  }, []);

  const fetchAccesorios = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)");

      if (error) throw error;

      // Filtro específico para la categoría de accesorios
      const filtered = data.filter(
        (item) => item.categories?.name === "Accesorios"
      );

      const formatted = filtered.map((item) => ({
        id: item.id,
        tag: item.tag || "ACCESORIO",
        name: item.name,
        price: `s/${item.price}`,
        image: item.image,
        // Aquí puedes ajustar los campos si tus accesorios tienen otras specs
        info1: item.specs?.dato1 || "N/A",
        info2: item.specs?.dato2 || "Universal",
        info3: item.specs?.dato3 || "N/A",
      }));

      setAccesorios(formatted);
    } catch (error) {
      console.error("Error al cargar accesorios:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full bg-[#0c0f0f] py-24 text-white border-t border-[#333535]/10"
      id="Accesorios"
    >
      <div className="max-w-[1920px] m-auto w-[90%]">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#333535]/20 pb-8 mb-16">
          <div>
            <span className="font-mono text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
              Equipamiento / Complementos
            </span>
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-black uppercase tracking-normal leading-[0.95] mt-3">
              Accesorios
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-mono">
            Cargando accesorios...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accesorios.map((acc) => (
              <div
                key={acc.id}
                className="bg-[#080a0a] border border-[#333535]/20 flex flex-col justify-between group"
              >
                <div className="relative w-full h-[260px] bg-[#111414] overflow-hidden">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="font-mono absolute top-4 left-4 bg-[#ffb800] text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1">
                    {acc.tag}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase tracking-wide flex items-baseline gap-x-2">
                      <span className="text-white">{acc.name}</span>
                      <span className="text-[#ffb800]">{acc.price}</span>
                    </h3>

                    {/* Fila de especificaciones adaptada */}
                    <div className="mt-8 grid grid-cols-3 gap-2 border-t border-b border-[#333535]/20 py-4 font-mono">
                      <div className="text-center border-r border-[#333535]/20">
                        <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-[0.15em]">
                          Material
                        </span>
                        <span className="block text-sm font-bold text-[#d5c4ab] mt-1">
                          {acc.info1}
                        </span>
                      </div>
                      <div className="text-center border-r border-[#333535]/20">
                        <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-[0.15em]">
                          Compat.
                        </span>
                        <span className="block text-[11px] font-bold text-[#d5c4ab] mt-1 leading-tight">
                          {acc.info2}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-[0.15em]">
                          Color
                        </span>
                        <span className="block text-sm font-bold text-[#d5c4ab] mt-1">
                          {acc.info3}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href={`${
                        data.productWhatsAppMessageUrl
                      }+${encodeURIComponent(acc.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center font-mono w-full bg-transparent border border-[#ffb800] text-[#ffb800] group-hover:bg-[#ffb800] group-hover:text-black font-bold text-xs uppercase tracking-[0.2em] py-4 transition-all duration-300"
                    >
                      Consultar ahora
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
