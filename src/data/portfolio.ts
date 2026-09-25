import type { PortfolioItem } from "@/types";

// TODO: las imágenes todavía no existen. Coloca un archivo por proyecto en
// public/images/portfolio/ con el nombre indicado en `imageUrl`, o cambia la
// ruta. Mientras falten, next/image devolverá 404 en esas cards.

/**
 * Proyectos del portafolio.
 *
 * `repoUrl` y `liveUrl` son opcionales: omite el que no aplique y la card
 * simplemente no mostrará ese enlace.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "pos-system",
    title: "POS — Point of Sale",
    shortDescription:
      "Sales, product and inventory management with automatic low-stock alerts.",
    longDescription:
      "A complete point-of-sale system that cut sales entry time by roughly 60% compared to the manual flow it replaced. The REST API follows a layered architecture — controller, service, repository — which held zero referential integrity errors across tests with more than 500 records. It also ships automatic low-stock alerts that removed inventory gaps in every test scenario.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    imageUrl: "/images/portfolio/pos-system.jpg",
    repoUrl: "https://github.com/mateor32/pos-system",
  },
  {
    id: "fraud-detection",
    title: "Banking Backend — Fraud Detection",
    shortDescription:
      "Transaction processing with JWT authentication and anomaly detection.",
    longDescription:
      "A banking backend covering 100% of the critical flows: registration, login, transfers and history. On top of that sits an anomaly detection module that flags unusual transactions — atypical amounts, unusual frequency — and reduced false negatives across simulated tests. Security follows OWASP practices: bcrypt for password hashing and error handling that never exposes a stack trace.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Docker"],
    imageUrl: "/images/portfolio/fraud-detection.jpg",
    repoUrl: "https://github.com/mateor32/fraude-detection",
  },
  {
    id: "ai-voice-tutor",
    title: "AI Voice Chat — English Tutor",
    shortDescription:
      "Speech recognition and an LLM combined into a real-time conversation tutor.",
    longDescription:
      "An academic project that pairs speech-to-text with a large language model to hold real-time conversations in English, with average latency under two seconds. The hardest part was the audio pipeline: designing it to cope with accent variation and background noise, which noticeably improved recognition accuracy in controlled environments.",
    stack: ["TypeScript", "Python", "Speech-to-Text", "LLM API", "Docker"],
    imageUrl: "/images/portfolio/ai-voice-tutor.jpg",
  },
  {
    id: "department-portal",
    title: "Systems Engineering Portal",
    shortDescription:
      "The department's public web portal, maintained full-stack in production.",
    longDescription:
      "The public portal of the Systems Engineering department at Universidad de Antioquia, which I maintain as a Programming Assistant. Frontend and backend, with a minimum of two monthly deployments and no reported downtime, version control with Git and deployment environments orchestrated through Docker containers to cut manual configuration time.",
    stack: ["Full-stack", "Git", "Docker"],
    imageUrl: "/images/portfolio/department-portal.jpg",
  },
];
