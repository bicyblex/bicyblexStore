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
      price: "$4,299",
      image:
        "https://mlo1wbhvgmgt.i.optimole.com/w:1024/h:576/q:mauto/g:sm/f:best/https://pethero.co.za/wp-content/uploads/2026/02/Indoor-Cats-Blog-Banner.png",
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
      price: "$3,850",
      image:
        "https://mlo1wbhvgmgt.i.optimole.com/w:1024/h:576/q:mauto/g:sm/f:best/https://pethero.co.za/wp-content/uploads/2026/02/Indoor-Cats-Blog-Banner.png",
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
      price: "$450",
      image: "/titan.png",
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
      price: "$680",
      image: "/apex.png",
      aro: "20",
      specs: [
        { label: "Estilo", desc: "BMX / Park" },
        { label: "Rotores", desc: "360 Giro" },
        { label: "Mazas", desc: "Cassette 9T" },
      ],
    },
  ];

  // Lógica de filtrado en tiempo real
  const filteredBikes =
    activeAro === "TODOS"
      ? bikes
      : bikes.filter((bike) => bike.aro === activeAro);

  return (
    <section className="w-full bg-[#0c0f0f] py-24 text-white">
      <div className="max-w-[1920px] m-auto w-[90%]">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#333535]/20 pb-8 mb-12">
          <div>
            <span className="font-mono text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
              Línea Profesional 2024
            </span>
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-black uppercase tracking-tighter leading-[0.9] mt-2">
              Nuestras Bestias
            </h2>
          </div>

          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <div className="relative w-32 h-[2px] bg-[#333535]">
              <div className="absolute top-0 left-0 h-full w-[40%] bg-[#ffb800]"></div>
            </div>
            <span className="text-[#d5c4ab] font-mono text-xs tracking-[0.4em] uppercase">
              Inventory: 100%
            </span>
          </div>
        </div>

        {/* BOTONES DE FILTRADO RESPONSIVOS (Look de terminal/interfaz) */}
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

        {/* REJILLA DE PRODUCTOS DINÁMICA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredBikes.map((bike) => {
            const nameParts = bike.name.split(" ");

            return (
              <div
                key={bike.id}
                className="flex flex-col sm:flex-row bg-[#080a0a] border border-[#333535]/20 h-auto sm:h-[520px]"
              >
                {/* PARTE IZQUIERDA: Imagen */}
                <div className="relative w-full sm:w-1/2 h-[300px] sm:h-full bg-[#111414] overflow-hidden shrink-0">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="font-mono absolute top-5 left-5 bg-[#ffb800] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    {bike.tag}
                  </div>
                </div>

                {/* PARTE DERECHA: Datos */}
                <div className="w-full sm:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    {/* Título del producto en font-display */}
                    <h3 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] flex flex-wrap items-baseline gap-x-2">
                      <span className="text-white">{nameParts[0]}</span>
                      <span className="text-[#ffb800]">{bike.price}</span>
                      {nameParts[1] && (
                        <span className="text-white w-full block mt-1">
                          {nameParts[1]}
                        </span>
                      )}
                    </h3>

                    {/* Especificaciones técnicas con tipografía híbrida */}
                    <ul className="mt-8 space-y-6 m-0 p-0 list-none">
                      {bike.specs.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div>
                            {/* Label en font-mono */}
                            <span className="font-mono block text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                              {spec.label}
                            </span>
                            {/* Descripción en font-sans */}
                            <span className="font-sans block text-sm font-medium tracking-wide text-[#d5c4ab] mt-0.5">
                              {spec.desc}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Botón de configuración en font-mono */}
                  <div className="mt-8 sm:mt-0">
                    <button className="font-mono w-full border border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black font-bold text-xs uppercase tracking-[0.15em] py-4 px-6 transition-all duration-300">
                      Configurar Especificaciones
                    </button>
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
