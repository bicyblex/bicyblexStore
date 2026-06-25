import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

import NewsletterForm from "./newsletter/newsLetterForm";
import CategoryManager from "./category/categoryManager";
import { ProductManager } from "./product/ProductManager";
import Head from "next/head";

export default function DashboardCentral() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
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
        Autenticando...
      </div>
    );
  }

  return (
    // 1. Altura fija a la pantalla completa (h-screen)
    <>
      <Head>
        <title>Dashboard - Administración</title>
      </Head>
      <div className="h-screen bg-[#0c0f0f] text-white flex overflow-hidden">
        {/* 2. Barra lateral estática: shrink-0 evita que se deforme */}
        <aside className="w-[260px] bg-[#080a0a] border-r border-[#333535]/20 flex flex-col justify-between p-6 shrink-0">
          <div className="space-y-8">
            <div>
              <a href="#" className="flex items-center shrink-0">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-32 lg:w-52 h-auto"
                />
              </a>
              <span className="font-mono text-[#ffb800] text-[10px] font-bold tracking-[0.3em] uppercase block">
                administración
              </span>
              <span className="text-[9px] font-mono text-gray-500 tracking-wider block mt-1 truncate">
                {user?.email}
              </span>
            </div>

            <nav className="flex flex-col ">
              {[
                { id: "products", label: "PRODUCTOS" },
                { id: "news", label: "NOTICIAS" },
                { id: "categories", label: "CATEGORÍAS" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-mono text-left text-xs uppercase tracking-wider p-3 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#ffb800] text-black font-bold border-l-4 border-white"
                      : "text-gray-400 hover:bg-[#111414] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="font-mono border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-black font-bold text-[10px] uppercase tracking-widest p-3 transition-all w-full"
          >
            Cerrar sesión
          </button>
        </aside>

        {/* 3. Contenido derecho: overflow-y-auto hace que SOLO esta parte tenga scroll */}
        <main className="flex-grow p-10 overflow-y-auto scrollbar-thin">
          <div className="max-w-[1400px] mx-auto">
            {activeTab === "products" && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-black uppercase">
                  Gestión de Productos
                </h2>
                <ProductManager />
              </div>
            )}
            {activeTab === "news" && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-black uppercase">
                  Módulo de Noticias
                </h2>
                <NewsletterForm />
              </div>
            )}
            {activeTab === "categories" && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-black uppercase">
                  Categorías del Sistema
                </h2>
                <CategoryManager />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
