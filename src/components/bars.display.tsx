import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";

const MAX_BARS = 4;
const MIN_BARS = 1;
const INITIAL_BARS = 2;

export function BarsDisplay() {
  const { beatId } = useParams();
  const { getBeatById, addBar, removeBar } = useAppStore();
  const beat = getBeatById(beatId!);

  if (!beat) return null;
  const barCount = beat.tracks?.[0]?.bars?.length || INITIAL_BARS;

  return (
    <div>
      <div>
        <label htmlFor="bars">Compassos</label>
      </div>

      <button onClick={() => barCount > MIN_BARS && removeBar(beat.id)}>−</button>
      <div>{barCount}</div>
      <button onClick={() => barCount < MAX_BARS && addBar(beat.id)}>＋</button>
    </div>
  );
}
