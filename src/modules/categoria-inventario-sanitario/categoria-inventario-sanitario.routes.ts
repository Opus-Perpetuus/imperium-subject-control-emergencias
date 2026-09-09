import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { ensure_categoria_ref } from "../../lib/categoria-catalogo.utils.ts";
import { categoria_inventario_sanitario_pages } from "./categoria-inventario-sanitario.pages.ts";
import { categoria_inventario_sanitario_tables } from "./categoria-inventario-sanitario.tables.ts";

export const categoria_inventario_sanitario_module = define_module({
  resource: "categoria-inventario-sanitario",
  labels: {
    singular: "Categoría de inventario sanitario",
    plural: "Categorías de inventario sanitario",
    read: "Ver categorías de inventario sanitario",
    write: "Editar categorías de inventario sanitario",
  },
  routes: define_crud({
    resource: "categoria-inventario-sanitario",
    table: "categoria_inventario_sanitario",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "catinven",
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
        await ensure_categoria_ref(ctx.data, "categoria_inventario_sanitario", row);
        return row;
      },
    },
  }),
  tables: categoria_inventario_sanitario_tables,
  pages: categoria_inventario_sanitario_pages,
  menu: [],
});
