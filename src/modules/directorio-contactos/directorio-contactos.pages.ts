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
    build: async ({ data }) => {
      const catalog = (await data.findMany("categoria_directorio_contactos", {
        where: { is_active: true },
        orderBy: { name: "asc" },
      })) as Array<{ ref?: string; name?: string }>;
      const categoria_options = (
        catalog.length
          ? catalog
          : [
              { ref: "emergencias", name: "Emergencias" },
              { ref: "sanidad", name: "Sanidad" },
              { ref: "cultura", name: "Cultura" },
              { ref: "turismo", name: "Turismo" },
              { ref: "poblados", name: "Poblados" },
              { ref: "hacienda", name: "Hacienda y Economía" },
              { ref: "transporte", name: "Transporte" },
              { ref: "servicios_municipales", name: "Servicios municipales" },
              { ref: "gobierno", name: "Gobierno" },
              { ref: "comunidad_autonoma", name: "Comunidad autónoma" },
            ]
      ).map((row) => ({
        value: String(row.ref || row.name || ""),
        label: String(row.name || row.ref || ""),
      }));

      return build_feature_shell_page({
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
              {
                name: "categoria",
                component: "input-menu",
                label: "Categoría",
                required: true,
                options: categoria_options,
              },
              { name: "telefono", component: "input-text", label: "telefono" },
              { name: "telefono_secundario", component: "input-text", label: "telefono secundario" },
              { name: "direccion", component: "input-text", label: "direccion" },
              { name: "web", component: "input-text", label: "web" },
              { name: "email", component: "input-text", label: "email" },
              { name: "observaciones", component: "input-text", label: "observaciones" },
            ],
          },
        },
      });
    },
  },
  {
    /**
     * Directorio de emergencias para cualquiera, sin cuenta.
     *
     * Es el caso mas claro de pagina publica de esta app: un vecino que
     * necesita un telefono de emergencia no tiene —ni deberia tener— usuario
     * del sistema. La pagina la arma la app en cada visita, asi que los
     * telefonos que se ven son los que hay ahora mismo en el directorio.
     *
     * Solo salen los contactos activos, y solo los campos que tiene sentido
     * publicar: nombre, categoria, telefonos, direccion y web. Las
     * observaciones internas se quedan dentro.
     */
    id: "control-emergencias.directorio-publico",
    path: "directorio-publico",
    permission: "subject.control-emergencias.directorio-contactos.read",
    public_access: "anonymous",
    public_segment: "directorio",
    public_label: "Directorio de emergencias",
    build: async ({ data }) => {
      const contactos = (await data.findMany("directorio_contactos", {
        where: { is_active: true },
        orderBy: { name: "asc" },
        limit: 300,
      })) as Array<Record<string, unknown>>;

      const texto = (valor: unknown): string =>
        valor == null ? "" : String(valor).trim();

      // La ficha guarda el identificador de la categoria, no su nombre: sin
      // resolverlo el visitante leeria "servicios_municipales" como titulo.
      const categorias = (await data.findMany("categoria_directorio_contactos", {
        where: { is_active: true },
      })) as Array<{ ref?: unknown; name?: unknown }>;
      const nombre_categoria = new Map<string, string>();
      for (const cat of categorias) {
        const ref = texto(cat.ref);
        if (ref) nombre_categoria.set(ref, texto(cat.name) || ref);
      }
      const legible = (ref: string): string =>
        nombre_categoria.get(ref) ??
        ref.replace(/[_-]+/g, " ").replace(/^./, (l) => l.toUpperCase());

      const por_categoria = new Map<string, Array<Record<string, unknown>>>();
      for (const c of contactos) {
        const clave = legible(texto(c.categoria) || "otros");
        const grupo = por_categoria.get(clave) ?? [];
        grupo.push(c);
        por_categoria.set(clave, grupo);
      }

      const secciones: unknown[] = [];
      for (const [categoria, filas] of [...por_categoria.entries()].sort((a, b) =>
        a[0].localeCompare(b[0], "es"),
      )) {
        secciones.push({
          component: "nox.markdown-view",
          props: { content: `## ${categoria}` },
        });
        secciones.push({
          component: "nox.table",
          props: {
            columns: [
              { key: "name", label: "Contacto" },
              { key: "telefono", label: "Teléfono" },
              { key: "telefono_secundario", label: "Otro teléfono" },
              { key: "direccion", label: "Dirección" },
              { key: "web", label: "Sitio" },
            ],
            rows: filas.map((c) => ({
              name: texto(c.name),
              telefono: texto(c.telefono) || "—",
              telefono_secundario: texto(c.telefono_secundario) || "—",
              direccion: texto(c.direccion) || "—",
              web: texto(c.web) || "—",
            })),
          },
        });
      }

      return {
        id: "control-emergencias.directorio-publico",
        owner: "subject-control-emergencias",
        title: "Directorio de emergencias",
        page: {
          component: "nox.stack",
          props: { gap: "md" },
          children: [
            {
              component: "nox.stack",
              props: {
                block: "portada",
                title: "Directorio de emergencias",
                subtitle:
                  "Teléfonos y direcciones de los servicios de atención. Si es una emergencia en curso, llama primero.",
              },
              children: [],
            },
            ...(secciones.length
              ? secciones
              : [
                  {
                    component: "nox.empty",
                    props: {
                      title: "Directorio en preparación",
                      description:
                        "Todavía no hay contactos publicados en el directorio.",
                    },
                    text: "Directorio en preparación",
                  },
                ]),
          ],
        },
      };
    },
  },
];
