import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { base_volcanica_pages } from "./base-volcanica.pages.ts";
import { base_volcanica_tables } from "./base-volcanica.tables.ts";

export const base_volcanica_module = define_module({
  resource: "base-volcanica",
  labels: {
    singular: "Base volcánica",
    plural: "Bases volcánicas",
    read: "Ver base volcánica",
    write: "Editar base volcánica",
  },
  routes: define_crud({
    resource: "base-volcanica",
    table: "base_volcanica",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "basevolc",
    fields: {
      name: { type: "string", required: true, search: true },
      description: { type: "string", search: true },
      categoria: { type: "string", search: true },
      municipio: { type: "string", search: true },
      estado_volcan: { type: "string", search: true },
      altura_msnm: { type: "number" },
      ultima_erupcion: { type: "string" },
      nivel_alerta: { type: "string", search: true },
      is_active: { type: "boolean" },
      state: { type: "string" },
      ref: { type: "string", search: true },
      search_field: { type: "string", search: true },
      created_by: { type: "string" },
      custom_data: { type: "json" },
      payload: { type: "json" },
    },
  }),
  tables: base_volcanica_tables,
  pages: base_volcanica_pages,
  menu: [],
});
