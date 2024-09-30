import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";
import { useState } from "react";
import { InstrumentSelectModal } from "./instrument-select-modal";
import { NoteToggleButton } from "./note-toggle-btn";

const MAX_TRACKS = 6;

export function TracksDisplay() {
  const { beatId } = useParams();
  const { getBeatById, addNewTrack, removeTrack } = useAppStore();
  const beat = getBeatById(beatId!);

  const [selectedTrackId, setSelectedTrackId] = useState("");

  if (!beat) return null;

  return (
    <div style={{ position: "relative", border: "1px dashed gray", maxWidth: "calc(100vw - 100px)" }}>
      <div>tracks</div>

      <div style={{ position: "absolute" }}>
        {beat.tracks.map((track) => (
          <div key={track.id} style={{ display: "flex" }}>
            <div>
              <button onClick={() => removeTrack(beat.id, track.id)}>🗑️</button>
              <button onClick={() => setSelectedTrackId(track.id)}>
                <img src={track.instrument.image} width={36} height={36} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ overflowX: "scroll", marginLeft: "150px" }}>
        {beat.tracks.map((track, trIdx) => (
          <div key={track.id} style={{ display: "flex", paddingBlock: "10px" }}>
            {track.bars.map((bar, barIdx) => (
              <div key={bar.id} style={{ border: "1px dashed green", display: "flex" }}>
                {bar.notes.map((note, noteIdx) => (
                  <NoteToggleButton
                    key={`note-${trIdx}-${noteIdx}`}
                    barIdx={barIdx}
                    trackId={track.id}
                    noteIdx={noteIdx}
                    note={note}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {beat.tracks.length < MAX_TRACKS && (
        <div>
          <button onClick={() => addNewTrack(beat.id)}>＋ Faixa</button>
        </div>
      )}

      <InstrumentSelectModal selectedTrackId={selectedTrackId} setSelectedTrackId={setSelectedTrackId} />
    </div>
  );
}
