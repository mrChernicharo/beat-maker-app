import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";

const MIN_BPM = 40;
const MAX_BPM = 360;
export function BpmDisplay() {
  const { beatId } = useParams();
  const { getBeatById, updateBeat } = useAppStore();
  const beat = getBeatById(beatId!);

  if (!beat) return null;

  return (
    <div>
      <label htmlFor="bpm">BPM</label>
      <input
        type="number"
        name="bpm"
        id="bpm"
        defaultValue={beat.bpm}
        min={MIN_BPM}
        max={MAX_BPM}
        onChange={(e) => {
          const val = e.target.valueAsNumber;
          if (val < MIN_BPM || val > MAX_BPM) return;
          updateBeat(beat.id, { bpm: val });
        }}
        onBlur={(e) => {
          const val = e.target.valueAsNumber;
          if (val < MIN_BPM) {
            e.target.value = String(MIN_BPM);
            updateBeat(beat.id, { bpm: MIN_BPM });
          }
          if (val > MAX_BPM) {
            e.target.value = String(MAX_BPM);
            updateBeat(beat.id, { bpm: MAX_BPM });
          }
        }}
      />
    </div>
  );
}
