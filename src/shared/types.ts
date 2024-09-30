export enum InstrumentName {
  Snare = "snare",
  BassKick = "bass-kick",
  HiHat = "hi-hat",
}

export interface Instrument {
  name: InstrumentName;
  image: string;
}

export interface Track {
  id: string;
  instrument: Instrument;
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
