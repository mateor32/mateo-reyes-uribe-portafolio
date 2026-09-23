import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /**
   * Id del `h2`, útil para enlazarlo desde la navegación o para referenciarlo
   * con `aria-labelledby` desde la `<section>` que lo contiene.
   */
  id?: string;
  className?: string;
}

/**
 * Encabezado de sección: título de 32 px en peso 700 y, opcionalmente, una
 * línea de apoyo en el gris de texto secundario.
 */
export function SectionHeading({
  title,
  subtitle,
  align = "left",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <h2
        id={id}
        className="text-[2rem] font-bold leading-tight tracking-tight text-ink"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-2 text-base text-muted",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
