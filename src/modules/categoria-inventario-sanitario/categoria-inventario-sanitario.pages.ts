import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const categoria_inventario_sanitario_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.categoria-inventario-sanitario",
    path: "categoria-inventario-sanitario",
    permission: "subject.control-emergencias.categoria-inventario-sanitario.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.categoria-inventario-sanitario",
        owner: "subject-control-emergencias",
        title: "Categorías de inventario sanitario",
        props: {
          basePath: "categoria-inventario-sanitario",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Categorías de inventario sanitario",
            subtitle: "Catálogo editable de categorías",
            pluralLabel: "categorías",
            singularLabel: "categoría",
            emptyTitle: "Sin categorías",
            emptyDescription: "Crea la primera categoría del inventario sanitario",
          },
          data: {
            list: `${API}/categoria-inventario-sanitario`,
            record: `${API}/categoria-inventario-sanitario/:id`,
            create: { method: "POST", action: `${API}/categoria-inventario-sanitario` },
            update: { method: "PATCH", action: `${API}/categoria-inventario-sanitario/:id` },
            delete: { method: "DELETE", action: `${API}/categoria-inventario-sanitario/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "ref", label: "Clave", sortable: true, priority: 2 },
              { key: "is_active", label: "Activo", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "ref", component: "input-text", label: "Clave (_ref)" },
              { name: "description", component: "input-textarea", label: "Descripción" },
            ],
          },
        },
      }),
  },
];
