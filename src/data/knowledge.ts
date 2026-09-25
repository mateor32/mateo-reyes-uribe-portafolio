import type { KnowledgeItem } from "@/types";

/**
 * Áreas de conocimiento que se muestran como grid de cards.
 *
 * Cada item lleva `icon` obligatorio (nombre de lucide-react), de modo que
 * ninguna card pueda quedarse sin icono: el tipo `KnowledgeItem` no permite
 * omitirlo.
 */
export const knowledgeItems: KnowledgeItem[] = [
  {
    id: "backend",
    title: "Backend Development",
    description:
      "REST APIs in Java and Spring Boot with a layered architecture — controller, service, repository — so responsibilities never leak into each other.",
    icon: "Server",
  },
  {
    id: "databases",
    title: "Databases",
    description:
      "PostgreSQL and MySQL, ER modelling and queries that hold referential integrity as the dataset grows.",
    icon: "Database",
  },
  {
    id: "devops",
    title: "Containers & DevOps",
    description:
      "Docker for reproducible environments, Git for version control, and CI/CD pipelines that turn a deploy into a non-event.",
    icon: "Container",
  },
  {
    id: "web",
    title: "Web Development",
    description:
      "Full-stack maintenance of production web apps, from the interface down to the endpoints that feed it.",
    icon: "Globe",
  },
  {
    id: "security",
    title: "Application Security",
    description:
      "JWT authentication, password hashing with bcrypt and OWASP practices: errors that say enough to debug and nothing more.",
    icon: "ShieldCheck",
  },
  {
    id: "agile",
    title: "Agile Methodologies",
    description:
      "Scrum and Kanban on real projects: prioritising a backlog, breaking work down and shipping in short cycles.",
    icon: "Workflow",
  },
];
