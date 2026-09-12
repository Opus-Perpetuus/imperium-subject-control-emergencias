import type { KirletTableDecl } from "@opus-perpetuus/imperium-core-kit";

export const base_volcanica_tables: KirletTableDecl[] = [
  {
    name: "base_volcanica",
    columns: [
      { name: "id", type: "text", primaryKey: true },
      { name: "name", type: "text", notNull: true },
      { name: "description", type: "text" },
      { name: "categoria", type: "text" },
      { name: "municipio", type: "text" },
      { name: "estado_volcan", type: "text" },
      { name: "altura_msnm", type: "real" },
      { name: "ultima_erupcion", type: "text" },
      { name: "nivel_alerta", type: "text" },
      { name: "is_active", type: "boolean", notNull: true, default: true },
      { name: "state", type: "text" },
      { name: "ref", type: "text", unique: true },
      { name: "search_field", type: "text" },
      { name: "created_by", type: "text" },
      { name: "custom_data", type: "json" },
      { name: "payload", type: "json" },
      { name: "created_at", type: "text", notNull: true },
      { name: "updated_at", type: "text", notNull: true },
    ],
    indexes: [
      { name: "idx_base_volcanica_name", columns: ["name"] },
      { name: "idx_base_volcanica_active", columns: ["is_active"] },
      { name: "idx_base_volcanica_categoria", columns: ["categoria"] },
    ],
  },
];
