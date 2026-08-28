import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { servicios_realizados_pages } from "./servicios-realizados.pages.ts";
import { servicios_realizados_tables } from "./servicios-realizados.tables.ts";
import {
  is_blank_service_number,
  next_service_folio,
} from "./servicios-realizados-folio.utils.ts";

export const servicios_realizados_module = define_module({
  resource: "servicios-realizados",
  labels: {
    singular: "Servicios realizados",
    plural: "Servicios realizados",
    read: "Ver Servicios realizados",
    write: "Editar Servicios realizados",
  },
  routes: define_crud({
    resource: "servicios-realizados",
    table: "servicios_realizados",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "servicio",
    fields: {
      name: { type: "string", search: true },
      description: { type: "string", search: true },
      is_active: { type: "boolean" },
      state: { type: "string" },
      ref: { type: "string", search: true },
      search_field: { type: "string", search: true },
      created_by: { type: "string" },
      custom_data: { type: "json" },
      payload: { type: "json" },
      tipo_servicio: { type: "string", search: true },
      fecha_hora_inicio: { type: "string", search: true },
      fecha_hora_fin: { type: "string", search: true },
      total_horas: { type: "number" },
      lugar: { type: "string", search: true },
      vehiculos: { type: "string", search: true },
      voluntarios: { type: "string", search: true },
      resumen: { type: "string", search: true },
      asistencias: { type: "string", search: true },
      incidencias: { type: "string", search: true },
    },
    options_map: { value: "id", label: "name" },
    hooks: {
      before_create: async (ctx, row) => {
        if (is_blank_service_number(row.name)) {
          const n = await ctx.data.count("servicios_realizados");
          row.name = next_service_folio(n);
        }
        return row;
      },
    },
  }),
  tables: servicios_realizados_tables,
  pages: servicios_realizados_pages,
  menu: [],
});
