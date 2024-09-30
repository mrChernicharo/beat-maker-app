import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Beat } from "./types";

export interface State {
  beats: Beat[];
  getBeatById: (id: string) => Beat | undefined;
  addBeat: (beat: Beat) => void;
  removeBeat: (id: string) => void;
  updateBeat: (id: string, info: Partial<Beat>) => void;
}

export const useAppStore = create<State>()(
  persist(
    (set, get) => ({
      beats: [],
      getBeatById: (id: string) => get().beats.find((b) => b.id === id),
      addBeat: (beat: Beat) => set({ beats: get().beats.concat(beat) }),
      removeBeat: (id: string) => set({ beats: get().beats.filter((b) => b.id !== id) }),
      updateBeat(id: string, info: Partial<Beat>) {
        const copy = get().beats;
        const idx = copy.findIndex((b) => b.id === id);
        if (idx < 0) return;
        copy[idx] = { ...copy[idx], ...info };
        return set({ beats: copy });
      },
    }),
    {
      name: "beat-maker-app",
    }
  )
);
