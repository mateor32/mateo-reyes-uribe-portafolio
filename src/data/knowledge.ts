import type { KnowledgeItem } from "@/types";

// TODO: reemplazar con tu información real.
// Todos los datos de este archivo son de ejemplo.

/**
 * Áreas de conocimiento que se muestran como grid de cards.
 *
 * Cada item lleva `icon` obligatorio (nombre de lucide-react), de modo que
 * ninguna card pueda quedarse sin icono: el tipo `KnowledgeItem` no permite
 * omitirlo.
 */
export const knowledgeItems: KnowledgeItem[] = [
  {
    id: "frontend",
    title: "Desarrollo Frontend",
    description:
      "Interfaces con React y Next.js, componentes reutilizables y estado predecible. TypeScript estricto de punta a punta.",
    icon: "Code",
  },
  {
    id: "ui-design",
    title: "Diseño de Interfaces",
    description:
      "Traducción de Figma a sistemas de diseño consistentes: tipografía, escala de espaciado, color y componentes documentados.",
    icon: "Palette",
  },
  {
    id: "responsive",
    title: "Responsive & Mobile First",
    description:
      "Maquetación que arranca en móvil y crece hacia escritorio, con layouts flexibles en CSS Grid y Flexbox.",
    icon: "Smartphone",
  },
  {
    id: "accessibility",
    title: "Accesibilidad Web",
    description:
      "Semántica HTML correcta, navegación por teclado, contraste suficiente y roles ARIA cuando de verdad hacen falta.",
    icon: "Accessibility",
  },
  {
    id: "version-control",
    title: "Control de Versiones",
    description:
      "Git a diario: ramas por funcionalidad, commits pequeños y legibles, revisiones de código y resolución de conflictos.",
    icon: "GitBranch",
  },
  {
    id: "performance",
    title: "Rendimiento Web",
    description:
      "Optimización de Core Web Vitals: carga diferida, tamaño de imágenes, reducción de JavaScript y medición antes de tocar nada.",
    icon: "Gauge",
  },
];
