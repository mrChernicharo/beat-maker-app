import { Track, InstrumentName, Instrument } from "./types";

export const INSTRUMENT_OPTIONS: { [name: string]: Instrument } = {
  [InstrumentName.HiHat]: {
    name: InstrumentName.HiHat,
    image: "/images/hi-hat.png",
  },
  [InstrumentName.Snare]: {
    name: InstrumentName.Snare,
    image: "/images/snare.png",
  },
  [InstrumentName.BassKick]: {
    name: InstrumentName.BassKick,
    image: "/images/bass-kick.png",
  },
};

export const DEFAULT_TRACK: Track = {
  id: "default-track",
  instrument: INSTRUMENT_OPTIONS[InstrumentName.HiHat],
  bars: [],
};
