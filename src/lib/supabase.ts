import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Cliente Supabase OPCIONAL: si no hay variables de entorno, la app corre
// local-only (offline-first con Dexie) exactamente como antes. Auth y modo admin
// solo se habilitan cuando Supabase está configurado.

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

// `supabase` es null si no está configurado. Todo consumidor debe chequear
// `isSupabaseConfigured` (o el null) antes de usarlo.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

// Perfil de la app (fila en `profiles`). El rol gobierna el acceso a /admin.
export interface Profile {
  id: string;
  email: string | null;
  role: 'student' | 'admin';
  display_name: string | null;
}
