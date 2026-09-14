import { Instrument_Sans } from "next/font/google";

// One family for everything: hierarchy comes from size and weight, not from a
// second typeface. `latin-ext` is required for Czech diacritics.
const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

export const fontVariables = instrumentSans.variable;
