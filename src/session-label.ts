const ACCEPTED_LABELS = new Set(["stable", "native"]);

export function formatSessionLabel(label: string, title: string): string {
  if (!ACCEPTED_LABELS.has(label)) {
    throw new Error(`Unsupported label: ${label}`);
  }
  const normalized = title.trim().replace(/\s+/g, " ");
  if (!normalized) {
    throw new Error("Empty title");
  }
  return `${label}: ${normalized}`;
}
