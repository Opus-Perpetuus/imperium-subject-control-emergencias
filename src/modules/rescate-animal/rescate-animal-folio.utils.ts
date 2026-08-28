export function is_blank_intervention_number(value: unknown): boolean {
  return value === undefined || value === null || String(value).trim() === "";
}

export function next_rescue_folio(count: number): string {
  return `INT-${String(count + 1).padStart(6, "0")}`;
}
