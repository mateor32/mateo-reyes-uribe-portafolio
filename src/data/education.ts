import type { EducationItem } from "@/types";

// TODO: reemplazar con tu información real.
// Todos los datos de este archivo son de ejemplo.

/**
 * Formación académica, ordenada de más reciente a más antigua.
 * El orden del array es el orden en que se renderiza la línea de tiempo.
 */
export const educationItems: EducationItem[] = [
  {
    id: "especializacion-frontend",
    institution: "Platzi",
    role: "Estudiante",
    period: "2024 — 2025",
    title: "Escuela de Desarrollo Web Frontend",
    description:
      "Ruta especializada en React, Next.js y TypeScript, con énfasis en rendimiento, pruebas y arquitectura de componentes.",
  },
  {
    id: "diplomado-ux",
    institution: "Universidad de Antioquia",
    role: "Participante",
    period: "2023",
    title: "Diplomado en Diseño de Experiencia de Usuario",
    description:
      "Investigación con usuarios, arquitectura de información, prototipado en Figma y pruebas de usabilidad sobre productos reales.",
  },
  {
    id: "pregrado-sistemas",
    institution: "Universidad de Antioquia",
    role: "Egresado",
    period: "2018 — 2023",
    title: "Ingeniería de Sistemas",
    description:
      "Fundamentos de algoritmia, estructuras de datos, bases de datos e ingeniería de software. Trabajo de grado sobre accesibilidad en aplicaciones web.",
  },
];
