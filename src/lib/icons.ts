import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  Container,
  Database,
  ExternalLink,
  GitBranch,
  Globe,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Registro de los iconos de lucide-react disponibles en el proyecto.
 *
 * Se importan uno a uno a propósito. La alternativa cómoda
 * (`import * as LucideIcons` y buscar por nombre) impide que el empaquetador
 * descarte lo que no se usa: medido en este proyecto, arrastraba unos 771 KB
 * de iconos innecesarios en cuanto un componente de cliente dibujaba uno.
 *
 * Para usar un icono nuevo en `src/data/`, añádelo en dos sitios: al `import`
 * de arriba y a este objeto. Si se te olvida, TypeScript marcará el error
 * directamente sobre el dato, porque `LucideIconName` se deriva de estas
 * claves.
 */
export const LUCIDE_ICONS = {
  // Usados hoy en src/data/
  Container,
  Database,
  Globe,
  Lightbulb,
  MessageSquare,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  // Iconos de interfaz de uso frecuente
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} satisfies Record<string, LucideIcon>;

/**
 * Nombre de cualquier icono registrado arriba. El editor autocompleta los
 * válidos y un nombre no registrado es un error de compilación, no un hueco
 * vacío en la interfaz.
 */
export type LucideIconName = keyof typeof LUCIDE_ICONS;

/*
 * Para dibujar un icono, léelo del registro directamente:
 *
 *     const Icon = LUCIDE_ICONS[nombre];
 *
 * Aquí hubo un accesor `getLucideIcon(nombre)`, pero la regla
 * `react-hooks/static-components` toma el valor devuelto por una función como
 * un componente creado en cada render y marca error en el punto de uso,
 * aunque siempre sea la misma referencia constante. El acceso por índice deja
 * claro que el componente no se está creando.
 */
