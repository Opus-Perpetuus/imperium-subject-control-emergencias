/** Estado calculado de un producto con caducidad y stock mínimo. */
export type StockEstado = "ok" | "stock_bajo" | "por_caducar" | "caducado";

/** Días antes de la caducidad a partir de los cuales se avisa. */
export const DIAS_AVISO_CADUCIDAD = 30;

/**
 * Caducado / por caducar mandan sobre el stock; si no hay caducidad próxima,
 * la cantidad igual o por debajo del mínimo es stock bajo.
 */
export function compute_estado(
  fecha_caducidad: unknown,
  cantidad: unknown,
  stock_minimo: unknown,
  ahora: Date = new Date(),
): StockEstado {
  if (fecha_caducidad) {
    const caducidad_ms = new Date(String(fecha_caducidad)).getTime();
    if (!Number.isNaN(caducidad_ms)) {
      const dias_restantes = (caducidad_ms - ahora.getTime()) / 86_400_000;
      if (dias_restantes < 0) return "caducado";
      if (dias_restantes <= DIAS_AVISO_CADUCIDAD) return "por_caducar";
    }
  }
  if (Number(cantidad ?? 0) <= Number(stock_minimo ?? 0)) return "stock_bajo";
  return "ok";
}
