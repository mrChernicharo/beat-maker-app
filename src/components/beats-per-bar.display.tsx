import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";

const MIN_BEATS_PER_BAR = 2;
const MAX_BEATS_PER_BAR = 7;
export function BeatsPerBarDisplay() {
  const { beatId } = useParams();
  const { getBeatById, updateBeat } = useAppStore();
  const beat = getBeatById(beatId!);

  if (!beat) return null;

  return (
    <div>
      <label>Tempos por compasso</label>
      <input
        type="number"
        name="beats-per-measure"
        id="beats-per-measure"
        min={MIN_BEATS_PER_BAR}
        max={MAX_BEATS_PER_BAR}
        defaultValue={beat.beatsPerBar}
        onChange={(e) => {
          const val = e.target.valueAsNumber;
          if (val < MIN_BEATS_PER_BAR || val > MAX_BEATS_PER_BAR) return;
          updateBeat(beat.id, { beatsPerBar: val });
        }}
        onBlur={(e) => {
          const val = e.target.valueAsNumber;
          if (val < MIN_BEATS_PER_BAR || val > MAX_BEATS_PER_BAR) {
            e.target.value = String(4);
            updateBeat(beat.id, { beatsPerBar: e.target.valueAsNumber });
          }
        }}
      />
    </div>
  );
}
