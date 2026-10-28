/**
 * Listas no-estatus de control-emergencias para general-option-list-control.
 * Payload de `POST /api/general-option-list-control/seed-defaults` con
 * `{ entries: GENERAL_OPTION_LIST_SEEDS }` (acción `seed_defaults`): solo
 * agrega faltantes. Contrato: kit `descriptors/option-lists.ts`.
 */

export const GENERAL_OPTION_LIST_SEED_PATH = "/api/general-option-list-control/seed-defaults";

export type OptionSeedItem = {
  value: string;
  label: string;
  description?: string;
  color?: string;
  icon?: string;
};

export type GeneralOptionListSeed = {
  model_id: string;
  module_name?: string;
  lists: Array<{
    list_key: string;
    label?: string;
    field_name?: string;
    options: OptionSeedItem[];
  }>;
};

/** `optionsSource` de un campo que no es estatus. `as=options` → `{ value, label }[]`. */
export function general_option_list_options_source(model_id: string, list_key: string): string {
  const query = new URLSearchParams({
    model_id,
    list_key,
    as: "options",
  });
  return `api://general-option-list-control/options?${query.toString()}`;
}

function list(
  model_id: string,
  list_key: string,
  label: string,
  options: OptionSeedItem[],
): GeneralOptionListSeed {
  return {
    model_id,
    module_name: model_id,
    lists: [{ list_key, label, field_name: list_key, options }],
  };
}

export const TIPO_INTERACCION_OPTIONS: OptionSeedItem[] = [
  { value: "llamada", label: "Llamada" },
  { value: "correo", label: "Correo" },
  { value: "carta", label: "Carta" },
  { value: "persona", label: "En persona" },
  { value: "registro", label: "Registro" },
];

export const RIESGOS_ANADIDOS_OPTIONS: OptionSeedItem[] = [
  { value: "fuego", label: "Fuego" },
  { value: "gas", label: "Gas" },
  { value: "electricidad", label: "Electricidad" },
  { value: "derrumbes", label: "Derrumbes" },
  { value: "violencia", label: "Violencia" },
  { value: "sustancias_peligrosas", label: "Sustancias peligrosas" },
  { value: "desprendimientos", label: "Desprendimientos" },
  { value: "animales_peligrosos", label: "Animales peligrosos" },
];

export const RECURSOS_EXTERNOS_OPTIONS: OptionSeedItem[] = [
  { value: "uvi_movil", label: "UVI Móvil" },
  { value: "svb", label: "SVB" },
  { value: "bomberos", label: "Bomberos" },
  { value: "policia_guardia_civil", label: "Policía o Guardia Civil" },
  { value: "servicios_sociales", label: "Servicios sociales" },
  { value: "unidades_caninas", label: "Unidades caninas de rescate" },
  { value: "ume", label: "UME" },
  { value: "psicologos", label: "Psicólogos" },
  { value: "servicios_funerarios", label: "Servicios funerarios" },
];

export const SEXO_ANIMAL_OPTIONS: OptionSeedItem[] = [
  { value: "macho", label: "Macho" },
  { value: "hembra", label: "Hembra" },
  { value: "no_sabe", label: "No sabe" },
];

export const TAMANO_ANIMAL_OPTIONS: OptionSeedItem[] = [
  { value: "grande", label: "Grande" },
  { value: "mediano", label: "Mediano" },
  { value: "pequeno", label: "Pequeño" },
];

export const DERIVADO_A_OPTIONS: OptionSeedItem[] = [
  { value: "clinica_veterinaria", label: "Clínica veterinaria" },
  { value: "centro_proteccion", label: "Centro de protección animal" },
  { value: "apa", label: "APA" },
  { value: "policia_local", label: "Policía local" },
  { value: "agentes_forestales", label: "Agentes forestales" },
];

export const TIPO_SERVICIO_OPTIONS: OptionSeedItem[] = [
  { value: "preventivo", label: "Preventivo" },
  { value: "teleservicio", label: "Teleservicio" },
  { value: "social", label: "Social" },
  { value: "reunion_formacion", label: "Reunión / Formación" },
  { value: "catastrofe", label: "Catástrofe" },
  { value: "guardia", label: "Guardia" },
  { value: "otro", label: "Otro" },
];

