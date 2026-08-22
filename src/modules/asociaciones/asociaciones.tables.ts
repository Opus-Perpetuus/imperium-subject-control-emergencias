import type { KirletTableDecl } from "@opus-perpetuus/imperium-core-kit";

export const asociaciones_tables: KirletTableDecl[] = [
  {
    name: "asociaciones",
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
      { name: "telefono", type: "text" },
      { name: "correo", type: "text" },
      { name: "ciudad", type: "text" },
      { name: "localidad", type: "text" },
      { name: "tipo", type: "text" },
      { name: "fecha", type: "text" },
      { name: "notas", type: "text" },
      { name: "pais", type: "text" },
      { name: "interacciones", type: "json" },
      { name: "observaciones", type: "text" },
    ],
    indexes: [
      { name: "idx_asociaciones_name", columns: ["name"] },
      { name: "idx_asociaciones_active", columns: ["is_active"] },
    ],
  },
];
