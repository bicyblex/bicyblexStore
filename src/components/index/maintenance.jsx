import React from "react";
import {
  IoCheckmarkCircle,
  IoConstruct,
  IoBuild,
  IoDiamond,
  IoHelpCircle,
} from "react-icons/io5";
import { useGlobalData } from "@/src/context/GlobalContext";

export default function Maintenance() {
  const data = useGlobalData();
  const services = [
    {
      title: "Mantenimiento Preventivo",
      price: "S/60",
      icon: <IoBuild />,
      features: [
        "Limpieza general",
        "Calibración frenos mecánicos",
        "Calibración cambios",
        "Lubricación y medición cadena",
        "Inflado presión correcta",
      ],
    },
    {
      title: "Mantenimiento Premium",
      price: "S/120",
      icon: <IoDiamond />,
      features: [
        "Desarmado completo",
        "Calibración frenos mecánicos",
        "Calibración cambios",
        "Lubricación y medición cadena",
        "Limpieza y engrase de mazas",
        "Limpieza tazas dirección",
        "Limpieza eje central",
      ],
    },
    {
      title: "Calibración de Aros",
      price: "S/40",
      icon: <IoConstruct />,
      features: [
        "Centrado lateral y radial",
        "Ajuste de tensión de rayos",
        "Verificación de integridad",
      ],
    },
  ];

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-center bg-[#0c0f0f] py-24 overflow-hidden"
      id="Mantenimiento"
    >
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=2070')] bg-cover bg-center" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0c0f0f] via-[#0c0f0f]/80 to-transparent" />

      <div className="relative z-10 max-w-[1920px] mx-auto w-[90%]">
        <div className="mb-16">
          <span className="font-mono text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
            SIEMPRE A TU SERVICIO
          </span>
          <h2 className="font-display text-[44px] sm:text-[56px] font-black uppercase tracking-normal leading-[0.95] mt-3">
            SERVICIO <br /> TÉCNICO
          </h2>
          <div className="w-20 h-[4px] bg-[#ffb800] mt-6" />
        </div>

        {/* GRID 2x2 PARA MANTENER SIMETRÍA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-[#0c0f0f]/40 backdrop-blur-md border border-white/10 p-10 flex flex-col justify-between hover:border-[#ffb800]/50 transition-all"
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-[#ffb800] text-3xl">{s.icon}</div>
                  <h3 className="font-display text-3xl font-black uppercase tracking-wider">
                    {s.title}
                  </h3>
                </div>
                <p className="font-mono text-5xl font-black text-[#ffb800] mb-8">
                  {s.price}
                </p>
                <ul className="space-y-4 mb-10">
                  {s.features.map((f, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-300 text-sm font-sans tracking-wide"
                    >
                      <IoCheckmarkCircle className="text-[#ffb800] w-5 h-5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`${data.MaintenanceMessageUrl}+%20+${encodeURIComponent(
                  s.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono flex text-center justify-center cursor-pointer w-full py-5 border border-[#ffb800] text-[#ffb800] font-black uppercase text-xs tracking-widest hover:bg-[#ffb800] hover:text-black transition-all"
              >
                Reservar {s.title}
              </a>
            </div>
          ))}

          {/* CUARTO BLOQUE: CONSULTAS */}
          <div className="bg-[#ffb800]/5 border border-[#ffb800]/20 p-10 flex flex-col justify-center items-center text-center gap-6">
            <IoHelpCircle className="text-[#ffb800] text-6xl" />
            <h3 className="font-display text-3xl font-black uppercase tracking-wider">
              ¿Algún otro detalle?
            </h3>
            <p className="text-gray-300 max-w-sm">
              ¿Tienes un problema específico que no aparece aquí? No te
              preocupes, ven a visitarnos y lo revisaremos juntos.
            </p>
            <a
              href={data.MoreAboutMaintenanceMessageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono cursor-pointer w-full mt-4 py-5 bg-[#ffb800] text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
