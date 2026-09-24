import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";
import {
  categoria_options,
  type CategoriaCatalogoRow,
} from "../../lib/categoria-catalogo.utils.ts";

const API = "api://m/subject-control-emergencias";

/** Semillas del catálogo; solo se usan si la tabla está vacía. */
const CATEGORIAS_SEMILLA = [
  { value: "alimento", label: "Alimento" },
  { value: "higiene", label: "Higiene" },
  { value: "cubiertos", label: "Cubiertos" },
  { value: "infantil", label: "Infantil" },
  { value: "ropa", label: "Ropa" },
];

export const despensa_solidaria_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.despensa-solidaria",
    path: "despensa-solidaria",
    permission: "subject.control-emergencias.despensa-solidaria.read",
    build: async ({ data }) => {
      const catalog = (await data.findMany("categoria_despensa_solidaria", {
        where: { is_active: true },
        orderBy: { name: "asc" },
      })) as CategoriaCatalogoRow[];

      return build_feature_shell_page({
        id: "control-emergencias.despensa-solidaria",
        owner: "subject-control-emergencias",
        title: "Despensa solidaria",
        props: {
          basePath: "despensa-solidaria",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Despensa solidaria",
            subtitle: "Submenú de control-emergencias",
            pluralLabel: "despensa solidaria",
            singularLabel: "despensa solidaria",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/despensa-solidaria`,
            record: `${API}/despensa-solidaria/:id`,
            create: { method: "POST", action: `${API}/despensa-solidaria` },
            update: { method: "PATCH", action: `${API}/despensa-solidaria/:id` },
            delete: { method: "DELETE", action: `${API}/despensa-solidaria/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
              { key: "codigo_barras", label: "codigo barras", sortable: true, priority: 3 },
              { key: "categoria", label: "categoria", sortable: true, priority: 3 },
              { key: "cantidad", label: "cantidad", sortable: true, priority: 3 },
              { key: "stock_minimo", label: "stock minimo", sortable: true, priority: 3 },
              { key: "fecha_caducidad", label: "fecha caducidad", sortable: true, priority: 3 },
              { key: "estado", label: "estado", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "description", component: "input-textarea", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
              { name: "codigo_barras", component: "input-text", label: "Código de barras / QR" },
              {
                name: "categoria",
                component: "input-menu",
                label: "Categoría",
                required: true,
                options: categoria_options(catalog, CATEGORIAS_SEMILLA),
              },
              { name: "cantidad", component: "input-number", label: "cantidad" },
              { name: "stock_minimo", component: "input-number", label: "stock minimo" },
              { name: "fecha_caducidad", component: "input-date", label: "Caducidad" },
              { name: "fecha_salida", component: "input-date", label: "Salida (fecha)" },
              { name: "productos_retirados", component: "input-number", label: "productos retirados" },
              { name: "motivos", component: "input-textarea", label: "motivos" },
            ],
          },
        },
      });
    },
  },
];
