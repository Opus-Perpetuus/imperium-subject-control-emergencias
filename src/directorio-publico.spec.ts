import { describe, expect, test } from "bun:test";
import { create_subject_test_context } from "@opus-perpetuus/imperium-core-kit";
import { SUBJECT } from "./subject.ts";
import { directorio_contactos_pages } from "./modules/directorio-contactos/directorio-contactos.pages.ts";

/** Lo que el sitio público sabe pintar; un id fuera de aquí sale gris. */
const LIGADOS = new Set([
  "nox.page",
  "nox.stack",
  "nox.card",
  "nox.markdown-view",
  "nox.table",
  "nox.empty",
  "nox.button",
  "nox.alert",
  "nox.link",
]);

function recorrer(node: { component?: string; children?: unknown[] }): string[] {
  const ids = [String(node.component ?? "")];
  for (const hijo of node.children ?? []) {
    ids.push(...recorrer(hijo as { component?: string; children?: unknown[] }));
  }
  return ids;
}

describe("directorio de emergencias público", () => {
  test("el manifiesto lo declara con su sección y su nombre", () => {
    // Es la segunda app con parte pública: si esto funciona sin tocar el
    // lanzador, el mecanismo por manifiesto vale para cualquiera.
    const pages = SUBJECT.manifest().public?.pages ?? [];
    const dir = pages.find(
      (p) => p.id === "control-emergencias.directorio-publico",
    );
    expect(dir).toBeDefined();
    expect(dir!.access).toBe("anonymous");
    expect(dir!.segment).toBe("directorio");
    expect(dir!.label).toBe("Directorio de emergencias");
  });

  test("un vecino sin cuenta ve los teléfonos", async () => {
    const server = create_subject_test_context(SUBJECT);
    await server.data.insert("directorio_contactos", {
      id: "c1",
      name: "Protección Civil",
      categoria: "Emergencias",
      telefono: "911",
      direccion: "Plaza principal",
      is_active: true,
    });
    const decl = directorio_contactos_pages.find(
      (p) => p.id === "control-emergencias.directorio-publico",
    )!;
    const built = (await decl.build({
      url: new URL("http://t/directorio-publico"),
      identity: null,
      data: server.data,
      nox: server.nox,
      files: server.files,
    })) as { title: string; page: { component: string; children?: unknown[] } };

    const json = JSON.stringify(built);
    expect(json).toContain("Protección Civil");
    expect(json).toContain("911");
    expect(json).toContain("Emergencias");
    server.stop();
  });

  test("solo emite nodos que el sitio público sabe pintar", async () => {
    const server = create_subject_test_context(SUBJECT);
    await server.data.insert("directorio_contactos", {
      id: "c2",
      name: "Bomberos",
      categoria: "Emergencias",
      telefono: "080",
      is_active: true,
    });
    const decl = directorio_contactos_pages.find(
      (p) => p.id === "control-emergencias.directorio-publico",
    )!;
    const built = (await decl.build({
      url: new URL("http://t/directorio-publico"),
      identity: null,
      data: server.data,
      nox: server.nox,
      files: server.files,
    })) as { page: { component: string; children?: unknown[] } };
    for (const id of recorrer(built.page)) {
      expect(LIGADOS.has(id)).toBe(true);
    }
    server.stop();
  });

  test("sin contactos no sale una página rota", async () => {
    const server = create_subject_test_context(SUBJECT);
    const decl = directorio_contactos_pages.find(
      (p) => p.id === "control-emergencias.directorio-publico",
    )!;
    const built = (await decl.build({
      url: new URL("http://t/directorio-publico"),
      identity: null,
      data: server.data,
      nox: server.nox,
      files: server.files,
    })) as { page: { component: string; children?: unknown[] } };
    expect(JSON.stringify(built)).toContain("Directorio en preparación");
    server.stop();
  });

  test("lo interno no se publica", async () => {
    // `observaciones` es una nota del personal: no tiene por qué verla nadie.
    const server = create_subject_test_context(SUBJECT);
    await server.data.insert("directorio_contactos", {
      id: "c3",
      name: "Juzgado",
      categoria: "Gobierno",
      telefono: "555",
      observaciones: "NOTA INTERNA QUE NO DEBE SALIR",
      is_active: true,
    });
    // Un contacto dado de baja tampoco.
    await server.data.insert("directorio_contactos", {
      id: "c4",
      name: "CONTACTO DADO DE BAJA",
      categoria: "Gobierno",
      is_active: false,
    });
    const decl = directorio_contactos_pages.find(
      (p) => p.id === "control-emergencias.directorio-publico",
    )!;
    const built = (await decl.build({
      url: new URL("http://t/directorio-publico"),
      identity: null,
      data: server.data,
      nox: server.nox,
      files: server.files,
    })) as { page: { component: string; children?: unknown[] } };
    const json = JSON.stringify(built);
    expect(json).toContain("Juzgado");
    expect(json).not.toContain("NOTA INTERNA");
    expect(json).not.toContain("DADO DE BAJA");
    server.stop();
  });
});

describe("nombres de categoría legibles", () => {
  test("se enseña el nombre de la categoría, no su identificador", async () => {
    // La ficha guarda el ref; sin resolverlo el vecino leía
    // "servicios_municipales" como título de sección.
    const server = create_subject_test_context(SUBJECT);
    await server.data.insert("categoria_directorio_contactos", {
      id: "cat-sm",
      ref: "servicios_municipales",
      name: "Servicios municipales",
      is_active: true,
    });
    await server.data.insert("directorio_contactos", {
      id: "c9",
      name: "Agua Potable",
      categoria: "servicios_municipales",
      telefono: "555",
      is_active: true,
    });
    const decl = directorio_contactos_pages.find(
      (p) => p.id === "control-emergencias.directorio-publico",
    )!;
    const built = await decl.build({
      url: new URL("http://t/directorio-publico"),
      identity: null,
      data: server.data,
      nox: server.nox,
      files: server.files,
    });
    const json = JSON.stringify(built);
    expect(json).toContain("Servicios municipales");
    expect(json).not.toContain("## servicios_municipales");
    server.stop();
  });

  test("una categoría sin catálogo se lee igual", async () => {
    const server = create_subject_test_context(SUBJECT);
    await server.data.insert("directorio_contactos", {
      id: "c10",
      name: "Otra cosa",
      categoria: "proteccion_civil",
      is_active: true,
    });
    const decl = directorio_contactos_pages.find(
      (p) => p.id === "control-emergencias.directorio-publico",
    )!;
    const built = await decl.build({
      url: new URL("http://t/directorio-publico"),
      identity: null,
      data: server.data,
      nox: server.nox,
      files: server.files,
    });
    expect(JSON.stringify(built)).toContain("Proteccion civil");
    server.stop();
  });
});
