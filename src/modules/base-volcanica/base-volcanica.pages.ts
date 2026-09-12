import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const base_volcanica_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.base-volcanica",
    path: "base-volcanica",
    permission: "subject.control-emergencias.base-volcanica.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.base-volcanica",
        owner: "subject-control-emergencias",
        title: "Base volcánica",
        props: {
          basePath: "base-volcanica",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Base volcánica",
            subtitle: "Registro de volcanes y su nivel de alerta",
            pluralLabel: "registros",
            singularLabel: "registro",
            emptyTitle: "Sin registros",
            emptyDescription: "Crea el primer registro de base volcánica",
          },
          data: {
            list: `${API}/base-volcanica`,
            record: `${API}/base-volcanica/:id`,
            create: { method: "POST", action: `${API}/base-volcanica` },
            update: { method: "PATCH", action: `${API}/base-volcanica/:id` },
            delete: { method: "DELETE", action: `${API}/base-volcanica/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "categoria", label: "Categoría", sortable: true, priority: 2 },
              { key: "municipio", label: "Municipio", sortable: true, priority: 3 },
              { key: "estado_volcan", label: "Estado", sortable: true, priority: 4 },
              { key: "nivel_alerta", label: "Nivel de alerta", sortable: true, priority: 5 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "categoria", component: "input-menu", label: "Categoría" },
              { name: "municipio", component: "input-text", label: "Municipio" },
              { name: "estado_volcan", component: "input-menu", label: "Estado del volcán" },
              { name: "altura_msnm", component: "input-number", label: "Altura (msnm)" },
              { name: "ultima_erupcion", component: "input-date", label: "Última erupción" },
              { name: "nivel_alerta", component: "input-text", label: "Nivel de alerta" },
            ],
          },
        },
      }),
  },
];
