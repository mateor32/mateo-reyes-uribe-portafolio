"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Divider } from "@/components/atoms/Divider";
import { Button } from "@/components/atoms/Button";
import { ExperienceItem } from "@/components/molecules/ExperienceItem";
import { ExtraSkillItem } from "@/components/molecules/ExtraSkillItem";
import { InfoRow } from "@/components/molecules/InfoRow";
import { KnowledgeCard } from "@/components/molecules/KnowledgeCard";
import { Modal } from "@/components/molecules/Modal";
import { PortfolioCard } from "@/components/molecules/PortfolioCard";
import { SkillItem } from "@/components/molecules/SkillItem";
import { experienceItems } from "@/data/experience";
import { knowledgeItems } from "@/data/knowledge";
import { portfolioItems } from "@/data/portfolio";
import {
  extraSkills,
  languages,
  profile,
  programmingSkills,
} from "@/data/profile";
import type { PortfolioItem } from "@/types";

/**
 * Banco de pruebas temporal de la fase de moléculas.
 *
 * Además de revisar cada pieza, comprueba que `Modal` es de verdad genérico:
 * la misma molécula dibuja aquí dos diálogos con contenidos distintos, uno de
 * texto largo (biografía) y otro con imagen y enlaces (detalle de proyecto).
 */
export default function ProbeMolecules() {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null,
  );

  return (
    <main className="mx-auto max-w-5xl space-y-12 p-10">
      <SectionHeading
        title="Moléculas"
        subtitle="Banco de pruebas temporal de la fase 4."
      />
      <Divider />

      <section className="max-w-sm space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          InfoRow
        </h2>
        <dl className="divide-y divide-line">
          <InfoRow label="Studies" value={profile.studies} />
          <InfoRow label="Location" value={profile.residence} />
          <InfoRow
            label="Open to"
            value={profile.availability}
            valueColor={profile.status === "available" ? "success" : "default"}
          />
        </dl>
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            SkillItem — idiomas
          </h2>
          {languages.map((language) => (
            <SkillItem
              key={language.name}
              name={language.name}
              level={language.level}
            />
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            SkillItem — programación
          </h2>
          {programmingSkills.map((skill) => (
            <SkillItem key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          ExtraSkillItem
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {extraSkills.map((skill) => (
            <ExtraSkillItem
              key={skill.label}
              label={skill.label}
              icon={skill.icon}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          KnowledgeCard
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {knowledgeItems.map((item, index) => (
            <KnowledgeCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          ExperienceItem
        </h2>
        <div className="space-y-8">
          {experienceItems.map((item, index) => (
            <ExperienceItem
              key={item.id}
              institution={item.institution}
              period={item.period}
              title={item.title}
              description={item.description}
              role={item.role}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          PortfolioCard + Modal (contexto 1)
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <PortfolioCard
              key={item.id}
              title={item.title}
              shortDescription={item.shortDescription}
              imageUrl={item.imageUrl}
              onOpenDetails={() => setSelectedProject(item)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Modal (contexto 2: biografía del Hero)
        </h2>
        <Button onClick={() => setIsBioOpen(true)}>Sobre mí</Button>
      </section>

      {/* Contexto 2: texto largo, sin imagen ni enlaces. */}
      <Modal
        isOpen={isBioOpen}
        onClose={() => setIsBioOpen(false)}
        title={profile.name}
      >
        <div className="space-y-4 text-sm leading-relaxed text-ink-soft">
          {profile.bioLong.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Modal>

      {/* Contexto 1: mismo componente, contenido completamente distinto. */}
      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        className="max-w-2xl"
      >
        {selectedProject && (
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-accent-soft">
              <Image
                src={selectedProject.imageUrl}
                alt={`Vista previa de ${selectedProject.title}`}
                fill
                sizes="(min-width: 640px) 42rem, 100vw"
                className="object-cover"
              />
            </div>
            <p className="text-sm leading-relaxed text-ink-soft">
              {selectedProject.longDescription}
            </p>
            <div className="flex flex-wrap gap-3">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Ver el proyecto
                </a>
              )}
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Ver el código
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
