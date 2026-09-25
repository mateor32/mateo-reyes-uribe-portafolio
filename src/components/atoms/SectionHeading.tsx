"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import {
  ENTRANCE_TRANSITION,
  VIEWPORT_ONCE,
  fadeInUp,
  noMotion,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Etiqueta en versales sobre el título, por ejemplo `"Expertise"`. */
  eyebrow?: string;
  /** Número de orden de la sección, como `"02"`. */
  index?: string;
  align?: "left" | "center";
  /**
   * Id del `h2`, útil para enlazarlo desde la navegación o para referenciarlo
   * con `aria-labelledby` desde la `<section>` que lo contiene.
   */
  id?: string;
  className?: string;
}

/**
 * Encabezado de sección.
 *
 * El título usa `tracking-tighter` porque a tamaños grandes el espaciado por
 * defecto de Inter deja las letras sueltas; el subtítulo va limitado a una
 * medida de lectura cómoda en vez de estirarse hasta el borde de la columna.
 */
export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  index,
  align = "left",
  id,
  className,
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const item = shouldReduceMotion ? noMotion : fadeInUp;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // El número sube más despacio que el texto: sensación de profundidad.
  const watermarkY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={staggerContainer(0.1)}
      transition={ENTRANCE_TRANSITION}
      className={cn(
        "relative",
        align === "center" && "text-center",
        className,
      )}
    >
      {index && (
        <motion.span
          aria-hidden="true"
          style={shouldReduceMotion ? undefined : { y: watermarkY }}
          className="text-outline pointer-events-none absolute -top-16 right-0 select-none text-[7rem] font-black leading-none tracking-tightest sm:text-[10rem] lg:-top-20 lg:text-[12rem]"
        >
          {index}
        </motion.span>
      )}
      {eyebrow && (
        <motion.div
          variants={item}
          transition={ENTRANCE_TRANSITION}
          className="relative"
        >
          <Eyebrow
            label={eyebrow}
            index={index}
            className={cn("mb-5", align === "center" && "justify-center")}
          />
        </motion.div>
      )}
      <motion.h2
        variants={item}
        transition={ENTRANCE_TRANSITION}
        id={id}
        className="relative text-title font-bold leading-heading tracking-tighter text-ink"
      >
        {title}
        <span aria-hidden="true" className="text-accent">
          .
        </span>
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={item}
          transition={ENTRANCE_TRANSITION}
          className={cn(
            "relative mt-4 max-w-measure text-base leading-relaxed text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
