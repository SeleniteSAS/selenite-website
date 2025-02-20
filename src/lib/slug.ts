export function normalizeSlug(baseSlug: string, label: string): string {
  return `${baseSlug}${baseSlug.endsWith("/") ? "" : "/"}${label}`
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/œ/g, "oe")
    .replace(/'/g, "")
    .replace("’", "")
    .replace(/"/g, "")
    .replace(/“/g, "")
    .replace(/”/g, "")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-");
}
