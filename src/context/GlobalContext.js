import React, { createContext, useContext } from "react";

// Tu JSON simple
const siteData = {
  phone: "+51960413023",
  defaultWhatsAppMessageUrl: `https://wa.me/+51960413023?text=Hola%20Bicyblex%2C%20estoy%20interesado%20en%20sus%20productos.%20¿Podrían%20proporcionarme%20más%20información%3F`,
  newsLetterWhatsAppMessageUrl: `https://wa.me/+51960413023?text=Hola%20Bicyblex%2C%20me%20gustaria%20saber%20sobre%20la%20noticia%20`,

  email: "bicyblex.pe@gmail.com",
  status: "ONLINE",
  version: "V2.4.1",
};
//creando el contexto
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={siteData}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalContext);
