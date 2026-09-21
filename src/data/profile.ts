import type {
  ExtraSkill,
  LanguageSkill,
  ProgrammingSkill,
  Profile,
  SocialLink,
} from "@/types";

// TODO: reemplazar con tu información real.
// Todos los datos de este archivo son de ejemplo.

/**
 * Datos de cabecera: alimentan el Hero, el badge de disponibilidad y el modal
 * de biografía.
 */
export const profile: Profile = {
  name: "Tu Nombre",
  role: "Frontend Developer",
  // "available" pinta el badge en verde (--color-success); "busy" lo atenúa.
  status: "available",
  age: 26,
  residence: "Medellín, Colombia",
  // TODO: el portafolio es público. Considera dejar solo ciudad y país,
  // o un correo de contacto, en lugar de una dirección exacta.
  address: "Calle 10 #43-25, El Poblado",
  // TODO: colocar la imagen real en public/images/avatar.jpg
  avatarUrl: "/images/avatar.jpg",
  heroDescription:
    "Construyo interfaces web rápidas y accesibles con React, Next.js y TypeScript. Me interesa el detalle: que una pantalla se sienta clara, responda al instante y funcione para cualquiera.",
  bioLong:
    "Soy desarrollador frontend con cuatro años construyendo productos para web. Empecé maquetando sitios institucionales y hoy me dedico sobre todo a diseñar y mantener interfaces con React, Next.js y TypeScript, cuidando el rendimiento y la accesibilidad desde el primer commit.\n\nMe gusta trabajar cerca de diseño: traducir un Figma a un sistema de componentes reutilizable, discutir estados y casos límite antes de escribir código, y dejar una base que el siguiente desarrollador entienda sin tener que preguntar. He acompañado migraciones de CRA a Next.js, reducido tiempos de carga a la mitad y montado sistemas de diseño desde cero.\n\nFuera del trabajo escribo sobre patrones de frontend, contribuyo a algún proyecto open source y aprovecho cualquier excusa para trastear con animaciones e interacción.",
};

/**
 * Idiomas. `level` es un porcentaje de 0 a 100 usado por las barras de progreso.
 */
export const languages: LanguageSkill[] = [
  { name: "Español (nativo)", level: 100 },
  { name: "Inglés", level: 85 },
  { name: "Portugués", level: 45 },
];

/**
 * Stack técnico. `level` es un porcentaje de 0 a 100.
 */
export const programmingSkills: ProgrammingSkill[] = [
  { name: "HTML & CSS", level: 95 },
  { name: "JavaScript", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "React / Next.js", level: 90 },
  { name: "Node.js", level: 65 },
];

/**
 * Habilidades blandas. `icon` es un nombre de icono de lucide-react:
 * el editor autocompleta los válidos y TypeScript rechaza los inexistentes.
 */
export const extraSkills: ExtraSkill[] = [
  { label: "Trabajo en equipo", icon: "Users" },
  { label: "Comunicación clara", icon: "MessageSquare" },
  { label: "Resolución de problemas", icon: "Lightbulb" },
  { label: "Gestión del tiempo", icon: "Clock" },
];

/**
 * Enlaces sociales. `icon` identifica la marca; se renderizan con react-icons.
 * Basta con borrar las entradas que no uses.
 */
export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/tu-usuario", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tu-usuario",
    icon: "linkedin",
  },
  { name: "Twitter", url: "https://twitter.com/tu-usuario", icon: "twitter" },
  {
    name: "Instagram",
    url: "https://www.instagram.com/tu-usuario",
    icon: "instagram",
  },
];
