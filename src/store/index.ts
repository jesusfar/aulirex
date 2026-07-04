import { create } from 'zustand';
import type { PlayerProgress } from '../lib/storage/db';

interface AppState {
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  progress: PlayerProgress | null;
  setProgress: (progress: PlayerProgress) => void;
}

export const useAppStore = create<AppState>((set) => ({
  hydrated: false,
  setHydrated: (hydrated) => set({ hydrated }),
  progress: null,
  setProgress: (progress) => set({ progress }),
}));
