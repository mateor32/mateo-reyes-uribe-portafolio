"use client";

import type { PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ProjectImage } from "@/components/molecules/ProjectImage";
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
 * La captura se amplía ligeramente al pasar el cursor por la card, con el
 * recorte fijo: el movimiento ocurre dentro del marco, que no cambia de
 * tamaño, así que la fila del carrusel no se descoloca.
 *
 * El botón lleva una etiqueta accesible con el título del proyecto porque en
 * una fila hay varios botones con el mismo texto visible, y un lector de
 * pantalla que los lista fuera de contexto solo oiría "Learn more" repetido.
 *
 * La imagen usa `fill`, así que el contenedor lleva `relative` y una
 * proporción fija: el hueco queda reservado antes de que cargue y la fila no
 * salta.
 */
export function PortfolioCard({
  title,
  shortDescription,
  imageUrl,
  imageAlt,
  onOpenDetails,
  actionLabel = "Learn more",
  className,
}: PortfolioCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22 };
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [8, -8]), spring);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-8, 8]), spring);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <motion.article
      onPointerMove={shouldReduceMotion ? undefined : handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      style={
        shouldReduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900 }
      }
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm",
        "transition-[border-color,box-shadow] duration-300 ease-out hover:border-accent/40 hover:shadow-glow",
        className,
      )}
    >
      <div className="relative">
        <ProjectImage
          src={imageUrl}
          alt={imageAlt ?? `Preview of ${title}`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-card w-full"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Velo indigo que sube desde abajo al pasar el cursor. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent-night/80 via-accent/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-snug text-ink transition-colors duration-300 group-hover:text-accent-deep">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {shortDescription}
        </p>
        <Button
          size="sm"
          variant="primary"
          icon={ArrowRight}
          iconPosition="right"
          onClick={onOpenDetails}
          aria-label={`${actionLabel} about ${title}`}
          className="mt-5 self-start"
        >
          {actionLabel}
        </Button>
      </div>
    </motion.article>
  );
}
