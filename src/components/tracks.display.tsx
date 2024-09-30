import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";
import { useState } from "react";
import { INSTRUMENT_OPTIONS } from "../shared/blueprints";

const MAX_TRACKS = 6;

export function TracksDisplay() {
  const { beatId } = useParams();
  const { getBeatById, addNewTrack, removeTrack } = useAppStore();
  const beat = getBeatById(beatId!);

  const [selectedTrackId, setSelectedTrackId] = useState("");

  if (!beat) return null;

  return (
    <div style={{ border: "1px solid" }}>
      <div>tracks</div>

      {beat.tracks.map((track) => (
        <div key={track.id}>
          {/* {track} */}
          <div>
            <button onClick={() => removeTrack(beat.id, track.id)}>🗑️</button>
            <button onClick={() => setSelectedTrackId(track.id)}>
              <img src={track.instrument.image} width={36} height={36} />
            </button>
          </div>

          <div>
            {/* {track} */}
            {/* {track.bars.map((bar) => (
              <div key={bar.id}>
                {bar.notes.map((note) => (
                  <div>{note}</div>
                ))}
              </div>
            ))} */}
          </div>
        </div>
      ))}

      {beat.tracks.length < MAX_TRACKS && (
        <div>
          <button onClick={() => addNewTrack(beat.id)}>＋ Faixa</button>
        </div>
      )}

      <InstrumentSelectModal selectedTrackId={selectedTrackId} setSelectedTrackId={setSelectedTrackId} />
    </div>
  );
}

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
