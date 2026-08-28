import { KirletHttpError } from "@opus-perpetuus/imperium-core-kit";

export type InventarioGeneralStock = {
  cantidad: number;
  retiradas: number;
};

function to_non_negative_number(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

export function apply_retirada(
  stock: InventarioGeneralStock,
  retirar: unknown,
): InventarioGeneralStock {
  const cantidad = to_non_negative_number(stock.cantidad);
  const retiradas = to_non_negative_number(stock.retiradas);
  const qty = to_non_negative_number(retirar);
  if (qty === 0) {
    return { cantidad, retiradas };
  }
  if (qty > cantidad) {
    throw new KirletHttpError(
      400,
      "validation_error",
      "No puedes retirar más de lo que hay",
      { field: "retiradas" },
    );
  }
  return { cantidad: cantidad - qty, retiradas: retiradas + qty };
}

export function prepare_item_payload(
  body: Record<string, unknown>,
  existing?: InventarioGeneralStock | null,
): Record<string, unknown> {
  const cantidad = to_non_negative_number(body.cantidad ?? existing?.cantidad);
  const submitted_retiradas = to_non_negative_number(
    body.retiradas ?? existing?.retiradas ?? 0,
  );

  if (!existing) {
    body.cantidad = cantidad;
    body.retiradas = submitted_retiradas;
    return body;
  }

  const previous_retiradas = to_non_negative_number(existing.retiradas);
  const delta = submitted_retiradas - previous_retiradas;
  if (delta > 0) {
    const next = apply_retirada(
      { cantidad, retiradas: previous_retiradas },
      delta,
    );
    body.cantidad = next.cantidad;
    body.retiradas = next.retiradas;
    return body;
  }

  body.cantidad = cantidad;
  body.retiradas = submitted_retiradas;
  return body;
}
