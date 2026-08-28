import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { inventario_general_pages } from "./inventario-general.pages.ts";
import { inventario_general_tables } from "./inventario-general.tables.ts";
import { prepare_item_payload } from "./inventario-general-retirada.utils.ts";

export const inventario_general_module = define_module({
  resource: "inventario-general",
  labels: {
    singular: "Artículo",
    plural: "Inventario general",
    read: "Ver Inventario general",
    write: "Editar Inventario general",
  },
  routes: define_crud({
    resource: "inventario-general",
    table: "inventario_general",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "invgener",
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
      cantidad: { type: "number" },
      ubicacion: { type: "string", required: true, search: true },
      retiradas: { type: "number" },
    },
    options_map: { value: "id", label: "name" },
    hooks: {
      before_create: (_ctx, row) => prepare_item_payload(row),
      before_update: (_ctx, _id, patch, existing) =>
        prepare_item_payload(patch, {
          cantidad: Number(existing.cantidad ?? 0),
          retiradas: Number(existing.retiradas ?? 0),
        }),
    },
  }),
  tables: inventario_general_tables,
  pages: inventario_general_pages,
  menu: [],
});
