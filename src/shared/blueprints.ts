import { Track, InstrumentName, Instrument } from "./types";

export const INSTRUMENT_OPTIONS: { [name: string]: Instrument } = {
  [InstrumentName.HiHat]: {
    name: InstrumentName.HiHat,
    image: "/images/hi-hat.png",
    sound: "/sounds/hi-hat.mp3",
  },
  [InstrumentName.Snare]: {
    name: InstrumentName.Snare,
    image: "/images/snare.png",
    sound: "/sounds/snare.mp3",
  },
  [InstrumentName.BassKick]: {
    name: InstrumentName.BassKick,
    image: "/images/bass-kick.png",
    sound: "/sounds/bass-kick.mp3",
  },
};

export const DEFAULT_TRACK: Track = {
  id: "default-track",
  instrument: INSTRUMENT_OPTIONS[InstrumentName.HiHat],
  bars: [],
};
