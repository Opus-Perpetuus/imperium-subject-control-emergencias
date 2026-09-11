import { describe, expect, test } from "bun:test";
import {
  is_blank_aviso_number,
  next_aviso_folio,
} from "./registro-emergencias-folio.utils.ts";

describe("registro-emergencias folio", () => {
  test("vacío o espacios cuenta como folio automático", () => {
    expect(is_blank_aviso_number(undefined)).toBe(true);
    expect(is_blank_aviso_number(null)).toBe(true);
    expect(is_blank_aviso_number("")).toBe(true);
    expect(is_blank_aviso_number("   ")).toBe(true);
    expect(is_blank_aviso_number("AVISO-00001")).toBe(false);
  });

  test("secuencia AVISO-##### a partir del conteo actual", () => {
    expect(next_aviso_folio(0)).toBe("AVISO-00001");
    expect(next_aviso_folio(12)).toBe("AVISO-00013");
  });
});
