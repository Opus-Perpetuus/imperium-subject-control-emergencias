import type { KirletTableDecl } from "@opus-perpetuus/imperium-core-kit";

export const directorio_contactos_tables: KirletTableDecl[] = [
  {
    name: "directorio_contactos",
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
      { name: "categoria", type: "text" },
      { name: "telefono", type: "text" },
      { name: "telefono_secundario", type: "text" },
      { name: "direccion", type: "text" },
      { name: "web", type: "text" },
      { name: "email", type: "text" },
      { name: "fax", type: "text" },
      { name: "observaciones", type: "text" },
    ],
    indexes: [
      { name: "idx_directorio_contactos_name", columns: ["name"] },
      { name: "idx_directorio_contactos_active", columns: ["is_active"] },
    ],
  },
];
