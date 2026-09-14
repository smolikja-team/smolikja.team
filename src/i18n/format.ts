/**
 * Minimal `{placeholder}` interpolation for translation templates.
 *
 *   format("© {year} {name}", { year: 2026, name: "smolikja team" })
 *   // -> "© 2026 smolikja team"
 */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
