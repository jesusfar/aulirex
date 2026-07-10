import { supabase, isSupabaseConfigured, type Profile } from './supabase';
import { useAppStore } from '../store';

// Carga (o crea) el perfil del usuario autenticado. El trigger de la migración
// crea la fila en `profiles` al registrarse; acá solo la leemos.
async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role, display_name')
    .eq('id', userId)
    .maybeSingle();
  if (error) {
    console.warn('No se pudo cargar el perfil:', error.message);
    return null;
  }
  return (data as Profile) ?? null;
}

async function refreshAuthState(): Promise<void> {
  if (!supabase) {
    useAppStore.getState().setAuthReady(true);
    return;
  }
  const { data } = await supabase.auth.getSession();
  const session = data.session ?? null;
  const profile = session ? await fetchProfile(session.user.id) : null;
  useAppStore.getState().setAuth({ session, profile });
  useAppStore.getState().setAuthReady(true);
}

// Inicializa el estado de auth y se suscribe a cambios. Devuelve una función de
// limpieza. Se llama una vez al montar la app.
export function initAuth(): () => void {
  if (!isSupabaseConfigured || !supabase) {
    useAppStore.getState().setAuthReady(true);
    return () => {};
  }
  void refreshAuthState();
  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    const profile = session ? await fetchProfile(session.user.id) : null;
    useAppStore.getState().setAuth({ session: session ?? null, profile });
    useAppStore.getState().setAuthReady(true);
  });
  return () => data.subscription.unsubscribe();
}

export async function signInWithPassword(email: string, password: string) {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUpWithPassword(
  email: string,
  password: string,
  displayName?: string,
) {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName ?? null } },
  });
  if (error) throw error;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
  useAppStore.getState().setAuth({ session: null, profile: null });
}
