import { cn } from "@/lib/utils";

export interface EyebrowProps {
  /** Texto corto en versales, por ejemplo `"Expertise"`. */
  label: string;
  /**
   * Número de orden de la sección, como `"01"`. Se pinta en el degradado del
   * accent y es lo único que aporta color a la línea.
   */
  index?: string;
  className?: string;
}

/**
 * Etiqueta que precede a los titulares: `01 —— PERFIL`.
 *
 * Es el recurso que da carácter editorial a la página. Aporta tres cosas que
 * un título suelto no puede dar: numera las secciones para que se lean como
 * un recorrido, mete un tamaño muy pequeño en versales que contrasta con el
 * titular grande, y deja un filete que ancla el bloque al margen izquierdo.
 *
 * El número es decorativo y no aporta significado propio, así que se oculta a
 * los lectores de pantalla: quien escuche la página oirá el titular
 * directamente, sin un "cero uno" delante.
 */
export function Eyebrow({ label, index, className }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {index && (
        <span
          aria-hidden="true"
          className="text-gradient-accent text-eyebrow font-bold tabular-nums tracking-eyebrow"
        >
          {index}
        </span>
      )}
      <span aria-hidden="true" className="h-px w-8 rule-fade" />
      <span className="text-eyebrow font-semibold uppercase tracking-eyebrow text-ink-mute">
        {label}
      </span>
    </div>
  );
}
