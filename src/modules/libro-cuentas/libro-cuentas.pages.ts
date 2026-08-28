import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-control-emergencias";

export const libro_cuentas_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.libro-cuentas",
    path: "libro-cuentas",
    permission: "subject.control-emergencias.libro-cuentas.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.libro-cuentas",
        owner: "subject-control-emergencias",
        title: "Libro de cuentas",
        props: {
          basePath: "libro-cuentas",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Libro de cuentas",
            subtitle: "Submenú de control-emergencias",
            pluralLabel: "movimientos",
            singularLabel: "movimiento",
            emptyTitle: "Sin movimientos",
            emptyDescription: "Registra la primera entrada o salida",
          },
          data: {
            list: `${API}/libro-cuentas`,
            record: `${API}/libro-cuentas/:id`,
            create: { method: "POST", action: `${API}/libro-cuentas` },
            update: { method: "PATCH", action: `${API}/libro-cuentas/:id` },
            delete: { method: "DELETE", action: `${API}/libro-cuentas/:id` },
          },
          table: {
            columns: [
              { key: "fecha", label: "Fecha", sortable: true, priority: 1 },
              { key: "name", label: "Motivo", sortable: true, priority: 1 },
              { key: "tipo", label: "Tipo", sortable: true, priority: 2 },
              { key: "importe", label: "Importe", sortable: true, priority: 2 },
              { key: "saldo", label: "Saldo", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Motivo", required: true },
              { name: "fecha", component: "input-date", label: "Fecha", required: true },
              {
                name: "tipo",
                component: "input-menu",
                label: "Tipo",
                required: true,
                options: [
                  { value: "entrada", label: "Entrada" },
                  { value: "salida", label: "Salida" },
                ],
              },
              { name: "importe", component: "input-number", label: "Importe", min: 0 },
              { name: "description", component: "input-text", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
            ],
          },
        },
      }),
  },
];
