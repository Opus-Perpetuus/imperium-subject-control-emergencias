import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { ensure_categoria_ref } from "../../lib/categoria-catalogo.utils.ts";
import { categoria_despensa_solidaria_pages } from "./categoria-despensa-solidaria.pages.ts";
import { categoria_despensa_solidaria_tables } from "./categoria-despensa-solidaria.tables.ts";

export const categoria_despensa_solidaria_module = define_module({
  resource: "categoria-despensa-solidaria",
  labels: {
    singular: "Categoría de despensa solidaria",
    plural: "Categorías de despensa solidaria",
    read: "Ver categorías de despensa solidaria",
    write: "Editar categorías de despensa solidaria",
  },
  routes: define_crud({
    resource: "categoria-despensa-solidaria",
    table: "categoria_despensa_solidaria",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "catdespe",
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
        await ensure_categoria_ref(ctx.data, "categoria_despensa_solidaria", row);
        return row;
      },
    },
  }),
  tables: categoria_despensa_solidaria_tables,
  pages: categoria_despensa_solidaria_pages,
  menu: [],
});
