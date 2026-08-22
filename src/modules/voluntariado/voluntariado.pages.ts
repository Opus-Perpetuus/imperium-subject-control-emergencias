import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const voluntariado_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.voluntariado",
    path: "voluntariado",
    permission: "subject.control-emergencias.voluntariado.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.voluntariado",
        owner: "subject-control-emergencias",
        title: "Gestión de voluntariado",
        props: {
          basePath: "voluntariado",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Gestión de voluntariado",
            subtitle: "Submenú de control-emergencias",
            pluralLabel: "gestión de voluntariado",
            singularLabel: "gestión de voluntariado",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/voluntariado`,
            record: `${API}/voluntariado/:id`,
            create: { method: "POST", action: `${API}/voluntariado` },
            update: { method: "PATCH", action: `${API}/voluntariado/:id` },
            delete: { method: "DELETE", action: `${API}/voluntariado/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
              { key: "numero_socio", label: "numero socio", sortable: true, priority: 3 },
              { key: "indicativo", label: "indicativo", sortable: true, priority: 3 },
              { key: "estado", label: "estado", sortable: true, priority: 3 },
              { key: "documento_identidad", label: "documento identidad", sortable: true, priority: 3 },
              { key: "telefono", label: "telefono", sortable: true, priority: 3 },
              { key: "correo", label: "correo", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "description", component: "input-text", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
              { name: "numero_socio", component: "input-text", label: "numero socio" },
              { name: "indicativo", component: "input-text", label: "indicativo" },
              { name: "estado", component: "input-text", label: "estado" },
              { name: "documento_identidad", component: "input-text", label: "documento identidad" },
              { name: "telefono", component: "input-text", label: "telefono" },
              { name: "correo", component: "input-text", label: "correo" },
              { name: "localidad", component: "input-text", label: "localidad" },
              { name: "foto", component: "input-text", label: "foto" },
              { name: "fecha_ingreso", component: "input-text", label: "fecha ingreso" },
              { name: "fecha_nacimiento", component: "input-text", label: "fecha nacimiento" },
              { name: "direccion_postal", component: "input-text", label: "direccion postal" },
              { name: "codigo_postal", component: "input-text", label: "codigo postal" },
              { name: "formacion_interes", component: "input-json", label: "formacion interes" },
              { name: "otra_formacion", component: "input-text", label: "otra formacion" },
              { name: "carnet_conducir", component: "input-text", label: "carnet conducir" },
              { name: "observaciones", component: "input-text", label: "observaciones" },
              { name: "documentos_adjuntos", component: "input-json", label: "documentos adjuntos" },
            ],
          },
        },
      }),
  },
];
