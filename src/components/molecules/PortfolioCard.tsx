"use client";

import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

export interface PortfolioCardProps {
  /** Título del proyecto. */
  title: string;
  /** Resumen de una línea. El texto largo va en el modal de detalle. */
  shortDescription: string;
  /** Ruta dentro de `public/`, por ejemplo `"/images/portfolio/x.jpg"`. */
  imageUrl: string;
  /**
   * Texto alternativo de la captura. Por defecto describe la vista previa;
   * si la imagen aporta información que no está en el texto, pásalo a mano.
   */
  imageAlt?: string;
  /**
   * Se dispara al pulsar el botón. La card no sabe qué ocurre después: el
   * organismo de portafolio es quien abre el modal y decide qué proyecto
   * mostrar.
   */
  onOpenDetails: () => void;
  /** Texto del botón. */
  actionLabel?: string;
  className?: string;
}

/**
 * Card de proyecto: captura, título, resumen y botón de detalle.
 *
 * El botón lleva una etiqueta accesible con el título del proyecto porque en
 * una rejilla hay varios botones con el mismo texto visible, y un lector de
 * pantalla que los lista fuera de contexto solo oiría "Saber más" repetido.
 *
 * La imagen usa `fill`, así que el contenedor lleva `relative` y una
 * proporción fija: el hueco queda reservado antes de que cargue y la rejilla
 * no salta.
 */
export function PortfolioCard({
  title,
  shortDescription,
  imageUrl,
  imageAlt,
  onOpenDetails,
  actionLabel = "Saber más",
  className,
}: PortfolioCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm",
        "transition-shadow duration-200 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full bg-accent-soft">
        <Image
          src={imageUrl}
          alt={imageAlt ?? `Vista previa de ${title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {shortDescription}
        </p>
        <Button
          size="sm"
          variant="secondary"
          onClick={onOpenDetails}
          aria-label={`${actionLabel} sobre ${title}`}
          className="mt-4 self-start"
        >
          {actionLabel}
        </Button>
      </div>
    </article>
  );
}
