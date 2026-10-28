/**
 * Estatus de rescate animal (mismo enum escrito en form y seeds).
 * Colores alineados con convención Bootstrap del núcleo.
 */
export type StatusOption = {
  value: string;
  label: string;
  color: string;
  icon?: string;
};

export const RESCATE_ANIMAL_STATUS = {
  rescatado: "rescatado",
  desaparecido: "desaparecido",
  en_acogida: "en_acogida",
  adoptado: "adoptado",
  fallecido: "fallecido",
} as const;

export type RescateAnimalStatus =
  (typeof RESCATE_ANIMAL_STATUS)[keyof typeof RESCATE_ANIMAL_STATUS];

export const RESCATE_ANIMAL_STATUS_OPTIONS: StatusOption[] = [
  { value: RESCATE_ANIMAL_STATUS.rescatado, label: "Rescatado", color: "#198754", icon: "fas fa-check-circle" },
  { value: RESCATE_ANIMAL_STATUS.desaparecido, label: "Desaparecido", color: "#ffc107", icon: "fas fa-search" },
  { value: RESCATE_ANIMAL_STATUS.en_acogida, label: "En acogida", color: "#0d6efd", icon: "fas fa-home" },
  { value: RESCATE_ANIMAL_STATUS.adoptado, label: "Adoptado", color: "#198754", icon: "fas fa-heart" },
  { value: RESCATE_ANIMAL_STATUS.fallecido, label: "Fallecido", color: "#6c757d", icon: "fas fa-cross" },
];

export function status_label(options: StatusOption[], value: unknown): string {
  const v = String(value ?? "");
  return options.find((o) => o.value === v)?.label ?? v;
}
