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
          const nextIdx = curr + 1 >= beat.beatsPerBar * beat.notesPerBeat * beat.tracks[0].bars.length ? 0 : curr + 1;
          const barIdx = Math.floor(nextIdx / (beat.beatsPerBar * beat.notesPerBeat));
          const barNoteIdx = nextIdx - barIdx * beat.beatsPerBar * beat.notesPerBeat;

          // console.log({ barNoteIdx, barIdx, nextIdx });

          const soundsToPlay: HTMLAudioElement[] = [];
          (beat?.tracks || []).forEach((tr) => {
            if (tr.bars[barIdx]?.notes[barNoteIdx] !== 0) {
              soundsToPlay.push(new Audio(tr.instrument.sound));
            }
          });

          soundsToPlay.forEach((audio) => {
            audio.play();
          });

          return nextIdx;
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
