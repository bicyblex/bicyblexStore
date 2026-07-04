import React, { createContext, useContext } from "react";

// Tu JSON simple
const siteData = {
  phone: "+51960413023",
  defaultWhatsAppMessageUrl: `https://wa.me/+51960413023?text=Hola%20Bicyblex%2C%20estoy%20interesado%20en%20sus%20productos.%20¿Podrían%20proporcionarme%20más%20información%3F`,
  newsLetterWhatsAppMessageUrl: `https://wa.me/+51960413023?text=Hola%20Bicyblex%2C%20me%20gustaria%20saber%20sobre%20la%20noticia%20`,
  productWhatsAppMessageUrl: `https://wa.me/+51960413023?text=Hola%20Bicyblex%2C%20estoy%20interesado%20en%20el%20producto%20`,
  MoreElectricKitsMessageUrl: `https://wa.me/+51960413023?text=Hola%20Bicyblex%2C%20me%20gustaria%20saber%20sobre%20los%20kits%20electricos`,
  MaintenanceMessageUrl: `https://wa.me/+51960413023?text=Hola%20Bicyblex%2C%20me%20gustaria%20saber%20sobre%20`,
  MoreAboutMaintenanceMessageUrl: `https://wa.me/+51960413023?text=Hola%20Bicyblex%2C%20me%20gustaria%20saber%20sobre%20el%20mantenimiento`,
  email: "bicyblex.pe@gmail.com",
  status: "ONLINE",
  version: "V2.4.1",
  facebook: "https://www.facebook.com/bicyblex.pe",
  tiktokLink: "https://www.tiktok.com/@bicyblex",
  instagramLink: "https://www.instagram.com/bicyblex.pe/",
};
//creando el contexto
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={siteData}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalContext);
