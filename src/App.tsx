/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { create } from "zustand";

interface Beat {
  id: string;
  title: string;
}

interface State {
  beats: Beat[];
}

interface Actions {
  addBeat: (beat: Beat) => void;
  setBeats: (beats: Beat[]) => void;
  removeBeat: (id: string) => void;
}

const useStore = create<State & Actions>((set) => ({
  beats: [],
  setBeats: (beats: Beat[]) => set((state: State) => ({ ...state, beats })),
  addBeat: (beat: Beat) => set((state: State) => ({ ...state, beats: [...state.beats, beat] })),
  removeBeat: (id: string) =>
    set((state: State) => ({ ...state, beats: state.beats.filter((beat) => beat.id !== id) })),
}));

function App() {
  const beatTitleInputRef = useRef<HTMLInputElement>(null);

  const { beats, addBeat, setBeats, removeBeat } = useStore();

  async function handleAddBeat() {
    if (!beatTitleInputRef.current?.value) return;
    const newBeat = { id: crypto.randomUUID(), title: beatTitleInputRef.current.value };
    addBeat(newBeat);
    localStorage.setItem("beats", JSON.stringify([...(JSON.parse(localStorage.getItem("beats")!) as Beat[]), newBeat]));
    beatTitleInputRef.current.value = "";
  }

  async function handleRemoveBeat(id: string) {
    if (!beatTitleInputRef.current) return;
    removeBeat(id);
    localStorage.setItem(
      "beats",
      JSON.stringify([...(JSON.parse(localStorage.getItem("beats")!) as Beat[])].filter((beat) => beat.id !== id))
    );
  }

  useEffect(() => {
    if (!localStorage.getItem("beats")) {
      localStorage.setItem("beats", JSON.stringify([]));
    }
    setBeats(JSON.parse(localStorage.getItem("beats")!));
  }, [setBeats]);

  return (
    <div>
      <h1>beat maker</h1>

      <div>
        <label htmlFor="beat-title">Title</label>
        <input id="beat-title" type="text" ref={beatTitleInputRef} />
        <button onClick={handleAddBeat}>create beat</button>
      </div>

      <ul>
        {beats.map((beat) => (
          <div key={beat.id}>
            <span>{beat.title}</span>
            <button onClick={() => handleRemoveBeat(beat.id)}>x</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
