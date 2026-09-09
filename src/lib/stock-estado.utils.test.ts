import { describe, expect, test } from "bun:test";
import { compute_estado } from "./stock-estado.utils.ts";

const HOY = new Date("2026-09-09T12:00:00Z");

describe("stock estado", () => {
  test("caducidad manda sobre el stock", () => {
    expect(compute_estado("2026-09-01", 100, 1, HOY)).toBe("caducado");
    expect(compute_estado("2026-09-30", 100, 1, HOY)).toBe("por_caducar");
    expect(compute_estado("2027-01-01", 100, 1, HOY)).toBe("ok");
  });

  test("stock igual o bajo el mínimo es stock bajo", () => {
    expect(compute_estado(undefined, 5, 5, HOY)).toBe("stock_bajo");
    expect(compute_estado("", 0, 0, HOY)).toBe("stock_bajo");
    expect(compute_estado(null, 6, 5, HOY)).toBe("ok");
  });

  test("una fecha ilegible no cuenta", () => {
    expect(compute_estado("no es fecha", 10, 1, HOY)).toBe("ok");
  });
});
