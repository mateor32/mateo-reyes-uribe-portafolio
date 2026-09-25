"use client";

import { Fragment, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { InfoRow } from "@/components/molecules/InfoRow";
import { Modal } from "@/components/molecules/Modal";
import { TechMarquee } from "@/components/molecules/TechMarquee";
import { profile } from "@/data/profile";
import { noMotion, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Entrada del Hero: más recorrido y un leve desenfoque que se aclara.
const heroItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const wordReveal: Variants = {
  hidden: { y: "110%", rotate: 4 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

function highlightRole(role: string, highlight?: string): ReactNode {
  if (!highlight) return role;

  const start = role.indexOf(highlight);
  if (start === -1) return role;

  const end = start + highlight.length;

  return (
    <>
      {role.slice(0, start)}
      <span className="text-accent">{role.slice(start, end)}</span>
      {role.slice(end)}
    </>
  );
}

export interface HeroSectionProps {
  /** Ancla para la navegación. */
  id?: string;
  className?: string;
}

export function HeroSection({ id = "profile", className }: HeroSectionProps) {
  const [isBioOpen, setIsBioOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const item = shouldReduceMotion ? noMotion : heroItem;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 lg:py-24", className)}
    >
      <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-center md:justify-between md:gap-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.1, 0.1)}
          className="max-w-xl text-center md:text-left"
        >
          <motion.div variants={item}>
            <Eyebrow
              label="Profile"
              index="01"
              className="justify-center md:justify-start"
            />
          </motion.div>

          {/*
            Cada palabra sube desde detrás de su propia máscara. El degradado
            va en cada palabra y no en el `h1`: un hijo transformado dentro de
            un padre con `background-clip: text` desaparece en Chrome y Safari.
            El relleno inferior evita que la máscara corte la "y" de "Reyes".
          */}
          <motion.h1
            variants={staggerContainer(0.09)}
            id={`${id}-title`}
            aria-label={profile.name}
            className="mt-7 max-w-md text-display font-extrabold leading-display tracking-tightest md:mx-0"
          >
            {/* El espacio entre palabras es el que permite partir la línea. */}
            {profile.name.split(" ").map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                {index > 0 && " "}
                <span
                  aria-hidden="true"
                  className="-mb-3 inline-block overflow-hidden pb-3 align-bottom"
                >
                  <motion.span
                    variants={shouldReduceMotion ? noMotion : wordReveal}
                    className="text-gradient-hero inline-block animate-gradient-pan"
                  >
                    {word}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 text-lead font-semibold tracking-tighter text-ink-mute"
          >
            {highlightRole(profile.role, profile.roleHighlight)}
          </motion.p>

          <motion.span
            variants={item}
            aria-hidden="true"
            className="mx-auto mt-7 block h-1 w-16 rounded-full bg-gradient-to-r from-accent-deep via-accent to-accent-bright md:mx-0 md:w-20"
          />

          <motion.p
            variants={item}
            className="mt-7 max-w-measure text-base leading-reading text-muted"
          >
            {profile.heroDescription}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <Button
              onClick={() => setIsBioOpen(true)}
              icon={ArrowUpRight}
              iconPosition="right"
              aria-haspopup="dialog"
            >
              About me
            </Button>

            <a
              href={`mailto:${profile.email}`}
              className="group/mail inline-flex h-11 items-center gap-2 rounded-md px-4 text-control font-medium tracking-snug text-ink-mute transition-colors duration-200 hover:text-accent"
            >
              <Mail
                size={17}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover/mail:-translate-y-0.5"
              />
              Email me
            </a>
          </motion.div>
        </motion.div>

        {/*
          Marco del retrato: halo difuso detrás, un aro cónico que gira y la
          foto encima con un borde blanco que la separa del aro. Todo flota.
        */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={
            shouldReduceMotion
              ? undefined
              : { y: portraitY, rotate: portraitRotate }
          }
          className="relative shrink-0"
        >
          <div className="animate-float">
            <span
              aria-hidden="true"
              className="absolute -inset-12 rounded-full bg-gradient-to-br from-accent/35 via-accent-bright/15 to-transparent blur-3xl"
            />
            <span
              aria-hidden="true"
              className="ring-conic absolute -inset-2 animate-spin-slow rounded-full opacity-90"
            />
            <Avatar
              src={profile.avatarUrl}
              alt={profile.name}
              size={240}
              sizeClassName="w-40 sm:w-52 md:w-56 lg:w-60"
              priority
              className="relative border-4 border-surface shadow-lg"
            />
            <span className="absolute -bottom-1 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent-night px-3.5 py-1.5 text-xs font-semibold tracking-snug text-white shadow-glow">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </span>
          </div>
        </motion.div>
      </div>

      <TechMarquee className="mt-16" />

      <Modal
        isOpen={isBioOpen}
        onClose={() => setIsBioOpen(false)}
        title={profile.name}
        className="max-w-2xl"
      >
        <div className="space-y-4 text-control leading-reading text-ink-soft">
          {/*
            `bioLong` guarda los párrafos separados por una línea en blanco,
            que es como se escriben en el archivo de datos.
          */}
          {profile.bioLong.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <dl className="mt-7 divide-y divide-line-soft border-t border-line pt-1">
          <InfoRow
            label="Email"
            valueColor="accent"
            value={
              <a href={`mailto:${profile.email}`} className="hover:underline">
                {profile.email}
              </a>
            }
          />
          <InfoRow label="Location" value={profile.residence} />
        </dl>
      </Modal>
    </section>
  );
}
