import { cn } from "@/lib/utils";

export interface DividerProps {
  className?: string;
}

/**
 * Línea horizontal de separación en el gris de bordes del sistema.
 *
 * Se dibuja con `bg-line` sobre un elemento de 1 px en lugar de con
 * `border`, porque así el grosor es exacto en cualquier densidad de pantalla.
 */
export function Divider({ className }: DividerProps) {
  return <hr className={cn("h-px w-full border-0 bg-line", className)} />;
}
