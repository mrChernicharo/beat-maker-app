import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";

function NoteToggleButtonComponent({
  note,
  noteIdx,
  barIdx,
  trackId,
  // trackIdx,
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
    console.log({ trackId, barIdx, noteIdx, note });
    toggleNote(beat.id, trackId, barIdx, noteIdx);
  }, [barIdx, beat, note, noteIdx, toggleNote, trackId]);

  if (!beat) return null;

  const background = note === 1 ? (isCurrent ? "dodgerblue" : "darkblue") : isCurrent ? "gray" : "";

  // const bar = beat.tracks[trackIdx].bars[barIdx];
  const isCabecaDeTempo = noteIdx % beat.beatsPerBar === 0;

  return (
    <div style={{ marginInline: 2, marginLeft: isCabecaDeTempo ? 10 : 0 }}>
      <button style={{ background }} onClick={toggle}>
        {/* &nbsp; */}
        {noteIdx + barIdx * beat.beatsPerBar * beat.notesPerBeat}
      </button>
    </div>
  );
}

export const NoteToggleButton = memo(NoteToggleButtonComponent);
