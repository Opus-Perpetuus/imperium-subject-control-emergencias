import type { KirletDataClient, NoxServices } from "@opus-perpetuus/imperium-core-kit";
import { new_id, now_iso } from "@opus-perpetuus/imperium-core-kit";

export async function seed_demo(ctx: {
  data: KirletDataClient;
  nox: NoxServices;
  technical_id: string;
}): Promise<void> {
  const ts = now_iso();
  const categorias = await ctx.data.count("categoria_directorio_contactos");
  if (categorias === 0) {
    const catalog = [
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
    ] as const;
    for (const [ref, name] of catalog) {
      await ctx.data.insert("categoria_directorio_contactos", {
        id: new_id("catdirec"),
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
    description: "Registro semilla del súbdito. Sustituye al migrar desde Mongo.",
    is_active: true,
    ref: "seed-control-emergencias",
    created_at: ts,
    updated_at: ts,
  });
}
