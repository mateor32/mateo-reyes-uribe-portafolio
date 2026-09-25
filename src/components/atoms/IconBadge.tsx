import { LUCIDE_ICONS } from "@/lib/icons";
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

/**
 * Fondo de cada tono.
 *
 * Los degradados son del propio accent —del tono suave al blanco— y añaden
 * un borde interior claro. Es lo que convierte un cuadrado de color plano en
 * una superficie: se lee como una pastilla con volumen y no como un relleno.
 */
const TONES: Record<IconBadgeTone, string> = {
  accent:
    "bg-gradient-to-br from-accent-soft to-surface text-accent ring-1 ring-inset ring-accent/10",
  neutral:
    "bg-gradient-to-br from-line-soft to-surface text-ink-mute ring-1 ring-inset ring-line",
  success:
    "bg-gradient-to-br from-success/10 to-surface text-success ring-1 ring-inset ring-success/20",
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
  // Se lee directamente del registro y no a través de un accesor: la regla
  // `react-hooks/static-components` trata el valor devuelto por una función
  // como un componente recién creado en cada render y lo marca como error,
  // aunque aquí siempre sea la misma referencia constante.
  const Icon = LUCIDE_ICONS[icon];
  const resolvedIconSize = iconSize ?? Math.round(size * 0.44);

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
      <Icon size={resolvedIconSize} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
