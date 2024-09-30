import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";

const MIN_NOTES_PER_BEAT = 2;
const MAX_NOTES_PER_BEAT = 8;
export function NotesPerBeatDisplay() {
  const { beatId } = useParams();
  const { getBeatById, updateBeat } = useAppStore();
  const beat = getBeatById(beatId!);

  if (!beat) return null;

  return (
    <div>
      <label>Notas por tempo</label>
      <input
        type="number"
        name="beats-per-measure"
        id="beats-per-measure"
        min={MIN_NOTES_PER_BEAT}
        max={MAX_NOTES_PER_BEAT}
        defaultValue={beat.notesPerBeat}
        onChange={(e) => {
          const val = e.target.valueAsNumber;
          if (val < MIN_NOTES_PER_BEAT || val > MAX_NOTES_PER_BEAT) return;
          updateBeat(beat.id, { notesPerBeat: val });
        }}
        onBlur={(e) => {
          const val = e.target.valueAsNumber;
          if (val < MIN_NOTES_PER_BEAT || val > MAX_NOTES_PER_BEAT) {
            e.target.value = String(4);
            updateBeat(beat.id, { notesPerBeat: e.target.valueAsNumber });
          }
        }}
      />
    </div>
  );
}
