/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

import { Link } from "react-router-dom";
import { Beat } from "../shared/types";
import { useAppStore } from "../shared/store";

export function Dashboard() {
  const beatTitleInputRef = useRef<HTMLInputElement>(null);

  const { beats, addBeat, removeBeat } = useAppStore();

  async function handleAddBeat() {
    if (!beatTitleInputRef.current?.value) return;
    const newBeat: Beat = {
      id: crypto.randomUUID(),
      title: beatTitleInputRef.current.value,
      description: "",
      bpm: 120,
      beatsPerBar: 4,
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
            <Link to={`/beat/${beat.id}`}>
              <span>{beat.title}</span>
              <button onClick={() => handleRemoveBeat(beat.id)}>x</button>
            </Link>
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
