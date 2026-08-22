import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { directorio_contactos_pages } from "./directorio-contactos.pages.ts";
import { directorio_contactos_tables } from "./directorio-contactos.tables.ts";

export const directorio_contactos_module = define_module({
  resource: "directorio-contactos",
  labels: {
    singular: "Directorio de contactos",
    plural: "Directorio de contactos",
    read: "Ver Directorio de contactos",
    write: "Editar Directorio de contactos",
  },
  routes: define_crud({
    resource: "directorio-contactos",
    table: "directorio_contactos",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "director",
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
      categoria: { type: "string", search: true },
      telefono: { type: "string", search: true },
      telefono_secundario: { type: "string", search: true },
      direccion: { type: "string", search: true },
      web: { type: "string", search: true },
      email: { type: "string", search: true },
      fax: { type: "string", search: true },
      observaciones: { type: "string", search: true },
    },
    options_map: { value: "id", label: "name" },
  }),
  tables: directorio_contactos_tables,
  pages: directorio_contactos_pages,
  menu: [],
});
