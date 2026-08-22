import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const servicios_realizados_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.servicios-realizados",
    path: "servicios-realizados",
    permission: "subject.control-emergencias.servicios-realizados.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.servicios-realizados",
        owner: "subject-control-emergencias",
        title: "Servicios realizados",
        props: {
          basePath: "servicios-realizados",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Servicios realizados",
            subtitle: "Submenú de control-emergencias",
            pluralLabel: "servicios realizados",
            singularLabel: "servicios realizados",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/servicios-realizados`,
            record: `${API}/servicios-realizados/:id`,
            create: { method: "POST", action: `${API}/servicios-realizados` },
            update: { method: "PATCH", action: `${API}/servicios-realizados/:id` },
            delete: { method: "DELETE", action: `${API}/servicios-realizados/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
              { key: "tipo_servicio", label: "tipo servicio", sortable: true, priority: 3 },
              { key: "fecha_hora_inicio", label: "fecha hora inicio", sortable: true, priority: 3 },
              { key: "fecha_hora_fin", label: "fecha hora fin", sortable: true, priority: 3 },
              { key: "total_horas", label: "total horas", sortable: true, priority: 3 },
              { key: "lugar", label: "lugar", sortable: true, priority: 3 },
              { key: "vehiculos", label: "vehiculos", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "description", component: "input-text", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
              { name: "tipo_servicio", component: "input-text", label: "tipo servicio" },
              { name: "fecha_hora_inicio", component: "input-text", label: "fecha hora inicio" },
              { name: "fecha_hora_fin", component: "input-text", label: "fecha hora fin" },
              { name: "total_horas", component: "input-number", label: "total horas" },
              { name: "lugar", component: "input-text", label: "lugar" },
              { name: "vehiculos", component: "input-text", label: "vehiculos" },
              { name: "voluntarios", component: "input-text", label: "voluntarios" },
              { name: "resumen", component: "input-text", label: "resumen" },
              { name: "asistencias", component: "input-text", label: "asistencias" },
              { name: "incidencias", component: "input-text", label: "incidencias" },
            ],
          },
        },
      }),
  },
];
