import React from "react";

export default function ElectricMotos() {
  // Los 3 modelitos de motos eléctricas con especificaciones técnicas de torque y batería
  const motos = [
    {
      id: 1,
      tag: "Cyber City-X",
      name: "Volt-R 3000",
      price: "$2,890",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-SFtafsMOoBNE0hmU5vl9DwIn4JcirVBB6g&s",
      autonomia: "85 KM",
      motor: "3000W QS Motor",
      velocidad: "75 KM/H",
    },
    {
      id: 2,
      tag: "Hyper Enduro",
      name: "Apex E-Moto",
      price: "$3,450",
      image:
        "https://coolboxpe.vtexassets.com/arquivos/ids/342296-800-800?v=639121692004570000&width=800&height=800&aspect=true",
      autonomia: "110 KM",
      motor: "5000W Mid-Drive",
      velocidad: "95 KM/H",
    },
    {
      id: 3,
      tag: "Urban Minimalist",
      name: "Neon S2",
      price: "$2,190",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdnieGwvIrLc4eezxg8bScO3NOk6rQZcIXjA&s",
      autonomia: "65 KM",
      motor: "2000W Hub Motor",
      velocidad: "60 KM/H",
    },
  ];

  return (
    <section
      className="w-full bg-[#0c0f0f] py-24 text-white border-t border-[#333535]/10"
      id="Motos-electricas"
    >
      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-[1920px] m-auto w-[90%]">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#333535]/20 pb-8 mb-16">
          <div>
            <span className="font-mono text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
              E-Mobility / Cero Emisiones
            </span>
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-black uppercase tracking-normal leading-[0.95] mt-3">
              Motos Eléctricas
            </h2>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ffb800] bg-[#ffb800]/10 px-3 py-1 border border-[#ffb800]/20">
              Modo voltaje
            </span>
          </div>
        </div>

        {/* CUADRÍCULA DE 3 COLUMNAS CORREGIDA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {motos.map((moto) => {
            const nameParts = moto.name.split(" ");

            return (
              <div
                key={moto.id}
                className="bg-[#080a0a] border border-[#333535]/20 flex flex-col justify-between group"
              >
                {/* CONTENEDOR DE LA IMAGEN */}
                <div className="relative w-full h-[260px] bg-[#111414] overflow-hidden">
                  <img
                    src={moto.image}
                    alt={moto.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="font-mono absolute top-4 left-4 bg-[#ffb800] text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1">
                    {moto.tag}
                  </div>
                </div>

                {/* BLOQUE DE CONTENIDO E INFORMACIÓN */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Título de la Moto y Precio */}
                    <h3 className="font-display text-2xl font-black uppercase tracking-wide leading-[1.0] flex items-baseline gap-x-2 flex-wrap">
                      <span className="text-white">{nameParts[0]}</span>
                      <span className="text-[#ffb800]">{moto.price}</span>
                      {nameParts[1] && (
                        <span className="text-white w-full block mt-1">
                          {nameParts[1]}
                        </span>
                      )}
                    </h3>

                    {/* Especificaciones Técnicas Tipo Ficha */}
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
                          {moto.motor.split(" ")[0]}
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

                  {/* Botón de Acción */}
                  <div className="mt-8">
                    <button className="font-mono w-full bg-transparent border border-[#ffb800] text-[#ffb800] group-hover:bg-[#ffb800] group-hover:text-black font-bold text-xs uppercase tracking-[0.2em] py-4 transition-all duration-300">
                      Ordenar Ahora
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
