import { beforeAll, describe, expect, test } from "bun:test";
import { create_kirlet_test_context } from "@opus-perpetuus/imperium-core-kit";
import { SUBJECT } from "./subject.ts";

const JSON_HEADERS = { "content-type": "application/json" };

describe("categorías y estado de despensa / inventario sanitario", () => {
  const server = create_kirlet_test_context(SUBJECT);
  const post = (path: string, body: unknown) =>
    server.fetch(
      new Request(`http://t${path}`, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(body),
      }),
    );

  beforeAll(async () => {
    const seeded = await post("/seed", {});
    expect(seeded.status).toBe(200);
  });

  test("la despensa acepta el nombre visible y calcula el estado", async () => {
    const res = await post("/despensa-solidaria", {
      name: "Arroz 1kg",
      categoria: "Alimento",
      codigo_barras: 7501234567890,
      cantidad: 2,
      stock_minimo: 5,
    });
    expect(res.status).toBe(201);
    const { data } = (await res.json()) as { data: Record<string, unknown> };
    expect(data.categoria).toBe("alimento");
    expect(data.codigo_barras).toBe("7501234567890");
    expect(data.estado).toBe("stock_bajo");

    const patched = await server.fetch(
      new Request(`http://t/despensa-solidaria/${String(data.id)}`, {
        method: "PATCH",
        headers: JSON_HEADERS,
        body: JSON.stringify({ cantidad: 20 }),
      }),
    );
    expect(patched.status).toBe(200);
    const after = (await patched.json()) as { data: Record<string, unknown> };
    expect(after.data.estado).toBe("ok");
  });

  test("una categoría fuera del catálogo se rechaza", async () => {
    const res = await post("/despensa-solidaria", {
      name: "Cosa rara",
      categoria: "Juguetes",
    });
    expect(res.status).toBe(400);
  });

  test("el cliente no puede mandar el estado", async () => {
    const res = await post("/inventario-sanitario", {
      name: "Gasas",
      categoria: "curas_vendajes",
      estado: "ok",
    });
    expect(res.status).toBe(400);
  });

  test("el inventario sanitario resuelve la clave y marca la caducidad", async () => {
    const res = await post("/inventario-sanitario", {
      name: "Suero",
      categoria: "Vía aérea",
      cantidad: 10,
      stock_minimo: 1,
      fecha_caducidad: "2020-01-01",
    });
    expect(res.status).toBe(201);
    const { data } = (await res.json()) as { data: Record<string, unknown> };
    expect(data.categoria).toBe("via_aerea");
    expect(data.estado).toBe("caducado");
  });

  test("una categoría nueva sin clave la deriva del nombre", async () => {
    const res = await post("/categoria-despensa-solidaria", { name: "Mascotas" });
    expect(res.status).toBe(201);
    const { data } = (await res.json()) as { data: Record<string, unknown> };
    expect(data.ref).toBe("mascotas");
    const dup = await post("/categoria-despensa-solidaria", { name: "Mascotas" });
    expect(dup.status).toBe(201);
    expect(((await dup.json()) as { data: Record<string, unknown> }).data.ref).toBe("mascotas_2");
  });
});
