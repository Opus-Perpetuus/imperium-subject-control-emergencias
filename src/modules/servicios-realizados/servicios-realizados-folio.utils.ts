export function is_blank_service_number(value: unknown): boolean {
  return value === undefined || value === null || String(value).trim() === "";
}

export function next_service_folio(count: number): string {
  return `SRV-${String(count + 1).padStart(6, "0")}`;
}
