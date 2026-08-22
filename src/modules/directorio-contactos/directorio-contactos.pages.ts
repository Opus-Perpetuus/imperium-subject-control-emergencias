import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const directorio_contactos_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.directorio-contactos",
    path: "directorio-contactos",
    permission: "subject.control-emergencias.directorio-contactos.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.directorio-contactos",
        owner: "subject-control-emergencias",
        title: "Directorio de contactos",
        props: {
          basePath: "directorio-contactos",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Directorio de contactos",
            subtitle: "Submenú de control-emergencias",
            pluralLabel: "directorio de contactos",
            singularLabel: "directorio de contactos",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/directorio-contactos`,
            record: `${API}/directorio-contactos/:id`,
            create: { method: "POST", action: `${API}/directorio-contactos` },
            update: { method: "PATCH", action: `${API}/directorio-contactos/:id` },
            delete: { method: "DELETE", action: `${API}/directorio-contactos/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
              { key: "categoria", label: "categoria", sortable: true, priority: 3 },
              { key: "telefono", label: "telefono", sortable: true, priority: 3 },
              { key: "telefono_secundario", label: "telefono secundario", sortable: true, priority: 3 },
              { key: "direccion", label: "direccion", sortable: true, priority: 3 },
              { key: "web", label: "web", sortable: true, priority: 3 },
              { key: "email", label: "email", sortable: true, priority: 3 },
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
              { name: "telefono", component: "input-text", label: "telefono" },
              { name: "telefono_secundario", component: "input-text", label: "telefono secundario" },
              { name: "direccion", component: "input-text", label: "direccion" },
              { name: "web", component: "input-text", label: "web" },
              { name: "email", component: "input-text", label: "email" },
              { name: "fax", component: "input-text", label: "fax" },
              { name: "observaciones", component: "input-text", label: "observaciones" },
            ],
          },
        },
      }),
  },
];
