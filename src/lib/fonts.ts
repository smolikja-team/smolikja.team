import { Geist_Mono, Instrument_Sans, Unbounded } from "next/font/google";

// Three roles, each with its own face: Unbounded for headings — a wide,
// rounded modern technical face — Instrument Sans for reading and controls,
// and Geist Mono only for technology names, which are code. `latin-ext` is
// required for Czech diacritics.
const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

const geistMono = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin", "latin-ext"],
});

export const fontVariables = [unbounded.variable, instrumentSans.variable, geistMono.variable].join(" ");
