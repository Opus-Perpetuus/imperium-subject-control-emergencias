import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const inventario_general_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.inventario-general",
    path: "inventario-general",
    permission: "subject.control-emergencias.inventario-general.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.inventario-general",
        owner: "subject-control-emergencias",
        title: "Inventario general",
        props: {
          basePath: "inventario-general",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Inventario general",
            subtitle: "Submenú de control-emergencias",
            pluralLabel: "artículos",
            singularLabel: "artículo",
            emptyTitle: "Sin registros",
            emptyDescription: "Crea el primer artículo o migra desde Mongo",
          },
          data: {
            list: `${API}/inventario-general`,
            record: `${API}/inventario-general/:id`,
            create: { method: "POST", action: `${API}/inventario-general` },
            update: { method: "PATCH", action: `${API}/inventario-general/:id` },
            delete: { method: "DELETE", action: `${API}/inventario-general/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "cantidad", label: "Cantidad", sortable: true, priority: 2 },
              { key: "ubicacion", label: "Ubicación", sortable: true, priority: 3 },
              { key: "retiradas", label: "Retiradas", sortable: true, priority: 3 },
              { key: "is_active", label: "Activo", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "cantidad", component: "input-number", label: "Cantidad", min: 0 },
              { name: "ubicacion", component: "input-text", label: "Ubicación", required: true },
              {
                name: "retiradas",
                component: "input-number",
                label: "Retiradas",
                min: 0,
              },
              { name: "description", component: "input-text", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
            ],
          },
        },
      }),
  },
];
