import { describe, expect, test } from "bun:test";
import { compute_total_horas } from "./servicios-realizados-horas.utils.ts";

describe("compute_total_horas", () => {
  test("redondea a centésimas y no admite negativo", () => {
    expect(
      compute_total_horas("2026-09-10T10:00:00Z", "2026-09-10T12:30:00Z"),
    ).toBe(2.5);
    expect(
      compute_total_horas("2026-09-10T12:00:00Z", "2026-09-10T10:00:00Z"),
    ).toBe(0);
    expect(compute_total_horas("", "2026-09-10T10:00:00Z")).toBe(0);
  });
});
