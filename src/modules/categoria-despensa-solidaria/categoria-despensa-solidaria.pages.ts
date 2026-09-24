import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const categoria_despensa_solidaria_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.categoria-despensa-solidaria",
    path: "categoria-despensa-solidaria",
    permission: "subject.control-emergencias.categoria-despensa-solidaria.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.categoria-despensa-solidaria",
        owner: "subject-control-emergencias",
        title: "Categorías de despensa solidaria",
        props: {
          basePath: "categoria-despensa-solidaria",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Categorías de despensa solidaria",
            subtitle: "Catálogo editable de categorías",
            pluralLabel: "categorías",
            singularLabel: "categoría",
            emptyTitle: "Sin categorías",
            emptyDescription: "Crea la primera categoría de la despensa",
          },
          data: {
            list: `${API}/categoria-despensa-solidaria`,
            record: `${API}/categoria-despensa-solidaria/:id`,
            create: { method: "POST", action: `${API}/categoria-despensa-solidaria` },
            update: { method: "PATCH", action: `${API}/categoria-despensa-solidaria/:id` },
            delete: { method: "DELETE", action: `${API}/categoria-despensa-solidaria/:id` },
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
