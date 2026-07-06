import React, { useState } from "react";
import {
  IoChevronDown,
  IoShieldCheckmark,
  IoCart,
  IoAirplane,
  IoCard,
  IoConstruct,
  IoSettings,
} from "react-icons/io5";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "¿Cómo es el proceso de compra?",
      icon: <IoCart />,
      a: (
        <div className="space-y-3">
          <p>
            Puedes comprar vía{" "}
            <span className="text-white font-bold">WhatsApp</span>, donde te
            asesoraremos para elegir el modelo ideal.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>
              <strong className="text-white font-bold">¿Son nuevas?</strong> Sí,
              todas nuestras bicicletas son nuevas y se entregan con accesorios.
            </li>
            <li>
              <strong className="text-white font-bold">¿Talla?</strong> Te
              ayudamos a elegirla según tu estatura y uso.
            </li>
          </ul>
        </div>
      ),
    },
    {
      q: "¿Condiciones de entrega y armado?",
      icon: <IoConstruct />,
      a: (
        <div className="space-y-3">
          <p>
            En <strong className="text-white font-bold">Lima</strong>, las
            entregamos armadas. Para{" "}
            <strong className="text-white font-bold">provincias</strong>, se
            envían parcialmente armadas para su protección.
          </p>
          <p className=" italic text-yellow-500 font-bold">
            Si solicitas caja sellada, el cliente asume el ensamblaje y pierde
            la garantía de regulación.
          </p>
        </div>
      ),
    },
    {
      q: "¿Cómo funciona el proceso de pago y envío para provincia?",
      icon: <IoCard />,
      a: (
        <div className="space-y-3">
          <p>Pagos seguros en 2 pasos:</p>

          <ul className="space-y-2">
            <li>
              <strong className="text-white font-bold">
                1. Adelanto (Delivery):
              </strong>{" "}
              Para programar la entrega, es necesario realizar previamente el
              pago del delivery. Una vez recibido, reservamos el espacio y
              procedemos con el armado de la bicicleta.
            </li>

            <li className="text-red-400 text-xs pl-4 italic">
              ⚠️ En caso de cancelación por decisión del cliente después de la
              programación, este pago no es reembolsable.
            </li>

            <li>
              <strong className="text-white font-bold">
                2. Saldo de la bicicleta:
              </strong>{" "}
              Lo puede realizar con total tranquilidad al momento de recibir su
              pedido. Tras recibir foto/video de la guía de remisión de la
              agencia (para provincias).
            </li>
          </ul>

          <p className="text-xs text-[#ffb800] border-t border-[#333535] pt-2">
            📲 Incluye videollamadas para verificar el estado real de tu equipo.
          </p>
        </div>
      ),
    },
    {
      q: "¿Envíos y logística?",
      icon: <IoAirplane />,
      a: (
        <div className="space-y-3">
          <p>Realizamos envíos a Lima y provincias:</p>
          <ul className="list-none space-y-2 text-gray-400">
            <li>
              ✅ <strong className="text-white font-bold">Aliados:</strong>{" "}
              Marvisur / Shalom (puedes sugerir otra agencia si opera en tu
              destino).
            </li>
            <li>
              💰 <strong className="text-white font-bold">Costo:</strong> Aprox.
              S/40 (determinado por la agencia al llevar el producto).
            </li>
            <li>
              ⏱️ <strong className="text-white font-bold">Tiempos:</strong> Lima
              según programación; provincias según la agencia de transporte.
            </li>
          </ul>
        </div>
      ),
    },
    {
      q: "¿Tienen garantía?",
      icon: <IoShieldCheckmark />,
      a: (
        <div className="space-y-2">
          <p>
            Todas las bicicletas cuentan con{" "}
            <strong className="text-white font-bold">1 año de garantía</strong>{" "}
            por el marco, estructura o defectos de fabricación.
          </p>
        </div>
      ),
    },
    {
      q: "¿Qué métodos de pago aceptan?",
      icon: <IoSettings />,
      a: (
        <p className="text-gray-400">
          Aceptamos{" "}
          <strong className="text-white font-bold">
            transferencias, depósitos, Yape, Plin y otros medios
          </strong>{" "}
          disponibles al momento de la compra.
        </p>
      ),
    },
  ];

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="w-full bg-[#0c0f0f] py-24 text-white" id="Dudas">
      <div className="max-w-300 m-auto w-[90%]">
        {/* Encabezado */}
        <div className="mb-16 text-center">
          <span className="font-mono text-[#ffb800] text-xs font-bold tracking-[0.3em] uppercase">
            Respondiendo tus dudas
          </span>
          <h2 className="font-display text-[40px] font-black uppercase tracking-normal mt-3">
            Preguntas <span className="text-[#ffb800]">Frecuentes</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#ffb800] mx-auto mt-6"></div>
        </div>

        {/* Lista de Acordeón */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className=" bg-[#121414]/90 border border-[#333535]/30 hover:border-[#ffb800]/50 transition-all duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="cursor-pointer w-full flex justify-between items-center p-6 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-[#ffb800] text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-display text-lg font-bold uppercase tracking-widest">
                    {item.q}
                  </span>
                </div>
                <IoChevronDown
                  className={`text-[#ffb800] transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0">
                  <div className="font-sans text-sm leading-relaxed border-t border-[#333535]/30 pt-4 text-gray-400">
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
