import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const categoria_directorio_contactos_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.categoria-directorio-contactos",
    path: "categoria-directorio-contactos",
    permission: "subject.control-emergencias.categoria-directorio-contactos.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.categoria-directorio-contactos",
        owner: "subject-control-emergencias",
        title: "Categorías del directorio",
        props: {
          basePath: "categoria-directorio-contactos",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Categorías del directorio",
            subtitle: "Catálogo editable de categorías",
            pluralLabel: "categorías",
            singularLabel: "categoría",
            emptyTitle: "Sin categorías",
            emptyDescription: "Crea la primera categoría del directorio",
          },
          data: {
            list: `${API}/categoria-directorio-contactos`,
            record: `${API}/categoria-directorio-contactos/:id`,
            create: { method: "POST", action: `${API}/categoria-directorio-contactos` },
            update: { method: "PATCH", action: `${API}/categoria-directorio-contactos/:id` },
            delete: { method: "DELETE", action: `${API}/categoria-directorio-contactos/:id` },
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
