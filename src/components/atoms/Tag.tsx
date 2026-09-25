import type { ReactNode } from "react";
import { LUCIDE_ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { LucideIconName } from "@/types";

export interface TagProps {
  children: ReactNode;
  /** Icono opcional a la izquierda, por ejemplo `"Calendar"` en un periodo. */
  icon?: LucideIconName;
  className?: string;
}

/**
 * Etiqueta pequeña en forma de píldora, pensada para periodos, fechas o
 * categorías.
 *
 * Usa el accent muy diluido y un borde del mismo tono en vez de un relleno
 * sólido: así marca el dato sin competir con los botones, que son los únicos
 * elementos con accent pleno. Las cifras van en versalitas tabulares para que
 * los rangos de años queden alineados entre entradas.
 */
export function Tag({ children, icon, className }: TagProps) {
  // Lectura directa del registro, igual que en `IconBadge`: resolver el icono
  // dentro de una llamada a función hace que `react-hooks/static-components`
  // lo tome por un componente creado en cada render.
  const Icon = icon ? LUCIDE_ICONS[icon] : null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft/60 px-2.5 py-1",
        "text-xs font-medium tabular-nums tracking-snug text-accent",
        className,
      )}
    >
      {Icon && <Icon size={12} strokeWidth={2} aria-hidden="true" />}
      {children}
    </span>
  );
}
