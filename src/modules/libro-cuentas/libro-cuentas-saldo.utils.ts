export type LibroCuentasMovimientoSaldo = {
  id?: unknown;
  fecha?: string | null;
  tipo?: string | null;
  importe?: number | string | null;
  created_at?: string | null;
  saldo?: number;
};

function movement_time(value: string | null | undefined): number {
  if (!value) return Number.POSITIVE_INFINITY;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? Number.POSITIVE_INFINITY : time;
}

export function signed_importe(
  tipo: string | null | undefined,
  importe: number | string | null | undefined,
): number {
  const amount = Math.abs(Number(importe));
  if (!Number.isFinite(amount) || amount === 0) return 0;
  if (tipo === "salida") return -amount;
  if (tipo === "entrada") return amount;
  return 0;
}

function compare_movements(
  left: LibroCuentasMovimientoSaldo,
  right: LibroCuentasMovimientoSaldo,
): number {
  const by_fecha = movement_time(left.fecha) - movement_time(right.fecha);
  if (by_fecha !== 0) return by_fecha;
  const by_created =
    movement_time(left.created_at) - movement_time(right.created_at);
  if (by_created !== 0) return by_created;
  return String(left.id ?? "").localeCompare(String(right.id ?? ""));
}

export function compute_running_saldos<T extends LibroCuentasMovimientoSaldo>(
  movements: readonly T[],
): Array<T & { saldo: number }> {
  const ordered = [...movements].sort(compare_movements);
  let saldo = 0;
  return ordered.map((movement) => {
    saldo += signed_importe(movement.tipo, movement.importe);
    return { ...movement, saldo };
  });
}

export function prepare_movement_payload(
  body: Record<string, unknown>,
): Record<string, unknown> {
  delete body.saldo;
  const motivo = String(body.motivo ?? body.name ?? "").trim();
  body.motivo = motivo;
  body.name = motivo || "Movimiento";
  const importe = Math.abs(Number(body.importe));
  body.importe = Number.isFinite(importe) ? importe : 0;
  body.tipo = body.tipo === "salida" ? "salida" : "entrada";
  if (!body.fecha) {
    body.fecha = new Date().toISOString().slice(0, 10);
  }
  return body;
}
