import type { KirletTableDecl } from "@opus-perpetuus/imperium-core-kit";

export const servicios_realizados_tables: KirletTableDecl[] = [
  {
    name: "servicios_realizados",
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
      { name: "tipo_servicio", type: "text" },
      { name: "fecha_hora_inicio", type: "text" },
      { name: "fecha_hora_fin", type: "text" },
      { name: "total_horas", type: "real" },
      { name: "lugar", type: "text" },
      { name: "vehiculos", type: "text" },
      { name: "voluntarios", type: "text" },
      { name: "resumen", type: "text" },
      { name: "asistencias", type: "text" },
      { name: "incidencias", type: "text" },
    ],
    indexes: [
      { name: "idx_servicios_realizados_name", columns: ["name"] },
      { name: "idx_servicios_realizados_active", columns: ["is_active"] },
    ],
  },
];
