import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Products() {
  const [activeAro, setActiveAro] = useState("TODOS");
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterOptions = ["TODOS", "12", "16", "20", "24", "26", "27.5", "29"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)");

      if (error) throw error;

      const formattedBikes = data.map((item) => ({
        id: item.id,
        tag: item.tag || "NUEVO",
        name: item.name,
        price: item.price,
        image: item.image,
        stock: item.stock,
        category: item.categories?.name || "Sin categoria",
        aro: item.specs?.aro ? String(item.specs.aro) : "29",
        specs: item.specs
          ? Object.entries(item.specs).map(([k, v]) => ({ label: k, desc: v }))
          : [],
      }));

      const bicis = formattedBikes.filter(
        (b) => b.category.toUpperCase() === "BICICLETAS"
      );
      setBikes(bicis);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBikes =
    activeAro === "TODOS"
      ? bikes
      : bikes.filter((bike) => bike.aro === activeAro);

  return (
    <section
      className="w-full bg-[#0c0f0f] py-16 md:py-24 text-white"
      id="Bicicletas"
    >
      <div className="max-w-[1920px] m-auto w-[90%]">
        {/* CABECERA */}
        <div className="mb-12">
          <span className="font-mono text-[#ffb800] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
            LÍNEA PROFESIONAL 2026
          </span>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[#333535]/40 pb-6 mt-2">
            <h2 className="font-display text-[32px] sm:text-[48px] md:text-[56px] font-black uppercase leading-[0.95]">
              Nuestras Bestias
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 md:w-16 h-[2px] bg-[#ffb800]"></div>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#d5c4ab]">
                Inventario: {bikes.length}
              </span>
            </div>
          </div>
        </div>

        {/* BOTONES DE FILTRADO RESPONSIVE */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-12">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveAro(option)}
              className={`font-mono py-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] border transition-all duration-200
                ${
                  activeAro === option
                    ? "bg-[#ffb800] text-black border-[#ffb800]"
                    : "bg-transparent text-[#d5c4ab] border-[#333535]/40 hover:border-[#ffb800] hover:text-[#ffb800]"
                }`}
            >
              {option === "TODOS" ? "TODO" : `Aro ${option}`}
            </button>
          ))}
        </div>

        {/* GRID DE PRODUCTOS */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-mono">
            Cargando inventario...
          </div>
        ) : filteredBikes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredBikes.map((bike) => (
              <div
                key={bike.id}
                className="flex flex-col bg-[#080a0a] border border-[#333535]/20 group h-full"
              >
                <div className="bg-[#ffb800] text-black text-[9px] font-bold tracking-[0.2em] px-3 py-1 uppercase self-start m-4">
                  {bike.tag}
                </div>

                <div className="relative w-full h-[250px] bg-[#080a0a] overflow-hidden flex items-center justify-center px-4">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-baseline mb-8">
                    <h3 className="text-2xl font-display font-black uppercase text-white">
                      {bike.name}
                    </h3>
                    <span className="text-[#ffb800] font-bold text-lg font-mono">
                      S/{bike.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-[#333535]/30 pt-6 mt-auto mb-8">
                    {bike.specs.slice(0, 3).map((spec, idx) => (
                      <div key={idx}>
                        <span className="block text-[8px] uppercase text-[#333535] font-bold tracking-widest">
                          {spec.label}
                        </span>
                        <span className="block text-[10px] text-[#d5c4ab] mt-1 uppercase font-semibold">
                          {spec.desc}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="block text-center border border-[#333535] hover:border-[#ffb800] text-[#d5c4ab] hover:text-[#ffb800] font-bold text-xs uppercase py-4 transition-all tracking-[0.2em]"
                  >
                    LO QUIERO !
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-[#333535]/30">
            <h3 className="font-display text-xl md:text-2xl text-[#d5c4ab] uppercase tracking-widest">
              Sin existencias
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
