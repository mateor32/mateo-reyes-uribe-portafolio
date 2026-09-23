"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IconBadge } from "@/components/atoms/IconBadge";
import {
  VIEWPORT_ONCE,
  entranceTransition,
  fadeInUp,
  noMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { LucideIconName } from "@/types";

export interface KnowledgeCardProps {
  /** Título del área de conocimiento. */
  title: string;
  description: string;
  /** Nombre del icono registrado en `src/lib/icons.ts`. */
  icon: LucideIconName;
  /**
   * Posición dentro de la rejilla. Solo se usa para escalonar la entrada, de
   * manera que las cards aparezcan una tras otra en vez de todas a la vez.
   */
  index?: number;
  className?: string;
}

/**
 * Card de la rejilla de conocimientos.
 *
 * Entra con `fadeInUp` la primera vez que asoma en pantalla y al pasar el
 * cursor sube un píxel y gana sombra, siguiendo la regla del sistema:
 * `shadow-sm` en reposo, `shadow-md` en hover, siempre con transición.
 *
 * La elevación se hace con `translate` de CSS y no con Framer Motion para no
 * pelearse con la transformación de la animación de entrada.
 */
export function KnowledgeCard({
  title,
  description,
  icon,
  index = 0,
  className,
}: KnowledgeCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={shouldReduceMotion ? noMotion : fadeInUp}
      transition={entranceTransition(index)}
      className={cn(
        "h-full rounded-xl border border-line bg-surface p-6 shadow-sm",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <IconBadge icon={icon} />
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </motion.article>
  );
}
