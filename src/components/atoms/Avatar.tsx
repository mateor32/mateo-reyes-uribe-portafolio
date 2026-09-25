import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AvatarProps {
  /** Ruta dentro de `public/`, por ejemplo `"/images/avatar.jpg"`. */
  src: string;
  /** Texto alternativo. Describe a la persona, no digas "foto de". */
  alt: string;
  /**
   * Lado del círculo en píxeles. Si se pasa `sizeClassName`, deja de fijar la
   * caja y solo define la resolución con la que se pide la imagen, que
   * conviene que sea la del tamaño mayor en que va a verse.
   */
  size?: number;
  /**
   * Clases que fijan el tamaño en su lugar, por ejemplo `"w-44 sm:w-60"`.
   * Existe porque `size` es un número y acaba en un `style` en línea, y un
   * estilo en línea no puede cambiar con el ancho de la pantalla: sin esta
   * salida, el retrato del Hero mediría lo mismo en un móvil que en un
   * monitor y se comería la primera pantalla.
   */
  sizeClassName?: string;
  /** Dibuja un aro alrededor, útil sobre fondos de color. */
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
 *
 * El aro es doble: uno blanco pegado a la foto y otro del accent muy diluido
 * un poco más afuera. Un solo aro plano se lee como un borde; dos separados
 * por unos píxeles se leen como un marco.
 */
export function Avatar({
  src,
  alt,
  size = 96,
  sizeClassName,
  ring = false,
  priority = false,
  className,
}: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full",
        "bg-gradient-to-br from-accent-soft to-line-soft",
        ring && "shadow-md ring-1 ring-accent/20 ring-offset-4 ring-offset-surface",
        sizeClassName && "aspect-square",
        sizeClassName,
        className,
      )}
      style={sizeClassName ? undefined : { width: size, height: size }}
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
