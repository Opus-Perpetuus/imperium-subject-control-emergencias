import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const inventario_sanitario_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.inventario-sanitario",
    path: "inventario-sanitario",
    permission: "subject.control-emergencias.inventario-sanitario.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.inventario-sanitario",
        owner: "subject-control-emergencias",
        title: "Inventario sanitario",
        props: {
          basePath: "inventario-sanitario",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Inventario sanitario",
            subtitle: "Submenú de control-emergencias",
            pluralLabel: "inventario sanitario",
            singularLabel: "inventario sanitario",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/inventario-sanitario`,
            record: `${API}/inventario-sanitario/:id`,
            create: { method: "POST", action: `${API}/inventario-sanitario` },
            update: { method: "PATCH", action: `${API}/inventario-sanitario/:id` },
            delete: { method: "DELETE", action: `${API}/inventario-sanitario/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
              { key: "categoria", label: "categoria", sortable: true, priority: 3 },
              { key: "cantidad", label: "cantidad", sortable: true, priority: 3 },
              { key: "stock_minimo", label: "stock minimo", sortable: true, priority: 3 },
              { key: "fecha_caducidad", label: "fecha caducidad", sortable: true, priority: 3 },
              { key: "estado", label: "estado", sortable: true, priority: 3 },
              { key: "lote", label: "lote", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "description", component: "input-text", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
              { name: "categoria", component: "input-text", label: "categoria" },
              { name: "cantidad", component: "input-number", label: "cantidad" },
              { name: "stock_minimo", component: "input-number", label: "stock minimo" },
              { name: "fecha_caducidad", component: "input-text", label: "fecha caducidad" },
              { name: "estado", component: "input-text", label: "estado" },
              { name: "lote", component: "input-text", label: "lote" },
              { name: "ubicacion", component: "input-text", label: "ubicacion" },
              { name: "observaciones", component: "input-text", label: "observaciones" },
            ],
          },
        },
      }),
  },
];
