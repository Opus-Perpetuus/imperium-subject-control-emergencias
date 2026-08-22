import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { despensa_solidaria_pages } from "./despensa-solidaria.pages.ts";
import { despensa_solidaria_tables } from "./despensa-solidaria.tables.ts";

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
      codigo_barras: { type: "string", search: true },
      categoria: { type: "string", search: true },
      cantidad: { type: "number" },
      stock_minimo: { type: "number" },
      fecha_caducidad: { type: "string", search: true },
      estado: { type: "string", search: true },
      fecha_salida: { type: "string", search: true },
      productos_retirados: { type: "number" },
      motivos: { type: "string", search: true },
    },
    options_map: { value: "id", label: "name" },
  }),
  tables: despensa_solidaria_tables,
  pages: despensa_solidaria_pages,
  menu: [],
});
