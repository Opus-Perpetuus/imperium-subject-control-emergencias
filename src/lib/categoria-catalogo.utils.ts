import {
  KirletHttpError,
  type KirletDataClient,
} from "@opus-perpetuus/imperium-core-kit";

/**
 * Catálogos editables de categoría (despensa solidaria, inventario sanitario,
 * directorio de contactos). El producto guarda el `ref` del catálogo; el alta
 * y la edición aceptan el nombre visible o la clave y la normalizan. Nunca
 * inventan categorías: lo que no está en el catálogo se rechaza.
 */
export type CategoriaCatalogoRow = {
  ref?: unknown;
  name?: unknown;
  is_active?: unknown;
};

export type CategoriaOption = { value: string; label: string };

/** Sin acentos ni mayúsculas, separadores colapsados: "Vía aérea" → "via aerea". */
export function normalize_categoria_text(value: unknown): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, " ")
    .trim();
}

/** Clave `ref` derivada del nombre: "Curas y vendajes" → "curas_y_vendajes". */
export function slugify_categoria_ref(name: unknown): string {
  return normalize_categoria_text(name)
    .replace(/[^a-z0-9 ]+/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 80);
}

/**
 * Resuelve nombre visible o `ref` a la clave del catálogo (solo activas).
 * `null` si no existe.
 */
export function resolve_categoria_ref(
  raw: unknown,
  catalog: readonly CategoriaCatalogoRow[],
): string | null {
  const wanted = normalize_categoria_text(raw);
  if (!wanted) return null;
  const active = catalog.filter(
    (row) => row.is_active !== false && String(row.ref ?? "").trim(),
  );
  const by_ref = active.find(
    (row) => normalize_categoria_text(row.ref) === wanted,
  );
  if (by_ref) return String(by_ref.ref);
  const by_name = active.find(
    (row) => normalize_categoria_text(row.name) === wanted,
  );
  return by_name ? String(by_name.ref) : null;
}

/** Opciones `input-menu` del catálogo; si está vacío, las semillas conocidas. */
export function categoria_options(
  catalog: readonly CategoriaCatalogoRow[],
  fallback: readonly CategoriaOption[],
): CategoriaOption[] {
  const active = catalog.filter(
    (row) => row.is_active !== false && String(row.ref ?? "").trim(),
  );
  if (!active.length) return [...fallback];
  return active.map((row) => ({
    value: String(row.ref),
    label: String(row.name || row.ref),
  }));
}

/**
 * Hook de alta/edición: si la fila trae `categoria`, la deja como `ref` del
 * catálogo `table` o falla con 400.
 */
export async function apply_categoria_catalogo(
  data: KirletDataClient,
  table: string,
  row: Record<string, unknown>,
): Promise<void> {
  if (row.categoria === undefined) return;
  const catalog = (await data.findMany(table, {})) as CategoriaCatalogoRow[];
  const ref = resolve_categoria_ref(row.categoria, catalog);
  if (!ref) {
    throw new KirletHttpError(
      400,
      "validation_error",
      `La categoría «${String(row.categoria ?? "")}» no existe en el catálogo. Usa el nombre que ves en Categorías o su clave interna.`,
      { field: "categoria" },
    );
  }
  row.categoria = ref;
}

/**
 * Hook de alta de una categoría: sin `ref` explícito, lo deriva del nombre y
 * lo hace único en `table` (`alimento`, `alimento_2`, …).
 */
export async function ensure_categoria_ref(
  data: KirletDataClient,
  table: string,
  row: Record<string, unknown>,
): Promise<void> {
  if (String(row.ref ?? "").trim()) return;
  const base = slugify_categoria_ref(row.name) || `categoria_${Date.now()}`;
  let candidate = base;
  for (let suffix = 2; await data.findOne(table, { ref: candidate }); suffix++) {
    candidate = `${base}_${suffix}`;
  }
  row.ref = candidate;
}
