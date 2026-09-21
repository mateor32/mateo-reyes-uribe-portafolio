import type { LucideIcon } from "lucide-react";

type LucideModule = typeof import("lucide-react");

/**
 * Nombre en PascalCase de cualquier icono de `lucide-react`
 * (por ejemplo `"Code"`, `"GraduationCap"`, `"Palette"`).
 *
 * El tipo se deriva del propio módulo, así que el editor autocompleta los
 * nombres válidos y un error de tipeo se detecta al compilar en vez de
 * acabar en un hueco vacío en la interfaz. Es un tipo puro: no añade nada
 * al bundle.
 */
export type LucideIconName = {
  [K in keyof LucideModule]: LucideModule[K] extends LucideIcon ? K : never;
}[keyof LucideModule];

/**
 * Marcas admitidas en los enlaces sociales. Se renderizan con `react-icons`,
 * que en este proyecto se reserva exclusivamente para logos de marca.
 */
export type SocialIconName =
  | "github"
  | "linkedin"
  | "instagram"
  | "twitter"
  | "youtube"
  | "dribbble";

/** Estado de disponibilidad que se muestra como badge junto al nombre. */
export type AvailabilityStatus = "available" | "busy";

/**
 * Nivel de dominio expresado como porcentaje entre 0 y 100.
 * TypeScript no puede acotar el rango, así que la validación queda aquí
 * como contrato: las barras de progreso asumen esa escala.
 */
export type SkillLevel = number;

export interface Profile {
  name: string;
  role: string;
  status: AvailabilityStatus;
  age: number;
  /** Ciudad y país de residencia. */
  residence: string;
  /** Dirección de contacto. Recuerda que el portafolio es público. */
  address: string;
  /** Ruta dentro de `public/`, por ejemplo `"/images/avatar.jpg"`. */
  avatarUrl: string;
  /** Texto corto bajo el nombre, en el Hero. */
  heroDescription: string;
  /** Biografía extensa que abre el modal del botón del Hero. */
  bioLong: string;
}

export interface LanguageSkill {
  name: string;
  level: SkillLevel;
}

export interface ProgrammingSkill {
  name: string;
  level: SkillLevel;
}

export interface ExtraSkill {
  label: string;
  icon: LucideIconName;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIconName;
}

export interface EducationItem {
  id: string;
  institution: string;
  /** Rol durante esa etapa: "Estudiante", "Egresado", "Participante"... */
  role: string;
  /** Rango temporal legible, por ejemplo `"2019 — 2024"`. */
  period: string;
  title: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  /** Resumen de una línea para la card. */
  shortDescription: string;
  /** Detalle que se muestra al abrir el proyecto. */
  longDescription: string;
  /** Ruta dentro de `public/images/portfolio/`. */
  imageUrl: string;
  repoUrl?: string;
  liveUrl?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: SocialIconName;
}
