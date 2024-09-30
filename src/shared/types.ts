export enum InstrumentName {
  Snare = "snare",
  BassKick = "bass-kick",
  HiHat = "hi-hat",
}

export interface Bar {
  id: string;
  notes: Array<0 | 1>;
}

export interface Instrument {
  name: InstrumentName;
  image: string;
}

export interface Track {
  id: string;
  instrument: Instrument;
  bars: Bar[];
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
