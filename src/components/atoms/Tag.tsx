import type { ReactNode } from "react";
import { getLucideIcon } from "@/lib/icons";
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
 * categorías. Usa el accent en su versión suave para no competir con los
 * botones, que son los únicos elementos con accent pleno.
 */
export function Tag({ children, icon, className }: TagProps) {
  const Icon = icon ? getLucideIcon(icon) : null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent",
        className,
      )}
    >
      {Icon && <Icon size={13} aria-hidden="true" />}
      {children}
    </span>
  );
}
