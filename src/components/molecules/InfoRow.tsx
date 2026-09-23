import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Tonos admitidos para el valor. Es una lista cerrada, no un color libre,
 * para que nadie pueda meter un color fuera de la paleta desde el punto de
 * uso: el sistema solo admite el accent como color saturado, más el verde de
 * `success` reservado al estado de disponibilidad.
 */
export type InfoRowValueColor = "default" | "success" | "accent";

export interface InfoRowProps {
  /** Nombre del dato, por ejemplo `"Edad"` o `"Freelance"`. */
  label: string;
  /**
   * Valor mostrado. Admite nodos y no solo texto, por si hace falta un
   * enlace (`mailto:`) o una abreviatura dentro de la fila.
   */
  value: ReactNode;
  /** Color del valor. `success` es el caso "Freelance: Disponible". */
  valueColor?: InfoRowValueColor;
  className?: string;
}

const VALUE_COLORS: Record<InfoRowValueColor, string> = {
  default: "text-ink",
  success: "text-success",
  accent: "text-accent",
};

/**
 * Fila de dato con etiqueta y valor, usada en el bloque "Sobre mí" de la
 * barra lateral.
 *
 * Se dibuja como `<div>` con `<dt>`/`<dd>` dentro, así que **debe usarse
 * dentro de un `<dl>`**. Es HTML válido (la especificación permite agrupar
 * cada par en un `div`) y le da al lector de pantalla la relación entre el
 * nombre del dato y su valor, que se perdería con dos `<span>` sueltos.
 */
export function InfoRow({
  label,
  value,
  valueColor = "default",
  className,
}: InfoRowProps) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 py-2 text-sm",
        className,
      )}
    >
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className={cn("text-right font-medium", VALUE_COLORS[valueColor])}>
        {value}
      </dd>
    </div>
  );
}
