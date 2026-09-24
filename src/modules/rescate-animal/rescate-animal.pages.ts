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
              {
                name: "name",
                component: "input-text",
                label: "ID intervención (automático)",
                placeholder: "Vacío = INT-######",
              },
              { name: "chip_numero", component: "input-text", label: "Nº de chip (escáner o escrito)" },
              { name: "fecha", component: "input-date", label: "Fecha" },
              { name: "nombre_animal", component: "input-text", label: "Nombre del animal" },
              { name: "especie", component: "input-text", label: "Especie" },
              { name: "raza", component: "input-text", label: "Raza" },
              {
                name: "sexo",
                component: "input-menu",
                label: "Sexo",
                options: [
                  { value: "macho", label: "Macho" },
                  { value: "hembra", label: "Hembra" },
                  { value: "no_sabe", label: "No sabe" },
                ],
              },
              { name: "edad_aproximada", component: "input-text", label: "Edad aproximada" },
              {
                name: "tamano",
                component: "input-menu",
                label: "Tamaño",
                options: [
                  { value: "grande", label: "Grande" },
                  { value: "mediano", label: "Mediano" },
                  { value: "pequeno", label: "Pequeño" },
                ],
              },
              { name: "color", component: "input-text", label: "Color" },
              { name: "peso_aproximado", component: "input-number", label: "Peso aproximado (kg)", min: 0 },
              { name: "lugar_encontrado", component: "input-text", label: "Lugar encontrado" },
              {
                name: "estado",
                component: "input-menu",
                label: "Estado",
                options: [
                  { value: "rescatado", label: "Rescatado" },
                  { value: "desaparecido", label: "Desaparecido" },
                  { value: "en_acogida", label: "En acogida" },
                  { value: "adoptado", label: "Adoptado" },
                  { value: "fallecido", label: "Fallecido" },
                ],
              },
              {
                name: "derivado_a",
                component: "input-menu",
                label: "Derivado a",
                options: [
                  { value: "clinica_veterinaria", label: "Clínica veterinaria" },
                  { value: "centro_proteccion", label: "Centro de protección animal" },
                  { value: "apa", label: "APA" },
                  { value: "policia_local", label: "Policía local" },
                  { value: "agentes_forestales", label: "Agentes forestales" },
                ],
              },
              { name: "estado_animal", component: "input-textarea", label: "Condición del animal" },
              { name: "material_utilizado", component: "input-textarea", label: "Material utilizado" },
              { name: "description", component: "input-textarea", label: "Descripción" },
            ],
          },
        },
      }),
  },
];
