import type { KirletDataClient, NoxServices } from "@opus-perpetuus/imperium-core-kit";
import { new_id, now_iso } from "@opus-perpetuus/imperium-core-kit";

type SeedCtx = {
  data: KirletDataClient;
  nox: NoxServices;
  technical_id: string;
};

/**
 * Catálogos de categoría. Cada `ref` es la clave que guardan los productos
 * (`alimento`, `medicamentos`, …); solo se siembran si la tabla está vacía.
 */
const CATALOGOS: Array<{
  table: string;
  prefix: string;
  rows: ReadonlyArray<readonly [string, string]>;
}> = [
  {
    table: "categoria_directorio_contactos",
    prefix: "catdirec",
    rows: [
      ["emergencias", "Emergencias"],
      ["sanidad", "Sanidad"],
      ["cultura", "Cultura"],
      ["turismo", "Turismo"],
      ["poblados", "Poblados"],
      ["hacienda", "Hacienda y Economía"],
      ["transporte", "Transporte"],
      ["servicios_municipales", "Servicios municipales"],
      ["gobierno", "Gobierno"],
      ["comunidad_autonoma", "Comunidad autónoma"],
    ],
  },
  {
    table: "categoria_despensa_solidaria",
    prefix: "catdespe",
    rows: [
      ["alimento", "Alimento"],
      ["higiene", "Higiene"],
      ["cubiertos", "Cubiertos"],
      ["infantil", "Infantil"],
      ["ropa", "Ropa"],
    ],
  },
  {
    table: "categoria_inventario_sanitario",
    prefix: "catinven",
    rows: [
      ["medicamentos", "Medicamentos"],
      ["via_aerea", "Vía aérea"],
      ["curas_vendajes", "Curas y vendajes"],
      ["control_hemorragias", "Control de hemorragias"],
      ["epi_seguridad", "EPI y seguridad"],
      ["instrumental", "Instrumental"],
    ],
  },
];

export async function seed_demo(ctx: SeedCtx): Promise<void> {
  const ts = now_iso();
  for (const catalogo of CATALOGOS) {
    if ((await ctx.data.count(catalogo.table)) > 0) continue;
    for (const [ref, name] of catalogo.rows) {
      await ctx.data.insert(catalogo.table, {
        id: new_id(catalogo.prefix),
        name,
        ref,
        is_active: true,
        created_at: ts,
        updated_at: ts,
      });
    }
  }

  const n = await ctx.data.count("asociaciones");
  if (n > 0) return;
  await ctx.data.insert("asociaciones", {
    id: new_id("asociaci"),
    name: "Gestión de asociaciones (ejemplo)",
    description: "Registro semilla de la app. Sustituye al migrar desde Mongo.",
    is_active: true,
    ref: "seed-control-emergencias",
    created_at: ts,
    updated_at: ts,
  });
}
