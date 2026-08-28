const TIPOS_INTERACCION = [
  "llamada",
  "correo",
  "carta",
  "persona",
  "registro",
] as const;

export type AsociacionInteraccionDraft = {
  tipo: string;
  fecha?: string;
  notas: string;
};

export function parse_interaccion_fecha(value: unknown): string | undefined {
  if (value == null || value === "") return undefined;
  const text = String(value).trim();
  if (!text) return undefined;
  const ymd = text.match(/^(\d{4})-(\d{2})-(\d{2})(?:$|[T\s])/);
  if (ymd) return `${ymd[1]}-${ymd[2]}-${ymd[3]}`;
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return undefined;
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${parsed.getFullYear()}-${month}-${day}`;
}

export function normalize_tipo_interaccion(value: unknown): string {
  if (value && typeof value === "object" && "value" in value) {
    value = (value as { value: unknown }).value;
  }
  const text = String(value ?? "").trim();
  if (TIPOS_INTERACCION.includes(text as (typeof TIPOS_INTERACCION)[number])) {
    return text;
  }
  return "llamada";
}

export function extract_interaccion_from_body(
  body: Record<string, unknown>,
): AsociacionInteraccionDraft | null {
  const tipo_raw = body.tipo_interaccion;
  const fecha_raw = body.fecha_interaccion;
  const notas = String(body.notas_interaccion ?? "").trim();
  const fecha = parse_interaccion_fecha(fecha_raw);
  if (!notas && !fecha) return null;
  return {
    tipo: normalize_tipo_interaccion(tipo_raw),
    ...(fecha ? { fecha } : {}),
    notas,
  };
}

export function merge_interaccion(
  previas: unknown,
  nueva: AsociacionInteraccionDraft | null,
): AsociacionInteraccionDraft[] {
  const list = Array.isArray(previas)
    ? (previas as AsociacionInteraccionDraft[]).map((item) => ({
        tipo: normalize_tipo_interaccion(item?.tipo),
        fecha: parse_interaccion_fecha(item?.fecha),
        notas: String(item?.notas ?? "").trim(),
      }))
    : [];

  if (!nueva) return list;
  if (list.length === 0) return [nueva];

  const last = list[list.length - 1];
  const same_tipo = last.tipo === nueva.tipo;
  const same_notas = last.notas === nueva.notas;
  if (same_tipo && same_notas && last.fecha === nueva.fecha) return list;
  if (same_tipo && same_notas) {
    list[list.length - 1] = { ...last, ...nueva };
    return list;
  }
  return [...list, nueva];
}

export function apply_interaccion_to_row(
  row: Record<string, unknown>,
  existing_interacciones?: unknown,
): Record<string, unknown> {
  const draft = extract_interaccion_from_body(row);
  const merged = merge_interaccion(
    row.interacciones ?? existing_interacciones,
    draft,
  );
  row.interacciones = merged;
  const last = merged[merged.length - 1];
  if (last?.fecha) {
    row.fecha = last.fecha;
    row.fecha_interaccion = last.fecha;
  }
  return row;
}
