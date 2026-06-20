import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validamos que las credenciales existan para evitar que la app se rompa en silencio
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "⚠️ Error: Faltan las variables de entorno de Supabase en .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
