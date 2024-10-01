import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";

function NoteToggleButtonComponent({
  note,
  noteIdx,
  barIdx,
  trackId,
  trackIdx,
  isCurrent,
}: {
  note: number;
  noteIdx: number;
  barIdx: number;
  trackId: string;
  trackIdx: number;
  isCurrent: boolean;
}) {
  const { beatId } = useParams();
  const { getBeatById, toggleNote } = useAppStore();
  const beat = getBeatById(beatId!);

  const toggle = useCallback(() => {
    if (!beat) return;
    console.log({ trackId, trackIdx, barIdx, noteIdx, note });
    toggleNote(beat.id, trackId, barIdx, noteIdx);
  }, [barIdx, beat, note, noteIdx, toggleNote, trackId, trackIdx]);

  if (!beat) return null;

  const background = note === 1 ? (isCurrent ? "dodgerblue" : "darkblue") : isCurrent ? "gray" : "";

  // const bar = beat.tracks[trackIdx].bars[barIdx];
  const isCabecaDeTempo = noteIdx % beat.notesPerBeat === 0;
  // beat.tracks[trackIdx].bars[0].notes;

  return (
    <div className="">
      <button style={{ background }} onClick={toggle}>
        {/* &nbsp; */}
        {noteIdx + barIdx * beat.beatsPerBar * beat.notesPerBeat}
        {/* {noteIdx + 1 + barIdx * beat.beatsPerBar * beat.notesPerBeat} */}
      </button>
      {isCabecaDeTempo && <div className="w-2 h-4 bg-white"></div>}
    </div>
  );
}

export const NoteToggleButton = memo(NoteToggleButtonComponent);
