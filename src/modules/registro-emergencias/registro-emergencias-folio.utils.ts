export function is_blank_aviso_number(value: unknown): boolean {
  return value === undefined || value === null || String(value).trim() === "";
}

export function next_aviso_folio(count: number): string {
  return `AVISO-${String(count + 1).padStart(5, "0")}`;
}
