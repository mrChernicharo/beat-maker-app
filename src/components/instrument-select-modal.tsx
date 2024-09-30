import { useParams } from "react-router-dom";
import { INSTRUMENT_OPTIONS } from "../shared/blueprints";
import { useAppStore } from "../shared/store";

export function InstrumentSelectModal({
  selectedTrackId,
  setSelectedTrackId,
}: {
  selectedTrackId: string;
  setSelectedTrackId: (trackId: string) => void;
}) {
  const { beatId } = useParams();
  const { getBeatById, updateTrackInstrument } = useAppStore();
  const beat = getBeatById(beatId!);
  if (!beat) return null;

  return (
    <>
      {selectedTrackId && beat.tracks.some((tr) => tr.id === selectedTrackId) && (
        <div style={{ border: "1px solid" }}>
          <div>
            <span>selecionar instrumento</span>
            <button onClick={() => setSelectedTrackId("")}>x</button>
          </div>
          <div>
            <span>track: {selectedTrackId}</span>
          </div>

          <ul>
            {Object.values(INSTRUMENT_OPTIONS).map((inst) => (
              <li key={inst.name}>
                <button onClick={() => updateTrackInstrument(beat.id, selectedTrackId, inst)}>
                  <div>{inst.name}</div>
                  <img src={inst.image} width={36} height={36} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
