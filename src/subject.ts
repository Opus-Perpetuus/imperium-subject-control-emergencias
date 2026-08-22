import { define_subject } from "@opus-perpetuus/imperium-core-kit";
import pkg from "../package.json" with { type: "json" };
import { asociaciones_module } from "./modules/asociaciones/asociaciones.routes.ts";
import { rescate_animal_module } from "./modules/rescate-animal/rescate-animal.routes.ts";
import { registro_emergencias_module } from "./modules/registro-emergencias/registro-emergencias.routes.ts";
import { servicios_realizados_module } from "./modules/servicios-realizados/servicios-realizados.routes.ts";
import { directorio_contactos_module } from "./modules/directorio-contactos/directorio-contactos.routes.ts";
import { inventario_sanitario_module } from "./modules/inventario-sanitario/inventario-sanitario.routes.ts";
import { voluntariado_module } from "./modules/voluntariado/voluntariado.routes.ts";
import { despensa_solidaria_module } from "./modules/despensa-solidaria/despensa-solidaria.routes.ts";
import { seed_demo } from "./seed.ts";

export const SUBJECT = define_subject({
  id: "SUBJECT-control-emergencias",
  name: "Control de emergencias",
  version: pkg.version,
  image: `ghcr.io/opus-perpetuus/subject-control-emergencias:${pkg.version}`,
  compat: { nox: ">=0.5.0", kit: "^0.5.0" },
  schema_version: 1,
  menu_root: {
    id: "control-emergencias.root",
    label: "Control de emergencias",
    order: 0,
  },
  modules: [asociaciones_module, rescate_animal_module, registro_emergencias_module, servicios_realizados_module, directorio_contactos_module, inventario_sanitario_module, voluntariado_module, despensa_solidaria_module],
  seed: seed_demo,
});

export const KIRLET = SUBJECT;
