import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { ensure_categoria_ref } from "../../lib/categoria-catalogo.utils.ts";
import { categoria_base_volcanica_pages } from "./categoria-base-volcanica.pages.ts";
import { categoria_base_volcanica_tables } from "./categoria-base-volcanica.tables.ts";

export const categoria_base_volcanica_module = define_module({
  resource: "categoria-base-volcanica",
  labels: {
    singular: "Categoría de base volcánica",
    plural: "Categorías de base volcánica",
    read: "Ver categorías de base volcánica",
    write: "Editar categorías de base volcánica",
  },
  routes: define_crud({
    resource: "categoria-base-volcanica",
    table: "categoria_base_volcanica",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "catvolca",
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
    hooks: {
      before_create: async (ctx, row) => {
        await ensure_categoria_ref(ctx.data, "categoria_base_volcanica", row);
        return row;
      },
    },
  }),
  tables: categoria_base_volcanica_tables,
  pages: categoria_base_volcanica_pages,
  menu: [],
});
