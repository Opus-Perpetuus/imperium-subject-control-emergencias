import { KirletHttpError } from "@opus-perpetuus/imperium-core-kit";

export type CatalogoOpcion = { value: string; label: string };

export const MEDIO_RECEPCION: CatalogoOpcion[] = [
  { value: "telefono", label: "Teléfono" },
  { value: "radio_uhf", label: "Radio UHF" },
  { value: "personal_in_situ", label: "Personal in situ" },
];

export const PRIORIDAD: CatalogoOpcion[] = [
  { value: "alta", label: "Alta" },
  { value: "media", label: "Media" },
  { value: "baja", label: "Baja" },
];

export const RELACION_ALERTANTE: CatalogoOpcion[] = [
  { value: "testigo", label: "Testigo presencial" },
  { value: "112", label: "112" },
  { value: "policia_nacional", label: "Policía Nacional" },
  { value: "policia_local", label: "Policía Local" },
  { value: "servicios_medicos", label: "Servicios médicos" },
  { value: "centro_serem", label: "Centro coordinador S.E.R.E.M" },
];

export const TIPO_EMERGENCIA: CatalogoOpcion[] = [
  { value: "sanitaria", label: "Sanitaria" },
  { value: "social", label: "Social" },
  { value: "incendio", label: "Incendio" },
  { value: "inundacion", label: "Inundación" },
  { value: "busqueda_desaparecido", label: "Búsqueda de desaparecido" },
  { value: "proteccion_animal", label: "Protección animal" },
  { value: "medio_ambiente", label: "Medio ambiente" },
  { value: "nrbq", label: "NRBQ" },
  { value: "parada_cardiaca", label: "Parada cardiaca" },
  { value: "accidente_trafico", label: "Accidente de tráfico" },
];

export const RESULTADO: CatalogoOpcion[] = [
  { value: "activa", label: "Aún activa" },
  { value: "pendiente", label: "Pendiente" },
  { value: "resuelta", label: "Resuelta" },
  { value: "derivada", label: "Derivada" },
  { value: "falsa_alarma", label: "Falsa alarma" },
  { value: "informacion", label: "Información" },
];

const DEFAULTS: Record<string, string> = {
  medio_recepcion: "telefono",
  prioridad: "media",
  tipo_emergencia: "sanitaria",
  resultado: "activa",
};

function resolve_opcion(
  value: unknown,
  opciones: CatalogoOpcion[],
): string | undefined {
  const raw = String(value ?? "").trim();
  if (!raw) return undefined;
  const folded = raw.toLowerCase();
  const hit = opciones.find(
    (opcion) =>
      opcion.value === raw ||
      opcion.value === folded ||
      opcion.label.toLowerCase() === folded,
  );
  return hit?.value;
}

function apply_choice(
  row: Record<string, unknown>,
  field: string,
  opciones: CatalogoOpcion[],
  fallback?: string,
): void {
  if (row[field] === undefined) {
    if (fallback !== undefined) row[field] = fallback;
    return;
  }
  if (row[field] === null || String(row[field]).trim() === "") {
    if (fallback !== undefined) row[field] = fallback;
    else delete row[field];
    return;
  }
  const resolved = resolve_opcion(row[field], opciones);
  if (!resolved) {
    throw new KirletHttpError(
      400,
      "validation_error",
      `El valor «${String(row[field])}» no es válido para ${field}.`,
      { field },
    );
  }
  row[field] = resolved;
}

/** Normaliza catálogos fijos del registro; en alta rellena los defaults Mongo. */
export function apply_registro_catalogos(
  row: Record<string, unknown>,
  mode: "create" | "update",
): Record<string, unknown> {
  const fallback = mode === "create" ? DEFAULTS : {};
  apply_choice(row, "medio_recepcion", MEDIO_RECEPCION, fallback.medio_recepcion);
  apply_choice(row, "prioridad", PRIORIDAD, fallback.prioridad);
  apply_choice(row, "tipo_emergencia", TIPO_EMERGENCIA, fallback.tipo_emergencia);
  apply_choice(row, "resultado", RESULTADO, fallback.resultado);
  apply_choice(row, "relacion_alertante", RELACION_ALERTANTE);
  return row;
}
