import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AvatarProps {
  /** Ruta dentro de `public/`, por ejemplo `"/images/avatar.jpg"`. */
  src: string;
  /** Texto alternativo. Describe a la persona, no digas "foto de". */
  alt: string;
  /** Lado del círculo en píxeles. */
  size?: number;
  /** Dibuja un aro blanco alrededor, útil sobre fondos de color. */
  ring?: boolean;
  /**
   * Desactiva la carga diferida. Conviene activarlo solo en el avatar del
   * Hero, que es visible desde el primer momento.
   */
  priority?: boolean;
  className?: string;
}

/**
 * Imagen de perfil circular.
 *
 * El tamaño se aplica al contenedor y a `next/image` a la vez para que el
 * navegador reserve el espacio exacto y el layout no salte mientras carga.
 */
export function Avatar({
  src,
  alt,
  size = 96,
  ring = false,
  priority = false,
  className,
}: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-accent-soft",
        ring && "shadow-md ring-4 ring-surface",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
