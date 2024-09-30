export enum Sound {
  snare = "snare",
  bassKick = "bass-kick",
  hiHat = "hi-hat",
}

export interface Track {
  sound: Sound;
  notes: (0 | 1)[];
}

export interface Beat {
  id: string;
  title: string;
  description: string;
  bpm: number;
  beatsPerBar: number;
  notesPerBeat: number;
  tracks: Track[];
}
