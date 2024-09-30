import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Beat, InstrumentName, Track } from "./types";

export const DEFAULT_TRACK: Track = {
  id: "default-track",
  instrument: {
    name: InstrumentName.BassKick,
    image: "/images/bass-kick.png",
  },
  notes: [],
};

export interface State {
  beats: Beat[];
  getBeatById: (id: string) => Beat | undefined;
  addBeat: (beat: Beat) => void;
  removeBeat: (beatId: string) => void;
  updateBeat: (beatId: string, info: Partial<Beat>) => void;
  addNewTrack: (beatId: string) => void;
  removeTrack: (beatId: string, trackId: string) => void;
}

export const useAppStore = create<State>()(
  persist(
    (set, get) => ({
      beats: [],
      getBeatById: (id: string) => get().beats.find((b) => b.id === id),
      addBeat: (beat: Beat) => set({ beats: get().beats.concat(beat) }),
      removeBeat: (beatId: string) => set({ beats: get().beats.filter((b) => b.id !== beatId) }),
      updateBeat(beatId: string, info: Partial<Beat>) {
        const beatsCopy = get().beats;
        const idx = beatsCopy.findIndex((b) => b.id === beatId);
        if (idx < 0) return;
        beatsCopy[idx] = { ...beatsCopy[idx], ...info };
        return set({ beats: beatsCopy });
      },
      addNewTrack: (beatId: string) => {
        const beatsCopy = get().beats;
        const idx = beatsCopy.findIndex((b) => b.id === beatId);
        if (idx < 0) return;
        beatsCopy[idx] = {
          ...beatsCopy[idx],
          tracks: beatsCopy[idx].tracks.concat({ ...DEFAULT_TRACK, id: crypto.randomUUID() }),
        };
        return set({ beats: beatsCopy });
      },
      removeTrack: (beatId: string, trackId: string) => {
        const beatsCopy = get().beats;
        const idx = beatsCopy.findIndex((b) => b.id === beatId);
        if (idx < 0) return;
        beatsCopy[idx] = { ...beatsCopy[idx], tracks: beatsCopy[idx].tracks.filter((tr) => tr.id !== trackId) };
        return set({ beats: beatsCopy });
      },
    }),
    {
      name: "beat-maker-app",
    }
  )
);
