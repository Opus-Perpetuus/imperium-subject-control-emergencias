import { describe, expect, test } from "bun:test";
import {
  is_blank_intervention_number,
  next_rescue_folio,
} from "./rescate-animal-folio.utils.ts";

describe("rescate-animal folio", () => {
  test("vacío o espacios cuenta como folio automático", () => {
    expect(is_blank_intervention_number(undefined)).toBe(true);
    expect(is_blank_intervention_number(null)).toBe(true);
    expect(is_blank_intervention_number("")).toBe(true);
    expect(is_blank_intervention_number("   ")).toBe(true);
    expect(is_blank_intervention_number("INT-000001")).toBe(false);
  });

  test("secuencia INT-###### a partir del conteo actual", () => {
    expect(next_rescue_folio(0)).toBe("INT-000001");
    expect(next_rescue_folio(12)).toBe("INT-000013");
  });
});
