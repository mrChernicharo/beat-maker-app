import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";
import { useEffect, useState } from "react";
import { InstrumentSelectModal } from "./instrument-select-modal";
import { NoteToggleButton } from "./note-toggle-btn";
import { Beat } from "../shared/types";

const MAX_TRACKS = 6;

export function usePlay(beatId: string) {
  const { getBeatById } = useAppStore();
  const beat = getBeatById(beatId!) as Beat;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currNoteIdx, setCurrNoteIdx] = useState(0);

  const currBar = Math.floor(currNoteIdx / (beat.beatsPerBar * beat.notesPerBeat));
  const currBarBeat = Math.floor(currNoteIdx / beat.notesPerBeat) - currBar * beat.beatsPerBar;

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        setCurrNoteIdx((curr) => {
          return curr + 1 >= beat.beatsPerBar * beat.notesPerBeat * beat.tracks[0].bars.length ? 0 : curr + 1;
        });
      } else {
        clearInterval(timer);
      }
    }, 60_000 / (beat.bpm * beat.beatsPerBar));

    return () => {
      clearTimeout(timer);
    };
  }, [beat.beatsPerBar, beat.bpm, beat.notesPerBeat, beat.tracks, isPlaying]);

  useEffect(() => {
    console.log(currNoteIdx, currBar, currBarBeat);
  }, [currBar, currNoteIdx, currBarBeat]);

  return {
    isPlaying,
    currNoteIdx,
    playPause: () => setIsPlaying((prev) => !prev),
  };
}

export function TracksDisplay() {
  const { beatId } = useParams();
  const { getBeatById, addNewTrack, removeTrack } = useAppStore();
  const beat = getBeatById(beatId!);
  const { isPlaying, currNoteIdx, playPause } = usePlay(beatId!);

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
              <div key={bar.id} style={{ display: "flex" }}>
                {bar.notes.map((note, noteIdx) => (
                  <NoteToggleButton
                    key={`note-${trIdx}-${noteIdx}`}
                    barIdx={barIdx}
                    trackId={track.id}
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
