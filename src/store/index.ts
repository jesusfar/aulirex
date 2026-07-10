import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import type { PlayerProgress } from '../lib/storage/db';
import type { Profile } from '../lib/supabase';

interface AppState {
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  progress: PlayerProgress | null;
  setProgress: (progress: PlayerProgress) => void;
  // Auth (opcional): null si no hay sesión o Supabase no está configurado.
  session: Session | null;
  profile: Profile | null;
  authReady: boolean; // true cuando ya se resolvió el estado inicial de auth
  setAuth: (auth: { session: Session | null; profile: Profile | null }) => void;
  setAuthReady: (ready: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  hydrated: false,
  setHydrated: (hydrated) => set({ hydrated }),
  progress: null,
  setProgress: (progress) => set({ progress }),
  session: null,
  profile: null,
  authReady: false,
  setAuth: ({ session, profile }) => set({ session, profile }),
  setAuthReady: (authReady) => set({ authReady }),
}));

export const useIsAdmin = () => useAppStore((s) => s.profile?.role === 'admin');
