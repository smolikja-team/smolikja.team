import { ScrollMarker } from "./scroll-marker";

/**
 * Catalog text in which `**…**` marks the key phrase: it is set in the
 * foreground colour and a heavier weight and underlined as the reader
 * scrolls (`ScrollMarker`).
 */
export function MarkedText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/).map((part, index) =>
        index % 2 === 1 ? <ScrollMarker key={index}>{part}</ScrollMarker> : part,
      )}
    </>
  );
}
