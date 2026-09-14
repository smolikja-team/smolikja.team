/**
 * Hero logo loop. Four encodes of the same 16 s, 16:9 animation live in
 * public/assets/loop2x; the client picks one by physical viewport size and
 * connection quality (see `src/lib/video.ts`).
 */
export const heroVideo = {
  basePath: "/assets/loop2x/team-logo-",
  /** Order matters: the browser plays the first `<source>` it can decode. */
  formats: [
    { extension: "webm", type: "video/webm" },
    { extension: "mp4", type: "video/mp4" },
  ],
  resolutions: [
    { id: "480p", height: 480 },
    { id: "720p", height: 720 },
    { id: "1080p", height: 1080 },
    { id: "2160p", height: 2160 },
  ],
} as const;

export type HeroVideoResolution = (typeof heroVideo.resolutions)[number]["id"];

export function heroVideoSource(
  resolution: HeroVideoResolution,
  extension: (typeof heroVideo.formats)[number]["extension"],
): string {
  return `${heroVideo.basePath}${resolution}.${extension}`;
}
