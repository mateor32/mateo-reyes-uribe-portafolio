"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Tag } from "@/components/atoms/Tag";
import {
  VIEWPORT_ONCE,
  entranceTransition,
  noMotion,
  slideInLeft,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface EducationItemProps {
  /** Centro donde se cursó la formación. */
  institution: string;
  /** Rango temporal legible; se muestra dentro de un `Tag`. */
  period: string;
  /** Título obtenido o nombre del programa. */
  title: string;
  description: string;
  /** Rol durante esa etapa: "Estudiante", "Egresado"... Opcional. */
  role?: string;
  /** Posición en la lista, solo para escalonar la entrada. */
  index?: number;
  className?: string;
}

/**
 * Entrada de la línea de formación académica.
 *
 * Aparece deslizándose desde la izquierda, en la misma dirección en que se
 * lee la línea de tiempo. La barra vertical de la izquierda es puramente
 * decorativa y se dibuja con un borde, no con un elemento aparte.
 *
 * Nota de nombres: el tipo `EducationItem` de `@/types` describe el dato y
 * este componente lo dibuja. Si en un mismo archivo hicieran falta los dos,
 * importa el tipo con un alias (`EducationItem as EducationItemData`).
 */
export function EducationItem({
  institution,
  period,
  title,
  description,
  role,
  index = 0,
  className,
}: EducationItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={shouldReduceMotion ? noMotion : slideInLeft}
      transition={entranceTransition(index)}
      className={cn("border-l-2 border-line pl-5", className)}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-base font-semibold text-ink">{institution}</h3>
        <Tag icon="Calendar">{period}</Tag>
      </div>
      <p className="mt-1 text-sm font-medium text-ink-soft">
        {title}
        {role && <span className="font-normal text-muted"> · {role}</span>}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </motion.article>
  );
}
