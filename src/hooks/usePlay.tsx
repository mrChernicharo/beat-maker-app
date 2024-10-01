import { useState, useEffect } from "react";
import { useAppStore } from "../shared/store";
import { Beat } from "../shared/types";

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
