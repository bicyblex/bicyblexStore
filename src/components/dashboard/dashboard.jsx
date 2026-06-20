import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient"; // Ajusta la ruta según dónde esté tu lib

// Importamos los componentes modulares de tus carpetas corregidas

import NewsletterForm from "./newsletter/newsLetterForm";
import CategoryManager from "./category/categoryManager";
import { ProductManager } from "./product/ProductManager";

export default function DashboardCentral() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 💡 Controla qué pestaña está activa a la derecha sin parpadeo de página
  const [activeTab, setActiveTab] = useState("products");

  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
        setCheckingAuth(false);
      }
    };

    checkUserSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (checkingAuth) {
    return (
      <div className="w-full min-h-screen bg-[#0c0f0f] flex items-center justify-center text-gray-500 font-mono text-xs uppercase tracking-widest">
        Autenticando credenciales de seguridad...
      </div>
    );
  }

  // 💡 Renderiza el componente correcto según la opción de la barra lateral
  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-black uppercase tracking-wide">
              Gestión de Productos
            </h2>

            <ProductManager />
          </div>
        );
      case "news":
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-black uppercase tracking-wide">
              Módulo de Noticias / Blog
            </h2>
            <NewsletterForm />
          </div>
        );
      case "categories":
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-black uppercase tracking-wide">
              Categorías del Sistema
            </h2>
            <CategoryManager />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0f0f] text-white flex">
      {/* ─── BARRA LATERAL IZQUIERDA FIJA ─── */}
      <aside className="w-[260px] bg-[#080a0a] border-r border-[#333535]/20 flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          {/* Header de Identidad */}
          <div>
            <span className="font-mono text-[#ffb800] text-[10px] font-bold tracking-[0.3em] uppercase block">
              BICYBLEX TERMINAL
            </span>
            <span className="text-[9px] font-mono text-gray-500 tracking-wider block mt-1 truncate">
              {user?.email}
            </span>
          </div>

          {/* Menú de Navegación SPA */}
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setActiveTab("products")}
              className={`font-mono text-left text-xs uppercase tracking-wider p-3 transition-all ${
                activeTab === "products"
                  ? "bg-[#ffb800] text-black font-bold border-l-4 border-white"
                  : "text-gray-400 hover:bg-[#111414] hover:text-white"
              }`}
            >
              PRODUCTOS
            </button>

            <button
              onClick={() => setActiveTab("news")}
              className={`font-mono text-left text-xs uppercase tracking-wider p-3 transition-all ${
                activeTab === "news"
                  ? "bg-[#ffb800] text-black font-bold border-l-4 border-white"
                  : "text-gray-400 hover:bg-[#111414] hover:text-white"
              }`}
            >
              NOTICIAS
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`font-mono text-left text-xs uppercase tracking-wider p-3 transition-all ${
                activeTab === "categories"
                  ? "bg-[#ffb800] text-black font-bold border-l-4 border-white"
                  : "text-gray-400 hover:bg-[#111414] hover:text-white"
              }`}
            >
              CATEGORÍAS
            </button>
          </nav>
        </div>

        {/* Botón de Desconexión */}
        <button
          onClick={handleLogout}
          className="font-mono border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-black font-bold text-[10px] uppercase tracking-widest p-3 transition-all duration-200 text-center w-full"
        >
          Desconectar Sistema
        </button>
      </aside>

      {/* ─── CONTENIDO DERECHO DINÁMICO ─── */}
      <main className="flex-grow p-10 max-w-[1400px] overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
