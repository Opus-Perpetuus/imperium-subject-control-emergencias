import { KirletHttpError } from "@opus-perpetuus/imperium-core-kit";

export type InventarioSanitarioStock = {
  cantidad: number;
  entradas: number;
  salidas: number;
  fecha_salida?: string | null;
};

function to_non_negative_number(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return parsed;
}

function to_optional_date_text(value: unknown): string | undefined {
  if (value == null || value === "") return undefined;
  if (typeof value === "string" && value.trim()) return value.trim();
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

export function apply_entrada(
  stock: InventarioSanitarioStock,
  entrar: unknown,
): InventarioSanitarioStock {
  const cantidad = to_non_negative_number(stock.cantidad);
  const entradas = to_non_negative_number(stock.entradas);
  const salidas = to_non_negative_number(stock.salidas);
  const qty = to_non_negative_number(entrar);
  if (qty === 0) {
    return { cantidad, entradas, salidas, fecha_salida: stock.fecha_salida };
  }
  return {
    cantidad: cantidad + qty,
    entradas: entradas + qty,
    salidas,
    fecha_salida: stock.fecha_salida,
  };
}

export function apply_salida(
  stock: InventarioSanitarioStock,
  salir: unknown,
  fecha_salida?: unknown,
  ahora: Date = new Date(),
): InventarioSanitarioStock {
  const cantidad = to_non_negative_number(stock.cantidad);
  const entradas = to_non_negative_number(stock.entradas);
  const salidas = to_non_negative_number(stock.salidas);
  const qty = to_non_negative_number(salir);
  if (qty === 0) {
    return { cantidad, entradas, salidas, fecha_salida: stock.fecha_salida };
  }
  if (qty > cantidad) {
    throw new KirletHttpError(
      400,
      "validation_error",
      "No puedes sacar más de lo que hay",
      { field: "salidas" },
    );
  }
  return {
    cantidad: cantidad - qty,
    entradas,
    salidas: salidas + qty,
    fecha_salida: to_optional_date_text(fecha_salida) ?? ahora.toISOString(),
  };
}

export function prepare_item_payload(
  body: Record<string, unknown>,
  existing?: InventarioSanitarioStock | null,
  ahora: Date = new Date(),
): Record<string, unknown> {
  const cantidad = to_non_negative_number(body.cantidad ?? existing?.cantidad);
  const submitted_entradas = to_non_negative_number(
    body.entradas ?? existing?.entradas ?? 0,
  );
  const submitted_salidas = to_non_negative_number(
    body.salidas ?? existing?.salidas ?? 0,
  );
  const submitted_fecha = to_optional_date_text(body.fecha_salida);

  if (!existing) {
    body.cantidad = cantidad;
    body.entradas = submitted_entradas;
    body.salidas = submitted_salidas;
    if (submitted_fecha) body.fecha_salida = submitted_fecha;
    else delete body.fecha_salida;
    return body;
  }

  const previous_entradas = to_non_negative_number(existing.entradas);
  const previous_salidas = to_non_negative_number(existing.salidas);
  let stock: InventarioSanitarioStock = {
    cantidad,
    entradas: previous_entradas,
    salidas: previous_salidas,
    fecha_salida: existing.fecha_salida,
  };

  const delta_entradas = submitted_entradas - previous_entradas;
  stock =
    delta_entradas > 0
      ? apply_entrada(stock, delta_entradas)
      : { ...stock, entradas: submitted_entradas };

  const delta_salidas = submitted_salidas - previous_salidas;
  if (delta_salidas > 0) {
    stock = apply_salida(
      stock,
      delta_salidas,
      submitted_fecha ?? body.fecha_salida,
      ahora,
    );
  } else {
    stock = {
      ...stock,
      salidas: submitted_salidas,
      fecha_salida: submitted_fecha ?? existing.fecha_salida,
    };
  }

  body.cantidad = stock.cantidad;
  body.entradas = stock.entradas;
  body.salidas = stock.salidas;
  if (stock.fecha_salida) body.fecha_salida = stock.fecha_salida;
  else delete body.fecha_salida;
  return body;
}
