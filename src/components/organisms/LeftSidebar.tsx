import type { ReactNode } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Divider } from "@/components/atoms/Divider";
import { ExtraSkillItem } from "@/components/molecules/ExtraSkillItem";
import { InfoRow } from "@/components/molecules/InfoRow";
import { SkillItem } from "@/components/molecules/SkillItem";
import {
  extraSkills,
  languages,
  profile,
  programmingSkills,
} from "@/data/profile";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/types";

/**
 * Texto de cada estado de disponibilidad. Al tiparlo como `Record`, añadir un
 * estado nuevo en `@/types` obliga a darle aquí su etiqueta en lugar de
 * dejar un hueco vacío en la interfaz.
 */
const STATUS_LABELS: Record<AvailabilityStatus, string> = {
  available: "Disponible",
  busy: "Ocupado",
};

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

/**
 * Bloque con título pequeño en versales.
 *
 * No usa el átomo `SectionHeading`, que está calibrado a 32 px para los
 * títulos de las secciones principales: en una columna de 300 px aplastaría
 * todo lo demás.
 */
function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <section className="px-6 py-5">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </h3>
      {children}
    </section>
  );
}

export interface LeftSidebarProps {
  className?: string;
}

/**
 * Columna izquierda fija con la ficha personal.
 *
 * Toda la información sale de `src/data/profile.ts`: aquí no hay ni un dato
 * escrito a mano, así que actualizar el portafolio es editar ese archivo.
 *
 * Sobre el posicionamiento: `sticky top-0` con `h-screen` mantiene la columna
 * a la vista mientras el contenido central se desplaza, y `overflow-y-auto`
 * le da su propio scroll cuando la ficha es más alta que la pantalla. Lleva
 * `self-start` porque, al ser un elemento flex, el estirado por defecto
 * (`align-items: stretch`) puede darle la altura completa del contenedor y
 * dejar el `sticky` sin recorrido.
 *
 * Jerarquía de encabezados: el nombre es un `h2` y cada bloque un `h3`, de
 * modo que la columna cuelgue del `h1` de la página en lugar de competir con
 * él.
 */
export function LeftSidebar({ className }: LeftSidebarProps) {
  const isAvailable = profile.status === "available";
  const statusLabel = STATUS_LABELS[profile.status];

  return (
    <aside
      aria-label="Perfil"
      className={cn(
        "sticky top-0 flex h-screen w-[300px] shrink-0 self-start flex-col overflow-y-auto border-r border-line bg-surface",
        className,
      )}
    >
      <div className="flex flex-col items-center px-6 pb-6 pt-8 text-center">
        <span className="relative inline-block">
          <Avatar
            src={profile.avatarUrl}
            alt={profile.name}
            size={112}
            ring
            priority
          />
          {/*
            Punto de estado. El aro del color de la superficie lo separa de la
            foto para que se lea sobre cualquier fondo.
          */}
          <span className="absolute bottom-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-surface">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                isAvailable ? "animate-pulse bg-success" : "bg-muted",
              )}
            />
          </span>
          {/* El punto es visual; el estado también tiene que poder oírse. */}
          <span className="sr-only">{statusLabel}</span>
        </span>

        <h2 className="mt-4 text-lg font-semibold text-ink">{profile.name}</h2>
        <p className="mt-1 text-sm text-muted">{profile.role}</p>
      </div>

      <Divider />

      <SidebarSection title="Sobre mí">
        <dl className="divide-y divide-line">
          <InfoRow label="Edad" value={`${profile.age} años`} />
          <InfoRow label="Residencia" value={profile.residence} />
          <InfoRow
            label="Freelance"
            value={statusLabel}
            valueColor={isAvailable ? "success" : "default"}
          />
          <InfoRow label="Dirección" value={profile.address} />
        </dl>
      </SidebarSection>

      <Divider />

      <SidebarSection title="Idiomas">
        <div className="space-y-4">
          {languages.map((language) => (
            <SkillItem
              key={language.name}
              name={language.name}
              level={language.level}
            />
          ))}
        </div>
      </SidebarSection>

      <Divider />

      <SidebarSection title="Lenguajes de programación">
        <div className="space-y-4">
          {programmingSkills.map((skill) => (
            <SkillItem key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </SidebarSection>

      <Divider />

      <SidebarSection title="Habilidades extra">
        <div className="space-y-3">
          {extraSkills.map((skill) => (
            <ExtraSkillItem
              key={skill.label}
              label={skill.label}
              icon={skill.icon}
            />
          ))}
        </div>
      </SidebarSection>
    </aside>
  );
}
