import type { ExperienceItem } from "@/types";

/**
 * Línea de tiempo profesional y académica, de más reciente a más antigua.
 * El orden del array es el orden en que se renderiza.
 *
 * Trabajo y formación comparten lista a propósito: ambos se describen con los
 * mismos campos y, en una hoja de vida de estudiante, separarlos en dos
 * bloques deja dos listas de una sola entrada.
 */
export const experienceItems: ExperienceItem[] = [
  {
    id: "udea-programming-assistant",
    institution: "Universidad de Antioquia",
    title: "Programming Assistant",
    role: "Part-time",
    period: "Jun 2025 — Present",
    description:
      "Full-stack maintenance of the Systems Engineering department portal, with a minimum of two monthly deployments and no reported downtime. I handle change requests from the academic team directly in production, orchestrate the deployment environments with Docker, and support the department's network infrastructure.",
  },
  {
    id: "udea-systems-engineering",
    institution: "Universidad de Antioquia",
    title: "Systems Engineering",
    role: "8th semester",
    period: "2022 — Present",
    description:
      "Algorithms, data structures, databases and software engineering, alongside hands-on work with agile methodologies. Currently looking for a professional internship for the first half of 2027.",
  },
];
