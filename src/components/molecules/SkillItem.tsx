import { ProgressBar } from "@/components/atoms/ProgressBar";
import { cn } from "@/lib/utils";

export interface SkillItemProps {
  /** Nombre de la destreza: `"English"`, `"Java"`... */
  name: string;
  /** Porcentaje de 0 a 100. La barra recorta los valores fuera de rango. */
  level: number;
  /** Oculta la cifra y deja solo el nombre y la barra. */
  showPercentage?: boolean;
  className?: string;
}

/**
 * Nombre, porcentaje y barra de progreso.
 *
 * Sirve igual para idiomas y para lenguajes de programación porque no sabe
 * nada de lo que mide: recibe un nombre y un número.
 *
 * El porcentaje va en cifras tabulares y en un gris de apoyo, no al mismo
 * peso que el nombre: la columna lleva ocho de estas filas y, con las cifras
 * destacadas, el ojo acaba leyendo una tabla de números en lugar de una lista
 * de destrezas. Se escribe como texto visible además de ir en el
 * `aria-valuenow` de la barra, de modo que el dato esté disponible aunque las
 * animaciones no lleguen a ejecutarse.
 */
export function SkillItem({
  name,
  level,
  showPercentage = true,
  className,
}: SkillItemProps) {
  const value = Math.round(Math.min(100, Math.max(0, level)));

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium tracking-snug text-ink-soft">
          {name}
        </span>
        {showPercentage && (
          <span className="text-xs tabular-nums text-muted">{value}</span>
        )}
      </div>
      <ProgressBar level={value} ariaLabel={name} />
    </div>
  );
}
