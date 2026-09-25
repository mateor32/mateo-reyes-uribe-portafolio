import { Fragment } from "react";
import { Divider } from "@/components/atoms/Divider";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ExperienceItem } from "@/components/molecules/ExperienceItem";
import { experienceItems } from "@/data/experience";
import { cn } from "@/lib/utils";

export interface ExperienceSectionProps {
  /** Ancla para la navegación. */
  id?: string;
  className?: string;
}

/**
 * Línea de tiempo profesional y académica dentro de una card grande.
 *
 * El orden es el del array en `src/data/experience.ts`, que ya viene de más
 * reciente a más antiguo. Los separadores van entre elementos y no después
 * de cada uno, para que la card no termine en una línea suelta.
 *
 * Es un componente de servidor: las entradas se animan solas, pero esta
 * sección no necesita estado ni eventos.
 */
export function ExperienceSection({
  id = "experience",
  className,
}: ExperienceSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 lg:py-24", className)}
    >
      <SectionHeading
        id={`${id}-title`}
        eyebrow="Experience"
        index="03"
        title="Where I've worked and studied"
        subtitle="And what I took from each stage."
      />

      <div className="mt-12 rounded-xl border border-line bg-surface p-8 shadow-sm sm:p-10">
        {experienceItems.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 && <Divider className="my-9" />}
            <ExperienceItem
              institution={item.institution}
              period={item.period}
              title={item.title}
              description={item.description}
              role={item.role}
              index={index}
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
