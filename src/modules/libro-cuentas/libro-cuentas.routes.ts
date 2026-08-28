import {
  define_crud,
  define_module,
  type KirletCtx,
} from "@opus-perpetuus/imperium-core-kit";
import { libro_cuentas_pages } from "./libro-cuentas.pages.ts";
import { libro_cuentas_tables } from "./libro-cuentas.tables.ts";
import {
  compute_running_saldos,
  prepare_movement_payload,
  type LibroCuentasMovimientoSaldo,
} from "./libro-cuentas-saldo.utils.ts";

async function refresh_book_saldos(ctx: KirletCtx): Promise<void> {
  const book = (await ctx.data.findMany("libro_cuentas", {
    where: { is_active: true },
  })) as LibroCuentasMovimientoSaldo[];
  for (const row of compute_running_saldos(book)) {
    if (!row.id) continue;
    await ctx.data.update(
      "libro_cuentas",
      { id: String(row.id) },
      { saldo: row.saldo },
    );
  }
}

export const libro_cuentas_module = define_module({
  resource: "libro-cuentas",
  labels: {
    singular: "Movimiento",
    plural: "Libro de cuentas",
    read: "Ver Libro de cuentas",
    write: "Editar Libro de cuentas",
  },
  routes: define_crud({
    resource: "libro-cuentas",
    table: "libro_cuentas",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "fecha:desc",
    id_prefix: "librocue",
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
      fecha: { type: "string", required: true, search: true },
      tipo: { type: "string", required: true, search: true },
      motivo: { type: "string", search: true },
      importe: { type: "number" },
      saldo: { type: "number", create: false, update: false },
    },
    options_map: { value: "id", label: "name" },
    hooks: {
      before_create: (_ctx, row) => prepare_movement_payload(row),
      before_update: (_ctx, _id, patch) => prepare_movement_payload(patch),
      after_create: async (ctx) => {
        await refresh_book_saldos(ctx);
      },
      after_update: async (ctx) => {
        await refresh_book_saldos(ctx);
      },
      after_delete: async (ctx) => {
        await refresh_book_saldos(ctx);
      },
    },
  }),
  tables: libro_cuentas_tables,
  pages: libro_cuentas_pages,
  menu: [],
});
