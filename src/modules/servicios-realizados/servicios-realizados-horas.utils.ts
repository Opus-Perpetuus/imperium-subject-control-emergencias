export function compute_total_horas(inicio: unknown, fin: unknown): number {
  if (!inicio || !fin) return 0;
  const inicio_ms = new Date(String(inicio)).getTime();
  const fin_ms = new Date(String(fin)).getTime();
  if (Number.isNaN(inicio_ms) || Number.isNaN(fin_ms)) return 0;
  const horas = (fin_ms - inicio_ms) / (1000 * 60 * 60);
  return horas > 0 ? Math.round(horas * 100) / 100 : 0;
}
