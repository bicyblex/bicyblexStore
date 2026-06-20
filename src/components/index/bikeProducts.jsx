import React, { useState } from "react";

export default function Products() {
  const [activeAro, setActiveAro] = useState("TODOS");

  // Array con todos tus tamaños de aro ordenados
  const filterOptions = ["TODOS", "12", "16", "20", "24", "26", "27.5", "29"];

  // Array de datos de ejemplo
  const bikes = [
    {
      id: 1,
      tag: "Carbon-Ti Hybrid",
      name: "Apex V1",
      price: "4,299",
      image:
        "https://www.monark.com.pe/static/monark-pe/uploads/products/images/503bbe79-killer-negro-20-monark-bicicletas-1.jpg",
      aro: "29",
      specs: [
        { label: "Cuadro T800", desc: "High-Modulus" },
        { label: "Transmisión", desc: "SRAM Eagle AXS" },
        { label: "Frenos", desc: "Shimano XT IceTech" },
      ],
    },
    {
      id: 2,
      tag: "Downhill Master",
      name: "Titan DH",
      price: "3,850",
      image:
        "https://www.monark.com.pe/static/monark-pe/uploads/products/images/503bbe79-killer-negro-20-monark-bicicletas-1.jpg",
      aro: "27.5",
      specs: [
        { label: "Fox Float", desc: "Factory 200mm" },
        { label: "Llantas DT", desc: "Swiss FR1950" },
        { label: "Protección", desc: "Integrada CNC" },
      ],
    },
    {
      id: 3,
      tag: "Kids Shredder",
      name: "Nitro 16",
      price: "450",
      image:
        "https://www.monark.com.pe/static/monark-pe/uploads/products/images/503bbe79-killer-negro-20-monark-bicicletas-1.jpg",
      aro: "16",
      specs: [
        { label: "Cuadro", desc: "Aluminio Ligero" },
        { label: "Frenos", desc: "V-Brake Ajustado" },
        { label: "Llantas", desc: "Kenda Grip" },
      ],
    },
    {
      id: 4,
      tag: "Junior BMX",
      name: "Volt 20",
      price: "680",
      image:
        "https://www.monark.com.pe/static/monark-pe/uploads/products/images/503bbe79-killer-negro-20-monark-bicicletas-1.jpg",
      aro: "20",
      specs: [
        { label: "Estilo", desc: "BMX / Park" },
        { label: "Rotores", desc: "360 Giro" },
        { label: "Mazas", desc: "Cassette 9T" },
      ],
    },
  ];

  const filteredBikes =
    activeAro === "TODOS"
      ? bikes
      : bikes.filter((bike) => bike.aro === activeAro);

  return (
    <section className="w-full bg-[#0c0f0f] py-24 text-white" id="Bicicletas">
      <div className="max-w-[1920px] m-auto w-[90%]">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#333535]/20 pb-8 mb-12">
          <div>
            <span className="font-mono text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
              Línea Profesional 2024
            </span>
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-black uppercase tracking-normal leading-[0.95] mt-3">
              Nuestras Bestias
            </h2>
          </div>

          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <div className="relative w-32 h-[2px] bg-[#333535]">
              <div className="absolute top-0 left-0 h-full w-[40%] bg-[#ffb800]"></div>
            </div>
            <span className="text-[#d5c4ab] font-mono text-xs tracking-[0.4em] uppercase">
              Inventario: 100%
            </span>
          </div>
        </div>

        {/* BOTONES DE FILTRADO RESPONSIVOS */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-4 mb-12">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveAro(option)}
              className={`font-mono py-3 sm:px-6 text-center text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] border transition-all duration-200
                ${
                  activeAro === option
                    ? "bg-[#ffb800] text-black border-[#ffb800]"
                    : "bg-transparent text-[#d5c4ab] border-[#333535]/40 hover:border-[#ffb800] hover:text-[#ffb800]"
                }`}
            >
              {option === "TODOS" ? "Ver Todo" : `Aro ${option}`}
            </button>
          ))}
        </div>

        {/* REJILLA DE PRODUCTOS DINÁMICA REESTRUCTURADA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBikes.map((bike) => {
            return (
              <div
                key={bike.id}
                className="flex flex-col bg-[#080a0a] border border-[#333535]/20 group"
              >
                {/* PARTE SUPERIOR: Imagen en relación de aspecto horizontal idónea */}
                <div className="relative w-full aspect-[20/10] bg-[#111414] overflow-hidden shrink-0 border-b border-[#333535]/15">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="font-mono absolute top-4 left-4 bg-[#ffb800] text-black text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1">
                    {bike.tag}
                  </div>
                </div>

                {/* PARTE INFERIOR: Información completa */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow gap-8">
                  <div>
                    {/* Título del producto y precio en la misma línea balanceada */}
                    <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wide leading-none flex justify-between items-baseline">
                      <span className="text-white">{bike.name}</span>
                      <span className="text-[#ffb800] text-xl font-mono font-bold">
                        s/{bike.price}
                      </span>
                    </h3>

                    {/* Especificaciones técnicas distribuidas en sub-columnas limpias */}
                    <ul className="mt-6 grid grid-cols-3 gap-4 m-0 p-0 list-none border-t border-[#333535]/20 pt-6">
                      {bike.specs.map((spec, idx) => (
                        <li key={idx} className="block">
                          <span className="font-mono block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                            {spec.label}
                          </span>
                          <span className="font-sans block text-xs font-medium tracking-wide text-[#d5c4ab] mt-1.5 leading-tight">
                            {spec.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Botón de acción */}
                  <div className="mt-auto">
                    <a
                      href=""
                      className="flex text-center justify-center font-mono w-full border border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black font-bold text-xs uppercase tracking-[0.15em] py-4 px-6 transition-all duration-300"
                    >
                      LO QUIERO !
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MENSAJE CUANDO UN FILTRO ESTÁ VACÍO */}
        {filteredBikes.length === 0 && (
          <div className="font-sans text-center py-16 border border-dashed border-[#333535]/30 text-gray-600 uppercase tracking-widest text-xs">
            No hay modelos disponibles en Aro {activeAro} actualmente.
          </div>
        )}
      </div>
    </section>
  );
}
