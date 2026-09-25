"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { SocialIconLink } from "@/components/atoms/SocialIconLink";
import { profile, socialLinks } from "@/data/profile";
import { VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface ContactSectionProps {
  /** Ancla para la navegación. */
  id?: string;
  className?: string;
}

/**
 * Cierre de la página: un bloque indigo oscuro con la llamada a escribir.
 * Es el único fondo oscuro del sitio, así que marca el final sin necesidad de
 * otro título. Sin formulario: el portafolio no tiene backend.
 */
export function ContactSection({ id = "contact", className }: ContactSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 lg:py-24", className)}
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent-night via-accent-deep to-accent px-8 py-14 text-center shadow-lg sm:px-14 sm:py-20"
      >
        <span
          aria-hidden="true"
          className="surface-grid pointer-events-none absolute inset-0 opacity-30 invert"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 animate-float rounded-full bg-accent-bright/40 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 animate-float rounded-full bg-accent-night/60 blur-3xl [animation-delay:-3s]"
        />

        <div className="relative">
          <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-soft/80">
            05 — Contact
          </p>
          <h2
            id={`${id}-title`}
            className="mx-auto mt-5 max-w-2xl text-title font-bold leading-heading tracking-tighter text-white"
          >
            Let&apos;s build something that holds up in production.
          </h2>
          <p className="mx-auto mt-5 max-w-measure text-base leading-relaxed text-accent-soft/85">
            Currently open to: {profile.availability}. The fastest way to reach
            me is email.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group/cta inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 text-control font-semibold tracking-snug text-accent-night shadow-lg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-glow"
            >
              <Mail size={18} aria-hidden="true" />
              Get in touch
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
              />
            </a>

            <ul className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <SocialIconLink
                    icon={link.icon}
                    url={link.url}
                    name={link.name}
                    size={48}
                    className="border-white/25 bg-white/10 text-white shadow-none backdrop-blur hover:border-white hover:bg-white hover:bg-none hover:text-accent-night"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
