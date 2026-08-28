import type { KirletTableDecl } from "@opus-perpetuus/imperium-core-kit";

export const inventario_general_tables: KirletTableDecl[] = [
  {
    name: "inventario_general",
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
      { name: "cantidad", type: "real" },
      { name: "ubicacion", type: "text" },
      { name: "retiradas", type: "real" },
    ],
    indexes: [
      { name: "idx_inventario_general_name", columns: ["name"] },
      { name: "idx_inventario_general_active", columns: ["is_active"] },
    ],
  },
];
