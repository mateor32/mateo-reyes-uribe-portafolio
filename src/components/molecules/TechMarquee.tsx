import { portfolioItems } from "@/data/portfolio";
import { programmingSkills } from "@/data/profile";
import { cn } from "@/lib/utils";

// Descriptores de proyecto que viven en `stack` pero no son tecnologías.
const NOT_TECH = new Set(["Full-stack"]);

const TECH = Array.from(
  new Set([
    ...programmingSkills.map((skill) => skill.name),
    ...portfolioItems.flatMap((item) => item.stack),
  ]),
).filter((name) => !NOT_TECH.has(name));

export interface TechMarqueeProps {
  className?: string;
}

/**
 * Cinta infinita con el stack. La lista va duplicada y la animación desplaza
 * exactamente la mitad, así el salto al reiniciar es invisible. La copia se
 * oculta a lectores de pantalla para que no oigan cada tecnología dos veces.
 */
export function TechMarquee({ className }: TechMarqueeProps) {
  return (
    <div
      className={cn(
        "group mask-fade-x relative overflow-hidden py-2",
        className,
      )}
    >
      <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            aria-label={copy === 0 ? "Tech stack" : undefined}
            className="flex shrink-0 gap-3"
          >
            {TECH.map((name) => (
              <li
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/80 px-4 py-2 text-sm font-medium tracking-snug text-ink-soft shadow-sm backdrop-blur"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent-bright to-accent-deep"
                />
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
