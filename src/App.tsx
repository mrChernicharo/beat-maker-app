/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import "./App.css";

enum Sound {
  snare = "snare",
  bassKick = "bass-kick",
  hiHat = "hi-hat",
}

interface Track {
  sound: Sound;
  notes: (0 | 1)[];
}

interface Beat {
  id: string;
  title: string;
  description: string;
  bpm: number;
  beatsPerMeasure: number;
  notesPerBeat: number;
  tracks: Track[];
}

interface State {
  beats: Beat[];
  addBeat: (beat: Beat) => void;
  removeBeat: (id: string) => void;
}

const useStore = create<State>()(
  persist(
    (set, get) => ({
      beats: [],
      addBeat: (beat: Beat) => set({ beats: get().beats.concat(beat) }),
      removeBeat: (id: string) => set({ beats: get().beats.filter((b) => b.id !== id) }),
    }),
    {
      name: "beat-maker-app",
    }
  )
);

export function Dashboard() {
  const beatTitleInputRef = useRef<HTMLInputElement>(null);

  const { beats, addBeat, removeBeat } = useStore();

  async function handleAddBeat() {
    if (!beatTitleInputRef.current?.value) return;
    const newBeat: Beat = {
      id: crypto.randomUUID(),
      title: beatTitleInputRef.current.value,
      description: "",
      bpm: 120,
      beatsPerMeasure: 4,
      notesPerBeat: 4,
      tracks: [],
    };
    addBeat(newBeat);
    beatTitleInputRef.current.value = "";
  }

  async function handleRemoveBeat(id: string) {
    if (!beatTitleInputRef.current) return;
    removeBeat(id);
  }

  return (
    <div>
      <h1>My beats</h1>
      <ul>
        {beats.map((beat) => (
          <div key={beat.id}>
            <span>{beat.title}</span>
            <button onClick={() => handleRemoveBeat(beat.id)}>x</button>
          </div>
        ))}
      </ul>

      <div>
        <h2>Create new beat</h2>
        <label htmlFor="beat-title">Title</label>
        <input id="beat-title" type="text" ref={beatTitleInputRef} />
        <button onClick={handleAddBeat}>create beat</button>
      </div>
    </div>
  );
}
