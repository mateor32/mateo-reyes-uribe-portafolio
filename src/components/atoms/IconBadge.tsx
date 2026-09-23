import { getLucideIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { LucideIconName } from "@/types";

export type IconBadgeShape = "circle" | "square";

/**
 * Tonos permitidos. Es deliberadamente corto: el sistema de diseño solo
 * admite el accent como color saturado, así que no hay una prop de color
 * libre que permita romper la paleta por accidente.
 */
export type IconBadgeTone = "accent" | "neutral" | "success";

export interface IconBadgeProps {
  /** Nombre del icono de lucide-react, tal y como se guarda en `src/data/`. */
  icon: LucideIconName;
  shape?: IconBadgeShape;
  tone?: IconBadgeTone;
  /** Lado del recuadro en píxeles. */
  size?: number;
  /** Tamaño del icono. Por defecto, algo menos de la mitad del recuadro. */
  iconSize?: number;
  className?: string;
}

const TONES: Record<IconBadgeTone, string> = {
  accent: "bg-accent-soft text-accent",
  neutral: "bg-line/60 text-ink-soft",
  success: "bg-success/10 text-success",
};

/**
 * Recuadro con un icono centrado, usado como marca visual de las cards de
 * conocimientos y de las habilidades extra.
 *
 * Es puramente decorativo, así que el icono se marca `aria-hidden`: el
 * significado debe estar en el texto que lo acompaña.
 */
export function IconBadge({
  icon,
  shape = "circle",
  tone = "accent",
  size = 48,
  iconSize,
  className,
}: IconBadgeProps) {
  const Icon = getLucideIcon(icon);
  const resolvedIconSize = iconSize ?? Math.round(size * 0.45);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        shape === "circle" ? "rounded-full" : "rounded-xl",
        TONES[tone],
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Icon size={resolvedIconSize} aria-hidden="true" />
    </span>
  );
}
