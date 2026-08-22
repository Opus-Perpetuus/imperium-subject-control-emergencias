import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const despensa_solidaria_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.despensa-solidaria",
    path: "despensa-solidaria",
    permission: "subject.control-emergencias.despensa-solidaria.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.despensa-solidaria",
        owner: "subject-control-emergencias",
        title: "Despensa solidaria",
        props: {
          basePath: "despensa-solidaria",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Despensa solidaria",
            subtitle: "Submenú de control-emergencias",
            pluralLabel: "despensa solidaria",
            singularLabel: "despensa solidaria",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/despensa-solidaria`,
            record: `${API}/despensa-solidaria/:id`,
            create: { method: "POST", action: `${API}/despensa-solidaria` },
            update: { method: "PATCH", action: `${API}/despensa-solidaria/:id` },
            delete: { method: "DELETE", action: `${API}/despensa-solidaria/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
              { key: "codigo_barras", label: "codigo barras", sortable: true, priority: 3 },
              { key: "categoria", label: "categoria", sortable: true, priority: 3 },
              { key: "cantidad", label: "cantidad", sortable: true, priority: 3 },
              { key: "stock_minimo", label: "stock minimo", sortable: true, priority: 3 },
              { key: "fecha_caducidad", label: "fecha caducidad", sortable: true, priority: 3 },
              { key: "estado", label: "estado", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "description", component: "input-text", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
              { name: "codigo_barras", component: "input-text", label: "codigo barras" },
              { name: "categoria", component: "input-text", label: "categoria" },
              { name: "cantidad", component: "input-number", label: "cantidad" },
              { name: "stock_minimo", component: "input-number", label: "stock minimo" },
              { name: "fecha_caducidad", component: "input-text", label: "fecha caducidad" },
              { name: "estado", component: "input-text", label: "estado" },
              { name: "fecha_salida", component: "input-text", label: "fecha salida" },
              { name: "productos_retirados", component: "input-number", label: "productos retirados" },
              { name: "motivos", component: "input-text", label: "motivos" },
            ],
          },
        },
      }),
  },
];
