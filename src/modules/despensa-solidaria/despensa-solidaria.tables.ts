import type { KirletTableDecl } from "@opus-perpetuus/imperium-core-kit";

export const despensa_solidaria_tables: KirletTableDecl[] = [
  {
    name: "despensa_solidaria",
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
      { name: "codigo_barras", type: "text" },
      { name: "categoria", type: "text" },
      { name: "cantidad", type: "real" },
      { name: "stock_minimo", type: "real" },
      { name: "fecha_caducidad", type: "text" },
      { name: "estado", type: "text" },
      { name: "fecha_salida", type: "text" },
      { name: "productos_retirados", type: "real" },
      { name: "motivos", type: "text" },
    ],
    indexes: [
      { name: "idx_despensa_solidaria_name", columns: ["name"] },
      { name: "idx_despensa_solidaria_active", columns: ["is_active"] },
    ],
  },
];
