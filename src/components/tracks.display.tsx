import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";
import { InstrumentSelectModal } from "./instrument-select-modal";
import { NoteToggleButton } from "./note-toggle-btn";
import { usePlay } from "../hooks/usePlay";

const MAX_TRACKS = 6;

export function TracksDisplay() {
  const { beatId } = useParams();
  const { getBeatById, addNewTrack, removeTrack } = useAppStore();
  const beat = getBeatById(beatId!);
  const { isPlaying, currNoteIdx, playPause } = usePlay(beatId!);

  const [selectedTrackId, setSelectedTrackId] = useState("");

  if (!beat) return null;

  return (
    <div className="relative border-2" style={{ maxWidth: "calc(100vw - 100px)" }}>
      <div>tracks</div>

      <div className="absolute">
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
          <div key={track.id} className="flex py-2 gap-2">
            {track.bars.map((bar, barIdx) => (
              <div key={bar.id} className="flex bg-green-800 p-1">
                {bar.notes.map((note, noteIdx) => (
                  <NoteToggleButton
                    key={`note-${trIdx}-${noteIdx}`}
                    trackId={track.id}
                    trackIdx={trIdx}
                    barIdx={barIdx}
                    noteIdx={noteIdx}
                    note={note}
                    isCurrent={currNoteIdx === noteIdx + barIdx * beat.beatsPerBar * beat.notesPerBeat}
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

      <div>
        <button onClick={playPause}>{isPlaying ? "Pause" : "Play"}</button>
      </div>
    </div>
  );
}
