import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";

const MAX_TRACKS = 6;

export function TracksDisplay() {
  const { beatId } = useParams();
  const { getBeatById, addNewTrack, removeTrack } = useAppStore();
  const beat = getBeatById(beatId!);

  if (!beat) return null;

  return (
    <div>
      <div>tracks</div>

      {beat.tracks.map((track) => (
        <div key={track.id}>
          <div>
            <img src={track.instrument.image} width={36} height={36} />
            <button onClick={() => removeTrack(beat.id, track.id)}>x</button>
          </div>
          <div>{track.instrument.name}</div>
        </div>
      ))}

      {beat.tracks.length < MAX_TRACKS && <button onClick={() => addNewTrack(beat.id)}>＋</button>}
    </div>
  );
}
