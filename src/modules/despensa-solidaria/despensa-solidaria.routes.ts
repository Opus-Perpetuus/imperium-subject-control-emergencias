import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { apply_categoria_catalogo } from "../../lib/categoria-catalogo.utils.ts";
import { compute_estado } from "../../lib/stock-estado.utils.ts";
import { despensa_solidaria_pages } from "./despensa-solidaria.pages.ts";
import { despensa_solidaria_tables } from "./despensa-solidaria.tables.ts";

const CATALOGO = "categoria_despensa_solidaria";

export const despensa_solidaria_module = define_module({
  resource: "despensa-solidaria",
  labels: {
    singular: "Despensa solidaria",
    plural: "Despensa solidaria",
    read: "Ver Despensa solidaria",
    write: "Editar Despensa solidaria",
  },
  routes: define_crud({
    resource: "despensa-solidaria",
    table: "despensa_solidaria",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "despensa",
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
      // Excel manda el EAN como número; se guarda como texto recortado.
      codigo_barras: {
        type: "string",
        search: true,
        normalize: (value) => (value == null ? "" : String(value).trim()),
      },
      categoria: { type: "string", required: true, search: true },
      cantidad: { type: "number" },
      stock_minimo: { type: "number" },
      fecha_caducidad: { type: "string", search: true },
      // Calculado por caducidad y stock; nunca lo manda el cliente.
      estado: { type: "string", search: true, create: false, update: false },
      fecha_salida: { type: "string", search: true },
      productos_retirados: { type: "number" },
      motivos: { type: "string", search: true },
    },
    options_map: { value: "id", label: "name" },
    hooks: {
      before_create: async (ctx, row) => {
        await apply_categoria_catalogo(ctx.data, CATALOGO, row);
        row.estado = compute_estado(row.fecha_caducidad, row.cantidad, row.stock_minimo);
        return row;
      },
      before_update: async (ctx, _id, patch, existing) => {
        await apply_categoria_catalogo(ctx.data, CATALOGO, patch);
        patch.estado = compute_estado(
          patch.fecha_caducidad ?? existing.fecha_caducidad,
          patch.cantidad ?? existing.cantidad,
          patch.stock_minimo ?? existing.stock_minimo,
        );
        return patch;
      },
    },
  }),
  tables: despensa_solidaria_tables,
  pages: despensa_solidaria_pages,
  menu: [],
});
