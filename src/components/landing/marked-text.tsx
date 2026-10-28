import { ScrollMarker } from "./scroll-marker";

/**
 * Catalog text in which `**…**` marks the key phrase: it is set in the
 * foreground colour, heavier when `bold`, and underlined as the reader
 * scrolls (`ScrollMarker`).
 */
export function MarkedText({ text, bold = false }: { text: string; bold?: boolean }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/).map((part, index) =>
        index % 2 === 1 ? (
          <ScrollMarker key={index} bold={bold}>
            {part}
          </ScrollMarker>
        ) : (
          part
        ),
      )}
    </>
  );
}
