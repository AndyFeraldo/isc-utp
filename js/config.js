// Conexión a Supabase (proyecto solo de ISC UTP, tablas isc_*).
// La clave "anon" es pública por diseño: las tablas están cerradas y
// todo pasa por funciones que validan el código de cada persona.
// Mientras estén vacías, el panel solo funciona en modo de prueba (?demo).
export const SUPABASE_URL = "";
export const SUPABASE_KEY = "";

// Cada cuántos segundos se actualiza el panel de admin en vivo
export const SEGUNDOS_REFRESCO = 4;
