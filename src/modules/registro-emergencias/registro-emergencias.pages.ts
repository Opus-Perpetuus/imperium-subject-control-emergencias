import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";
import {
  MEDIO_RECEPCION,
  PRIORIDAD,
  RELACION_ALERTANTE,
  RESULTADO,
  TIPO_EMERGENCIA,
} from "./registro-emergencias-catalogo.utils.ts";

const API = "api://m/subject-control-emergencias";

export const registro_emergencias_pages: KirletPageDecl[] = [
  {
    id: "control-emergencias.registro-emergencias",
    path: "registro-emergencias",
    permission: "subject.control-emergencias.registro-emergencias.read",
    build: () =>
      build_feature_shell_page({
        id: "control-emergencias.registro-emergencias",
        owner: "subject-control-emergencias",
        title: "Registro de emergencias",
        props: {
          basePath: "registro-emergencias",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Registro de emergencias",
            subtitle: "Avisos S.E.R.E.M.",
            pluralLabel: "avisos",
            singularLabel: "aviso",
            emptyTitle: "Sin avisos",
            emptyDescription: "El número de incidencia se asigna al guardar",
          },
          data: {
            list: `${API}/registro-emergencias`,
            record: `${API}/registro-emergencias/:id`,
            create: { method: "POST", action: `${API}/registro-emergencias` },
            update: { method: "PATCH", action: `${API}/registro-emergencias/:id` },
            delete: { method: "DELETE", action: `${API}/registro-emergencias/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nº de incidencia", sortable: true, priority: 1 },
              { key: "fecha_hora_recepcion", label: "Recepción", sortable: true, priority: 1 },
              { key: "tipo_emergencia", label: "Tipo", sortable: true, priority: 2 },
              { key: "prioridad", label: "Prioridad", sortable: true, priority: 2 },
              { key: "municipio", label: "Municipio", sortable: true, priority: 3 },
              { key: "resultado", label: "Resultado", sortable: true, priority: 3 },
              { key: "relacion_alertante", label: "Origen", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              {
                name: "name",
                component: "input-text",
                label: "Nº de incidencia (automático)",
                placeholder: "Vacío = AVISO-#####",
              },
              { name: "fecha_hora_recepcion", component: "input-text", label: "Fecha y hora de recepción" },
              { name: "telefono", component: "input-text", label: "Teléfono", type: "tel" },
              {
                name: "medio_recepcion",
                component: "input-menu",
                label: "Medio de recepción",
                options: MEDIO_RECEPCION,
              },
              { name: "operador", component: "input-text", label: "Operador que atiende" },
              { name: "duracion_llamada", component: "input-number", label: "Duración (min)", min: 0 },
              {
                name: "prioridad",
                component: "input-menu",
                label: "Prioridad",
                options: PRIORIDAD,
              },
              {
                name: "relacion_alertante",
                component: "input-menu",
                label: "Relación / origen",
                options: RELACION_ALERTANTE,
              },
              { name: "alertante_nombre", component: "input-text", label: "Nombre del alertante" },
              { name: "alertante_telefono", component: "input-text", label: "Teléfono del alertante", type: "tel" },
              {
                name: "tipo_emergencia",
                component: "input-menu",
                label: "Tipo de emergencia",
                options: TIPO_EMERGENCIA,
              },
              { name: "direccion_exacta", component: "input-text", label: "Dirección exacta" },
              { name: "municipio", component: "input-text", label: "Municipio" },
              { name: "provincia", component: "input-text", label: "Provincia" },
              { name: "coordenadas_gps", component: "input-json", label: "Coordenadas GPS" },
              { name: "punto_referencia", component: "input-text", label: "Punto de referencia" },
              {
                name: "descripcion_inicial",
                component: "input-textarea",
                label: "Descripción inicial de los hechos",
              },
              { name: "num_afectados", component: "input-number", label: "Nº de afectados", min: 0 },
              { name: "existencia_heridos", component: "input-checkbox", label: "Existencia de heridos" },
              { name: "victimas_mortales", component: "input-checkbox", label: "Víctimas mortales" },
              { name: "presencia_menores", component: "input-checkbox", label: "Presencia de menores o dependientes" },
              { name: "riesgos_anadidos", component: "input-json", label: "Riesgos añadidos" },
              { name: "hora_movilizacion", component: "input-text", label: "Hora de movilización" },
              { name: "hora_llegada", component: "input-text", label: "Hora de llegada" },
              { name: "indicativos_vehiculos", component: "input-text", label: "Indicativos de vehículos" },
              {
                name: "personal_voluntario_activado",
                component: "input-number",
                label: "Personal voluntario activado",
                min: 0,
              },
              { name: "material_especifico", component: "input-text", label: "Material específico" },
              { name: "recursos_externos", component: "input-json", label: "Recursos externos" },
              {
                name: "instrucciones_alertante",
                component: "input-textarea",
                label: "Instrucciones al alertante",
              },
              {
                name: "consejos_autoproteccion",
                component: "input-textarea",
                label: "Consejos de autoprotección",
              },
              { name: "seguimiento_telefonico", component: "input-checkbox", label: "Seguimiento telefónico" },
              {
                name: "coordinacion_entidades",
                component: "input-textarea",
                label: "Coordinación con otras entidades",
              },
              {
                name: "observaciones_operador",
                component: "input-textarea",
                label: "Observaciones del operador",
              },
              { name: "hora_finalizacion", component: "input-text", label: "Hora de finalización" },
              {
                name: "resultado",
                component: "input-menu",
                label: "Resultado",
                options: RESULTADO,
              },
              { name: "responsable_cierre", component: "input-text", label: "Responsable del cierre" },
              {
                name: "necesidad_seguimiento",
                component: "input-checkbox",
                label: "Necesidad de seguimiento posterior",
              },
              { name: "resumen_final", component: "input-textarea", label: "Resumen final" },
              { name: "adjuntos", component: "input-json", label: "Adjuntos" },
            ],
          },
        },
      }),
  },
];
