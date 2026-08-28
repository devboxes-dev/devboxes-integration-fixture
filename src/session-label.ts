const NATIVE_LABEL = "stable";

export function formatSessionLabel(label: string, title: string): string {
  if (label !== NATIVE_LABEL) {
    throw new Error(`Unsupported label: ${label}`);
  }
  const normalized = title.trim().replace(/\s+/g, " ");
  if (!normalized) {
    throw new Error("Empty title");
  }
  return `${label}: ${normalized}`;
}
