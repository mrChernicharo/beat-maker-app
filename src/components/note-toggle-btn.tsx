import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";

function NoteToggleButtonComponent({
  note,
  noteIdx,
  barIdx,
  trackId,
}: {
  note: number;
  noteIdx: number;
  barIdx: number;
  trackId: string;
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

  return (
    <div style={{ marginInline: 2, marginLeft: noteIdx % beat.beatsPerBar === 0 ? 10 : 0 }}>
      <button style={{ background: note ? "blue" : "" }} onClick={toggle}>
        &nbsp;
      </button>
    </div>
  );
}

export const NoteToggleButton = memo(NoteToggleButtonComponent);
