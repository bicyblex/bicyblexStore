import React, { useState } from "react";
import { useRouter } from "next/router"; // O 'next/navigation' si usas App Router
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(false);

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Si todo sale bien, redirige al Dashboard de inmediato
      if (data.user) {
        router.push("/dashboard");
      }
    } catch (error) {
      setErrorMsg("Credenciales incorrectas o acceso denegado.");
      console.error("Auth error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#0c0f0f] flex items-center justify-center text-white px-4">
      <div className="w-full max-w-[400px] bg-[#080a0a] border border-[#333535]/30 p-8 md:p-10">
        {/* Encabezado */}
        <div className="">
          <a href="#" className="flex items-center shrink-0">
            <img src="/logo.png" alt="Logo" className="w-32 lg:w-52 h-auto" />
          </a>
          <span className="font-mono text-[#ffb800] text-[10px] font-bold tracking-[0.3em] uppercase block">
            Control de Sistema
          </span>
          <h2 className="font-display text-2xl font-black uppercase tracking-wide mt-7">
            Iniciar Sesión
          </h2>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="font-mono block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111414] border border-[#333535]/40 p-4 font-sans text-sm text-white focus:outline-none focus:border-[#ffb800] transition-colors"
              placeholder="operador@bicyblex.com"
            />
          </div>

          <div>
            <label className="font-mono block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111414] border border-[#333535]/40 p-4 font-sans text-sm text-white focus:outline-none focus:border-[#ffb800] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <p className="font-mono text-xs text-red-500 uppercase tracking-wider bg-red-950/20 border border-red-900/30 p-3 text-center">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer font-mono w-full bg-[#ffb800] text-black font-bold text-xs uppercase tracking-[0.15em] py-4 transition-all duration-300 hover:bg-white disabled:opacity-50"
          >
            {loading ? "VERIFICANDO..." : "INGRESAR"}
          </button>
        </form>
      </div>
    </section>
  );
}
