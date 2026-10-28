import { describe, expect, it } from "vitest";

import { typeset } from "./typography";

const NBSP = " ";

describe("typeset", () => {
  it("keeps Czech one-letter prepositions and conjunctions with the next word", () => {
    expect(typeset("Pomohu vám vymyslet, postavit a zabezpečit aplikaci.", "cs")).toBe(
      `Pomohu vám vymyslet, postavit a${NBSP}zabezpečit aplikaci.`,
    );
    expect(typeset("u prvního nápadu i u hotové aplikace", "cs")).toBe(
      `u${NBSP}prvního nápadu i${NBSP}u${NBSP}hotové aplikace`,
    );
    expect(typeset("V Praze (s vámi)", "cs")).toBe(`V${NBSP}Praze (s${NBSP}vámi)`);
  });

  it("leaves words that merely end in one of those letters alone", () => {
    expect(typeset("od nápadu kdekoli dál", "cs")).toBe("od nápadu kdekoli dál");
    expect(typeset("UX a UI design", "cs")).toBe(`UX a${NBSP}UI design`);
  });

  it("never lets a spaced dash start a line, in any locale", () => {
    expect(typeset("kdekoli – u prvního nápadu", "cs")).toBe(`kdekoli${NBSP}– u${NBSP}prvního nápadu`);
    expect(typeset("businesses – from the first idea", "en")).toBe(
      `businesses${NBSP}– from the first idea`,
    );
  });

  it("does not apply the Czech rule to English", () => {
    expect(typeset("a first idea or a finished app", "en")).toBe("a first idea or a finished app");
  });

  it("walks nested objects and arrays", () => {
    expect(typeset({ items: [{ text: "s AI" }], count: 2 }, "cs")).toEqual({
      items: [{ text: `s${NBSP}AI` }],
      count: 2,
    });
  });
});
