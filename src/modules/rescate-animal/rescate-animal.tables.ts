import type { KirletTableDecl } from "@opus-perpetuus/imperium-core-kit";

export const rescate_animal_tables: KirletTableDecl[] = [
  {
    name: "rescate_animal",
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
      { name: "nombre_animal", type: "text" },
      { name: "especie", type: "text" },
      { name: "estado", type: "text" },
      { name: "fecha", type: "text" },
      { name: "lugar_encontrado", type: "text" },
      { name: "chip_numero", type: "text" },
      { name: "raza", type: "text" },
      { name: "edad_aproximada", type: "text" },
      { name: "color", type: "text" },
      { name: "peso_aproximado", type: "real" },
      { name: "fotografia", type: "text" },
      { name: "estado_animal", type: "text" },
      { name: "material_utilizado", type: "text" },
    ],
    indexes: [
      { name: "idx_rescate_animal_name", columns: ["name"] },
      { name: "idx_rescate_animal_active", columns: ["is_active"] },
    ],
  },
];
