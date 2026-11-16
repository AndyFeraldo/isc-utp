// =========================================================
// Conexión a la base de datos.
// Publicado usa Supabase. En modo de prueba (?demo en la dirección)
// usa datos de ejemplo guardados solo en este navegador.
// =========================================================
import { SUPABASE_URL, SUPABASE_KEY } from "./config.js?v=202611160300";

const DEMO = typeof window !== "undefined" && window.__ISC_DEMO__ === true;
export const ES_DEMO = DEMO;

// ---------------- Real (Supabase) ----------------
let cliente = null;
async function rpc(fn, args) {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("El panel aún no está conectado a la base de datos. Por ahora puedes probarlo en modo de prueba.");
  if (!cliente) cliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
  const { data, error } = await cliente.rpc(fn, args);
  if (error) throw new Error(error.message || "No se pudo conectar con la base de datos");
  return data;
}

const real = {
  entrar: (codigo) => rpc("isc_entrar", { p_codigo: codigo }),
};

// ---------------- Modo de prueba (localStorage) ----------------
const CLAVE = "isc-utp-demo-v1";
const CODIGOS_DEMO = {
  ADMIN1: { rol: "admin", nombre: "Administrador de prueba" },
  JUR001: { rol: "jurado", nombre: "Jurado de prueba 1" },
  JUR002: { rol: "jurado", nombre: "Jurado de prueba 2" },
  JUR003: { rol: "jurado", nombre: "Jurado de prueba 3" },
  EQ0001: { rol: "equipo", nombre: "Equipo de prueba" },
  PROY01: { rol: "proyeccion", nombre: "Proyección de prueba" },
};
export const DEMO_CODIGOS = { admin: "ADMIN1", jurado: "JUR001, JUR002 o JUR003", equipo: "EQ0001", proyeccion: "PROY01" };

const pausa = (ms = 180) => new Promise((r) => setTimeout(r, ms));
export const demoDatos = {
  leer() { try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch { return {}; } },
  guardar(d) { try { localStorage.setItem(CLAVE, JSON.stringify(d)); } catch { /* sin almacenamiento */ } },
  reiniciar() { try { localStorage.removeItem(CLAVE); } catch { /* sin almacenamiento */ } },
};

const demo = {
  async entrar(codigo) {
    await pausa();
    const r = CODIGOS_DEMO[String(codigo).trim().toUpperCase()];
    return r ? { ...r } : null;
  },
};

export const api = DEMO ? demo : real;
