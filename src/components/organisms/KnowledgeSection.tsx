"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { KnowledgeCard } from "@/components/molecules/KnowledgeCard";
import { knowledgeItems } from "@/data/knowledge";
import { VIEWPORT_ONCE, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface KnowledgeSectionProps {
  /** Ancla para la navegación. */
  id?: string;
  className?: string;
}

/**
 * Rejilla de áreas de conocimiento.
 *
 * La entrada la dirige la rejilla, no cada card: el contenedor lleva
 * `staggerChildren` y las cards se marcan como `staggered`, de modo que se
 * encadenan en orden en lugar de contar cada una su propio retardo. Eso
 * mantiene el ritmo aunque cambie el número de columnas.
 *
 * Con `prefers-reduced-motion` el escalonado se desactiva por completo: la
 * regla de `globals.css` solo alcanza a las animaciones de CSS, y Framer
 * Motion anima desde JavaScript.
 */
export function KnowledgeSection({
  id = "expertise",
  className,
}: KnowledgeSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 lg:py-24", className)}
    >
      <SectionHeading
        id={`${id}-title`}
        eyebrow="Expertise"
        index="02"
        title="What I do"
        subtitle="The areas I work in day to day, from the first sketch to the deploy."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={shouldReduceMotion ? undefined : staggerContainer()}
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {knowledgeItems.map((item) => (
          <KnowledgeCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
            staggered
          />
        ))}
      </motion.div>
    </section>
  );
}
