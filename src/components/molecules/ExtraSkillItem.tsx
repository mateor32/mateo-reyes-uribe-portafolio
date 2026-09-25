import { IconBadge } from "@/components/atoms/IconBadge";
import { cn } from "@/lib/utils";
import type { LucideIconName } from "@/types";

export interface ExtraSkillItemProps {
  /** Texto de la habilidad, por ejemplo `"Problem solving"`. */
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
 * y compartir tono haría que compitieran por la atención. Al pasar el cursor,
 * el texto se oscurece; es la única señal de que la fila está viva.
 *
 * El icono es decorativo y `IconBadge` lo marca como tal, así que el
 * significado vive entero en la etiqueta.
 */
export function ExtraSkillItem({ label, icon, className }: ExtraSkillItemProps) {
  return (
    <div className={cn("group flex items-center gap-3", className)}>
      <IconBadge icon={icon} shape="square" tone="neutral" size={34} />
      <span className="text-sm tracking-snug text-ink-mute transition-colors duration-200 group-hover:text-ink-soft">
        {label}
      </span>
    </div>
  );
}
