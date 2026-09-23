import { IconBadge } from "@/components/atoms/IconBadge";
import { cn } from "@/lib/utils";
import type { LucideIconName } from "@/types";

export interface ExtraSkillItemProps {
  /** Texto de la habilidad, por ejemplo `"Trabajo en equipo"`. */
  label: string;
  /** Nombre del icono registrado en `src/lib/icons.ts`. */
  icon: LucideIconName;
  className?: string;
}

/**
 * Icono y texto para la lista de habilidades extra.
 *
 * El recuadro va en tono neutro y forma cuadrada a propósito: estas
 * habilidades acompañan a la sección de conocimientos, que ya usa el accent,
 * y compartir tono haría que compitieran por la atención.
 *
 * El icono es decorativo y `IconBadge` lo marca como tal, así que el
 * significado vive entero en la etiqueta.
 */
export function ExtraSkillItem({ label, icon, className }: ExtraSkillItemProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <IconBadge icon={icon} shape="square" tone="neutral" size={40} />
      <span className="text-sm font-medium text-ink-soft">{label}</span>
    </div>
  );
}
