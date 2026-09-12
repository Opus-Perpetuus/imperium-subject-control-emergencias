import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const categoria_base_volcanica_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.categoria-base-volcanica",
    path: "categoria-base-volcanica",
    permission: "subject.control-emergencias.categoria-base-volcanica.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.categoria-base-volcanica",
        owner: "subject-control-emergencias",
        title: "Categorías de base volcánica",
        props: {
          basePath: "categoria-base-volcanica",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Categorías de base volcánica",
            subtitle: "Catálogo editable de categorías",
            pluralLabel: "categorías",
            singularLabel: "categoría",
            emptyTitle: "Sin categorías",
            emptyDescription: "Crea la primera categoría de base volcánica",
          },
          data: {
            list: `${API}/categoria-base-volcanica`,
            record: `${API}/categoria-base-volcanica/:id`,
            create: { method: "POST", action: `${API}/categoria-base-volcanica` },
            update: { method: "PATCH", action: `${API}/categoria-base-volcanica/:id` },
            delete: { method: "DELETE", action: `${API}/categoria-base-volcanica/:id` },
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
              { name: "description", component: "input-text", label: "Descripción" },
            ],
          },
        },
      }),
  },
];
