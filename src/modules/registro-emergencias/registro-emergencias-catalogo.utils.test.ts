import { describe, expect, test } from "bun:test";
import { KirletHttpError } from "@opus-perpetuus/imperium-core-kit";
import { apply_registro_catalogos } from "./registro-emergencias-catalogo.utils.ts";

describe("registro-emergencias catálogos", () => {
  test("el alta vacío toma defaults SEREM y acepta el centro coordinador", () => {
    const row = apply_registro_catalogos(
      { relacion_alertante: "Centro coordinador S.E.R.E.M" },
      "create",
    );
    expect(row.medio_recepcion).toBe("telefono");
    expect(row.prioridad).toBe("media");
    expect(row.tipo_emergencia).toBe("sanitaria");
    expect(row.resultado).toBe("activa");
    expect(row.relacion_alertante).toBe("centro_serem");
  });

  test("un valor fuera de catálogo se rechaza", () => {
    expect(() =>
      apply_registro_catalogos({ tipo_emergencia: "tsunami" }, "create"),
    ).toThrow(KirletHttpError);
  });

  test("el update no inventa defaults en campos omitidos", () => {
    const row = apply_registro_catalogos({ prioridad: "Alta" }, "update");
    expect(row.prioridad).toBe("alta");
    expect(row.tipo_emergencia).toBeUndefined();
    expect(row.relacion_alertante).toBeUndefined();
  });
});
