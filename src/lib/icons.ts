import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Code,
  Download,
  ExternalLink,
  Gauge,
  GitBranch,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Palette,
  Phone,
  Smartphone,
  Sparkles,
  Users,
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
  Accessibility,
  Clock,
  Code,
  Gauge,
  GitBranch,
  Lightbulb,
  MessageSquare,
  Palette,
  Smartphone,
  Users,
  // Iconos de interfaz de uso frecuente
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} satisfies Record<string, LucideIcon>;

/**
 * Nombre de cualquier icono registrado arriba. El editor autocompleta los
 * válidos y un nombre no registrado es un error de compilación, no un hueco
 * vacío en la interfaz.
 */
export type LucideIconName = keyof typeof LUCIDE_ICONS;

/** Devuelve el componente que dibuja el icono indicado. */
export function getLucideIcon(name: LucideIconName): LucideIcon {
  return LUCIDE_ICONS[name];
}
