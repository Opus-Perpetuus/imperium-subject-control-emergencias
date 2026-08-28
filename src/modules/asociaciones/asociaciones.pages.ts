import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const asociaciones_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.asociaciones",
    path: "asociaciones",
    permission: "subject.control-emergencias.asociaciones.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.asociaciones",
        owner: "subject-control-emergencias",
        title: "Gestión de asociaciones",
        props: {
          basePath: "asociaciones",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Gestión de asociaciones",
            subtitle: "Submenú de control-emergencias",
            pluralLabel: "gestión de asociaciones",
            singularLabel: "gestión de asociaciones",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/asociaciones`,
            record: `${API}/asociaciones/:id`,
            create: { method: "POST", action: `${API}/asociaciones` },
            update: { method: "PATCH", action: `${API}/asociaciones/:id` },
            delete: { method: "DELETE", action: `${API}/asociaciones/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
              { key: "telefono", label: "telefono", sortable: true, priority: 3 },
              { key: "correo", label: "correo", sortable: true, priority: 3 },
              { key: "ciudad", label: "ciudad", sortable: true, priority: 3 },
              { key: "localidad", label: "localidad", sortable: true, priority: 3 },
              { key: "tipo", label: "tipo", sortable: true, priority: 3 },
              { key: "fecha", label: "fecha", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "description", component: "input-text", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
              { name: "telefono", component: "input-text", label: "telefono" },
              { name: "correo", component: "input-text", label: "correo" },
              { name: "ciudad", component: "input-text", label: "ciudad" },
              { name: "localidad", component: "input-text", label: "localidad" },
              { name: "tipo", component: "input-text", label: "tipo" },
              { name: "fecha", component: "input-date", label: "fecha" },
              {
                name: "fecha_interaccion",
                component: "input-date",
                label: "Fecha de interacción",
              },
              {
                name: "tipo_interaccion",
                component: "input-menu",
                label: "Tipo de interacción",
                options: [
                  { value: "llamada", label: "Llamada" },
                  { value: "correo", label: "Correo" },
                  { value: "carta", label: "Carta" },
                  { value: "persona", label: "En persona" },
                  { value: "registro", label: "Registro" },
                ],
              },
              {
                name: "notas_interaccion",
                component: "input-text",
                label: "Notas de la interacción",
              },
              { name: "notas", component: "input-text", label: "notas" },
              { name: "pais", component: "input-text", label: "pais" },
              { name: "interacciones", component: "input-json", label: "interacciones" },
              { name: "observaciones", component: "input-text", label: "observaciones" },
            ],
          },
        },
      }),
  },
];
