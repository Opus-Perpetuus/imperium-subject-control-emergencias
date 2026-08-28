import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { categoria_directorio_contactos_pages } from "./categoria-directorio-contactos.pages.ts";
import { categoria_directorio_contactos_tables } from "./categoria-directorio-contactos.tables.ts";

export const categoria_directorio_contactos_module = define_module({
  resource: "categoria-directorio-contactos",
  labels: {
    singular: "Categoría del directorio",
    plural: "Categorías del directorio",
    read: "Ver categorías del directorio",
    write: "Editar categorías del directorio",
  },
  routes: define_crud({
    resource: "categoria-directorio-contactos",
    table: "categoria_directorio_contactos",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "catdirec",
    fields: {
      name: { type: "string", required: true, search: true },
      description: { type: "string", search: true },
      is_active: { type: "boolean" },
      state: { type: "string" },
      ref: { type: "string", search: true },
      search_field: { type: "string", search: true },
      created_by: { type: "string" },
      custom_data: { type: "json" },
      payload: { type: "json" },
    },
    options_map: { value: "ref", label: "name" },
  }),
  tables: categoria_directorio_contactos_tables,
  pages: categoria_directorio_contactos_pages,
  menu: [],
});
