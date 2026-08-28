import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const rescate_animal_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.rescate-animal",
    path: "rescate-animal",
    permission: "subject.control-emergencias.rescate-animal.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.rescate-animal",
        owner: "subject-control-emergencias",
        title: "Rescate animal",
        props: {
          basePath: "rescate-animal",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Rescate animal",
            subtitle: "Submenú de control-emergencias",
            pluralLabel: "rescate animal",
            singularLabel: "rescate animal",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/rescate-animal`,
            record: `${API}/rescate-animal/:id`,
            create: { method: "POST", action: `${API}/rescate-animal` },
            update: { method: "PATCH", action: `${API}/rescate-animal/:id` },
            delete: { method: "DELETE", action: `${API}/rescate-animal/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
              { key: "nombre_animal", label: "nombre animal", sortable: true, priority: 3 },
              { key: "especie", label: "especie", sortable: true, priority: 3 },
              { key: "estado", label: "estado", sortable: true, priority: 3 },
              { key: "fecha", label: "fecha", sortable: true, priority: 3 },
              { key: "lugar_encontrado", label: "lugar encontrado", sortable: true, priority: 3 },
              { key: "chip_numero", label: "chip numero", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Folio INT" },
              { name: "description", component: "input-text", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
              { name: "nombre_animal", component: "input-text", label: "nombre animal" },
              { name: "especie", component: "input-text", label: "especie" },
              { name: "estado", component: "input-text", label: "estado" },
              { name: "fecha", component: "input-text", label: "fecha" },
              { name: "lugar_encontrado", component: "input-text", label: "lugar encontrado" },
              { name: "chip_numero", component: "input-text", label: "Nº de chip (escáner o escrito)" },
              { name: "raza", component: "input-text", label: "raza" },
              { name: "edad_aproximada", component: "input-text", label: "edad aproximada" },
              { name: "color", component: "input-text", label: "color" },
              { name: "peso_aproximado", component: "input-number", label: "peso aproximado" },
              { name: "fotografia", component: "input-text", label: "fotografia" },
              { name: "estado_animal", component: "input-text", label: "estado animal" },
              { name: "material_utilizado", component: "input-text", label: "material utilizado" },
            ],
          },
        },
      }),
  },
];
