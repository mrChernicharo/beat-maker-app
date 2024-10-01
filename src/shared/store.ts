import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Beat, Instrument } from "./types";
import { DEFAULT_TRACK } from "./blueprints";

export interface State {
  beats: Beat[];
  getBeatById: (id: string) => Beat | undefined;
  addBeat: (beat: Beat) => void;
  removeBeat: (beatId: string) => void;
  updateBeat: (beatId: string, info: Partial<Beat>) => void;
  addBar: (beatId: string) => void;
  removeBar: (beatId: string) => void;
  addNewTrack: (beatId: string) => void;
  removeTrack: (beatId: string, trackId: string) => void;
  updateTrackInstrument: (beatId: string, trackId: string, instrument: Instrument) => void;
  toggleNote: (beatId: string, trackId: string, barIdx: number, noteIdx: number) => void;
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
        const res = { ...beatsCopy[idx], ...info };

        for (const track of res.tracks) {
          for (const bar of track.bars) {
            bar.notes = Array(res.beatsPerBar * res.notesPerBeat).fill(0);
          }
        }
        beatsCopy[idx] = res;

        return set({ beats: beatsCopy });
      },
      addNewTrack: (beatId: string) => {
        const beatsCopy = get().beats;
        const beatIdx = beatsCopy.findIndex((b) => b.id === beatId);
        if (beatIdx < 0) return;

        beatsCopy[beatIdx] = {
          ...beatsCopy[beatIdx],
          tracks: beatsCopy[beatIdx].tracks.concat({
            ...DEFAULT_TRACK,
            id: crypto.randomUUID(),
            bars: [
              {
                id: crypto.randomUUID(),
                notes: Array(beatsCopy[beatIdx].beatsPerBar * beatsCopy[beatIdx].notesPerBeat).fill(0),
              },
              {
                id: crypto.randomUUID(),
                notes: Array(beatsCopy[beatIdx].beatsPerBar * beatsCopy[beatIdx].notesPerBeat).fill(0),
              },
            ],
          }),
        };
        return set({ beats: beatsCopy });
      },
      removeTrack: (beatId: string, trackId: string) => {
        const beatsCopy = get().beats;
        const beatIdx = beatsCopy.findIndex((b) => b.id === beatId);
        if (beatIdx < 0) return;
        beatsCopy[beatIdx] = {
          ...beatsCopy[beatIdx],
          tracks: beatsCopy[beatIdx].tracks.filter((tr) => tr.id !== trackId),
        };
        return set({ beats: beatsCopy });
      },
      addBar: (beatId: string) => {
        const beatsCopy = get().beats;
        const idx = beatsCopy.findIndex((b) => b.id === beatId);
        if (idx < 0) return;
        for (const tr of beatsCopy[idx].tracks) {
          tr.bars.push({ id: crypto.randomUUID(), notes: Array(tr.bars[0].notes.length).fill(0) });
        }
        return set({ beats: beatsCopy });
      },
      removeBar: (beatId: string) => {
        const beatsCopy = get().beats;
        const idx = beatsCopy.findIndex((b) => b.id === beatId);
        if (idx < 0) return;
        for (const tr of beatsCopy[idx].tracks) {
          tr.bars.pop();
        }
        return set({ beats: beatsCopy });
      },
      updateTrackInstrument: (beatId: string, trackId: string, instrument: Instrument) => {
        const beatsCopy = get().beats;
        const beatIdx = beatsCopy.findIndex((b) => b.id === beatId);
        if (beatIdx < 0) return;
        const beat = beatsCopy[beatIdx];
        const trackCopy = beat.tracks.find((tr) => tr.id === trackId);
        if (!trackCopy) return;
        trackCopy.instrument = instrument;
        return set({ beats: beatsCopy });
      },
      toggleNote: (beatId: string, trackId: string, barIdx: number, noteIdx: number) => {
        const beatsCopy = get().beats;
        const beatIdx = beatsCopy.findIndex((b) => b.id === beatId);
        if (beatIdx < 0) return;
        const beat = beatsCopy[beatIdx];
        const trackCopy = beat.tracks.find((tr) => tr.id === trackId);
        if (!trackCopy) return;
        const bar = trackCopy.bars[barIdx];
        bar.notes[noteIdx] = bar.notes[noteIdx] === 1 ? 0 : 1;
        return set({ beats: beatsCopy });
      },
    }),
    {
      name: "beat-maker-app",
    }
  )
);
