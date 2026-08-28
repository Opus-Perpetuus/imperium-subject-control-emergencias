import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { inventario_sanitario_pages } from "./inventario-sanitario.pages.ts";
import { inventario_sanitario_tables } from "./inventario-sanitario.tables.ts";
import { prepare_item_payload } from "./inventario-sanitario-movimiento.utils.ts";

export const inventario_sanitario_module = define_module({
  resource: "inventario-sanitario",
  labels: {
    singular: "Inventario sanitario",
    plural: "Inventario sanitario",
    read: "Ver Inventario sanitario",
    write: "Editar Inventario sanitario",
  },
  routes: define_crud({
    resource: "inventario-sanitario",
    table: "inventario_sanitario",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "inventar",
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
      cantidad: { type: "number" },
      entradas: { type: "number" },
      salidas: { type: "number" },
      fecha_salida: { type: "string", search: true },
      stock_minimo: { type: "number" },
      fecha_caducidad: { type: "string", search: true },
      estado: { type: "string", search: true },
      lote: { type: "string", search: true },
      ubicacion: { type: "string", search: true },
      observaciones: { type: "string", search: true },
    },
    options_map: { value: "id", label: "name" },
    hooks: {
      before_create: (_ctx, row) => prepare_item_payload(row),
      before_update: (_ctx, _id, patch, existing) =>
        prepare_item_payload(patch, {
          cantidad: Number(existing.cantidad ?? 0),
          entradas: Number(existing.entradas ?? 0),
          salidas: Number(existing.salidas ?? 0),
          fecha_salida:
            existing.fecha_salida == null
              ? null
              : String(existing.fecha_salida),
        }),
    },
  }),
  tables: inventario_sanitario_tables,
  pages: inventario_sanitario_pages,
  menu: [],
});
