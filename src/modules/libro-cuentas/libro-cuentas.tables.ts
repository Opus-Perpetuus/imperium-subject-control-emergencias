import type { KirletTableDecl } from "@opus-perpetuus/imperium-core-kit";

export const libro_cuentas_tables: KirletTableDecl[] = [
  {
    name: "libro_cuentas",
    columns: [
      { name: "id", type: "text", primaryKey: true },
      { name: "name", type: "text", notNull: true },
      { name: "description", type: "text" },
      { name: "is_active", type: "boolean", notNull: true, default: true },
      { name: "state", type: "text" },
      { name: "ref", type: "text", unique: true },
      { name: "search_field", type: "text" },
      { name: "created_by", type: "text" },
      { name: "custom_data", type: "json" },
      { name: "payload", type: "json" },
      { name: "created_at", type: "text", notNull: true },
      { name: "updated_at", type: "text", notNull: true },
      { name: "fecha", type: "text" },
      { name: "tipo", type: "text" },
      { name: "motivo", type: "text" },
      { name: "importe", type: "real" },
      { name: "saldo", type: "real" },
    ],
    indexes: [
      { name: "idx_libro_cuentas_name", columns: ["name"] },
      { name: "idx_libro_cuentas_active", columns: ["is_active"] },
      { name: "idx_libro_cuentas_fecha", columns: ["fecha"] },
    ],
  },
];
