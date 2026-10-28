import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import {
  GENERAL_OPTION_LIST_SEED_PATH,
  GENERAL_OPTION_LIST_SEEDS,
  general_option_list_options_source,
  push_general_option_seeds,
} from "./general-option-seeds";

const B_PAGES = [
  {
    file: "./modules/asociaciones/asociaciones.pages.ts",
    fields: ["tipo_interaccion"],
  },
  {
    file: "./modules/registro-emergencias/registro-emergencias.pages.ts",
    fields: ["riesgos_anadidos", "recursos_externos"],
  },
  {
    file: "./modules/rescate-animal/rescate-animal.pages.ts",
    fields: ["sexo", "tamano", "derivado_a"],
  },
  {
    file: "./modules/servicios-realizados/servicios-realizados.pages.ts",
    fields: ["tipo_servicio"],
  },
  {
    file: "./modules/voluntariado/voluntariado.pages.ts",
    fields: ["formacion_interes"],
  },
] as const;

describe("general option seeds", () => {
  test("optionsSource apunta al control del núcleo", () => {
    expect(
      general_option_list_options_source(
        "subject-control-emergencias/asociaciones",
        "tipo_interaccion",
      ),
    ).toBe(
      "api://general-option-list-control/options?model_id=subject-control-emergencias%2Fasociaciones&list_key=tipo_interaccion&as=options",
    );
  });

  test("8 listas B con valores únicos", () => {
    expect(GENERAL_OPTION_LIST_SEEDS).toHaveLength(8);
    for (const entry of GENERAL_OPTION_LIST_SEEDS) {
      expect(entry.model_id.startsWith("subject-control-emergencias/")).toBe(true);
      for (const list of entry.lists) {
        expect(list.list_key.length).toBeGreaterThan(0);
        const values = list.options.map((o) => o.value);
        expect(new Set(values).size).toBe(values.length);
      }
    }
  });

  test("forms B usan optionsSource sin options literales", () => {
    for (const page of B_PAGES) {
      const src = readFileSync(new URL(page.file, import.meta.url), "utf8");
      expect(src).toContain("general_option_list_options_source");
      for (const field of page.fields) {
        expect(src).toContain(`name: "${field}"`);
        expect(src).not.toMatch(new RegExp(`name:\\s*"${field}"[\\s\\S]*?options:\\s*\\[`));
      }
    }
  });

  test("libro-cuentas tipo sigue literal (C contable)", () => {
    const src = readFileSync(
      new URL("./modules/libro-cuentas/libro-cuentas.pages.ts", import.meta.url),
      "utf8",
    );
    expect(src).toMatch(/name:\s*"tipo"[\s\S]*?options:\s*\[/);
    expect(src).toContain('value: "entrada"');
    expect(src).toContain('value: "salida"');
  });
});

describe("push_general_option_seeds", () => {
  const env = {
    CORE_DATA_URL: "http://core:3000/api/kirlets/data/x",
    SUBJECT_TECHNICAL_ID: "subject-control-emergencias",
    CORE_SUBJECT_GATEWAY_SECRET: "s",
  };

  test("sin env no llama", async () => {
    let called = false;
    const r = await push_general_option_seeds({
      env: {},
      fetchImpl: (async () => {
        called = true;
        return new Response();
      }) as unknown as typeof fetch,
    });
    expect(r).toEqual({ pushed: false, reason: "core_not_configured" });
    expect(called).toBe(false);
  });

  test("POST entries a seed-defaults del núcleo", async () => {
    let url = "";
    let init: RequestInit | undefined;
    const fetchImpl = (async (u: string, i: RequestInit) => {
      url = u;
      init = i;
      return Response.json({ data: [{ inserted: 1 }] });
    }) as unknown as typeof fetch;
    const r = await push_general_option_seeds({ env, fetchImpl });
    expect(url).toBe(`http://core:3000${GENERAL_OPTION_LIST_SEED_PATH}`);
    expect(init?.method).toBe("POST");
    const body = JSON.parse(String(init?.body));
    expect(body.entries.length).toBe(GENERAL_OPTION_LIST_SEEDS.length);
    expect(r.pushed).toBe(true);
  });
});