export const FORMACION_INTERES_OPTIONS: OptionSeedItem[] = [
  { value: "tes", label: "TES" },
  { value: "tts", label: "TTS" },
  { value: "primeros_auxilios", label: "Primeros auxilios" },
  { value: "atencion_psicologica", label: "Atención psicológica" },
  { value: "conduccion_4x4", label: "Conducción 4x4" },
  { value: "medicina", label: "Medicina" },
  { value: "enfermeria", label: "Enfermería" },
  { value: "svb_desa", label: "SVB + DESA" },
  { value: "piloto_drones", label: "Piloto de drones" },
  { value: "manejo_emisora", label: "Manejo de emisora" },
  { value: "tec_proteccion_civil", label: "Téc. protección civil" },
  { value: "rescate_montana", label: "Rescate en montaña" },
  { value: "rescate_acuatico", label: "Rescate acuático" },
  { value: "patron_embarcaciones", label: "Patrón de embarcaciones" },
  { value: "otros", label: "Otros" },
];

const M = "subject-control-emergencias";

export const GENERAL_OPTION_LIST_SEEDS: GeneralOptionListSeed[] = [
  list(`${M}/asociaciones`, "tipo_interaccion", "Tipo de interacción", TIPO_INTERACCION_OPTIONS),
  list(`${M}/registro-emergencias`, "riesgos_anadidos", "Riesgos añadidos", RIESGOS_ANADIDOS_OPTIONS),
  list(`${M}/registro-emergencias`, "recursos_externos", "Recursos externos", RECURSOS_EXTERNOS_OPTIONS),
  list(`${M}/rescate-animal`, "sexo", "Sexo", SEXO_ANIMAL_OPTIONS),
  list(`${M}/rescate-animal`, "tamano", "Tamaño", TAMANO_ANIMAL_OPTIONS),
  list(`${M}/rescate-animal`, "derivado_a", "Derivado a", DERIVADO_A_OPTIONS),
  list(`${M}/servicios-realizados`, "tipo_servicio", "Tipo de servicio", TIPO_SERVICIO_OPTIONS),
  list(`${M}/voluntariado`, "formacion_interes", "Formación de interés", FORMACION_INTERES_OPTIONS),
];

export type PushGeneralOptionSeedsOptions = {
  env?: Record<string, string | undefined>;
  fetchImpl?: typeof fetch;
  timeout_ms?: number;
};

export type PushGeneralOptionSeedsResult =
  | { pushed: true; status: number; data: unknown }
  | { pushed: false; reason: string; status?: number };

/**
 * Manda `GENERAL_OPTION_LIST_SEEDS` al núcleo (`seed_defaults`, idempotente).
 * Nunca lanza: el seed de la app no debe caerse si el núcleo aún no
 * expone o no autoriza la ruta.
 */
export async function push_general_option_seeds(
  opts: PushGeneralOptionSeedsOptions = {},
): Promise<PushGeneralOptionSeedsResult> {
  const env = opts.env ?? process.env;
  const base = (env.CORE_DATA_URL?.trim() || env.NOX_DATA_URL?.trim() || "")
    .replace(/\/api\/kirlets\/data\/.*$/, "")
    .replace(/\/+$/, "");
  const caller = env.SUBJECT_TECHNICAL_ID?.trim() || env.KIRLET_TECHNICAL_ID?.trim() || "";
  const secret = env.CORE_SUBJECT_GATEWAY_SECRET?.trim() || env.NOX_KIRLET_GATEWAY_SECRET?.trim() || "";
  if (!base || !caller || !secret) return { pushed: false, reason: "core_not_configured" };
  try {
    const res = await (opts.fetchImpl ?? fetch)(`${base}${GENERAL_OPTION_LIST_SEED_PATH}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-core-subject-gateway-secret": secret,
        "x-imperium-subject": caller,
      },
      body: JSON.stringify({ entries: GENERAL_OPTION_LIST_SEEDS }),
      signal: AbortSignal.timeout(opts.timeout_ms ?? 12_000),
    });
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      /* sin JSON */
    }
    if (!res.ok) return { pushed: false, reason: "core_refused", status: res.status };
    return { pushed: true, status: res.status, data };
  } catch (err) {
    return { pushed: false, reason: err instanceof Error ? err.message : String(err) };
  }
}
