import { describe, expect, test } from "bun:test";
import {
  categoria_options,
  resolve_categoria_ref,
  slugify_categoria_ref,
} from "./categoria-catalogo.utils.ts";

const CATALOG = [
  { ref: "medicamentos", name: "Medicamentos", is_active: true },
  { ref: "via_aerea", name: "Vía aérea", is_active: true },
  { ref: "instrumental", name: "Instrumental", is_active: false },
];

describe("categoria catalogo", () => {
  test("resuelve por clave o por nombre sin acentos ni mayúsculas", () => {
    expect(resolve_categoria_ref("medicamentos", CATALOG)).toBe("medicamentos");
    expect(resolve_categoria_ref("  Vía Aérea ", CATALOG)).toBe("via_aerea");
    expect(resolve_categoria_ref("via aerea", CATALOG)).toBe("via_aerea");
    expect(resolve_categoria_ref("via-aerea", CATALOG)).toBe("via_aerea");
  });

  test("rechaza lo que no está o está inactivo", () => {
    expect(resolve_categoria_ref("", CATALOG)).toBeNull();
    expect(resolve_categoria_ref("Ropa", CATALOG)).toBeNull();
    expect(resolve_categoria_ref("instrumental", CATALOG)).toBeNull();
  });

  test("clave a partir del nombre", () => {
    expect(slugify_categoria_ref("Curas y vendajes")).toBe("curas_y_vendajes");
    expect(slugify_categoria_ref("EPI / Seguridad")).toBe("epi_seguridad");
  });

  test("opciones del catálogo activo o las semillas si está vacío", () => {
    expect(categoria_options(CATALOG, [])).toEqual([
      { value: "medicamentos", label: "Medicamentos" },
      { value: "via_aerea", label: "Vía aérea" },
    ]);
    const fallback = [{ value: "alimento", label: "Alimento" }];
    expect(categoria_options([], fallback)).toEqual(fallback);
  });
});
