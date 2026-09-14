import { describe, expect, it } from "vitest";

import { physicalMaxDimension, pickHeroVideoResolution } from "./video";

describe("physicalMaxDimension", () => {
  it("uses the longer edge and caps the pixel ratio at 2", () => {
    expect(physicalMaxDimension(390, 844)).toBe(844);
    expect(physicalMaxDimension(390, 844, 3)).toBe(1688);
    expect(physicalMaxDimension(1440, 900, 2)).toBe(2880);
    expect(physicalMaxDimension(1440, 900, 0.5)).toBe(1440);
  });
});

describe("pickHeroVideoResolution", () => {
  it("steps up with the physical viewport", () => {
    expect(pickHeroVideoResolution(844)).toBe("480p");
    expect(pickHeroVideoResolution(1400)).toBe("720p");
    expect(pickHeroVideoResolution(2880)).toBe("1080p");
    expect(pickHeroVideoResolution(3840)).toBe("2160p");
  });

  it("returns null for data-saver and 2G-class connections", () => {
    expect(pickHeroVideoResolution(2880, { saveData: true })).toBeNull();
    expect(pickHeroVideoResolution(2880, { effectiveType: "2g" })).toBeNull();
    expect(pickHeroVideoResolution(2880, { effectiveType: "slow-2g" })).toBeNull();
  });

  it("caps 3g connections at 720p without upgrading smaller picks", () => {
    expect(pickHeroVideoResolution(3840, { effectiveType: "3g" })).toBe("720p");
    expect(pickHeroVideoResolution(844, { effectiveType: "3g" })).toBe("480p");
    expect(pickHeroVideoResolution(3840, { effectiveType: "4g" })).toBe("2160p");
  });
});
