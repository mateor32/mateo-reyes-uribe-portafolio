"use client";

import { useState } from "react";
import NextImage from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectImageProps {
  /** Ruta dentro de `public/`, por ejemplo `"/images/portfolio/pos.jpg"`. */
  src: string;
  /** Texto alternativo de la captura. */
  alt: string;
  /** Valor de `sizes` para que el navegador pida la resolución adecuada. */
  sizes: string;
  /** Clases del marco. Debe fijar la proporción y el posicionamiento. */
  className?: string;
  /** Clases extra de la imagen, por ejemplo el zoom en hover de las cards. */
  imageClassName?: string;
}

/**
 * Captura de un proyecto, con marcador de posición si el archivo no existe.
 *
 * Las imágenes de `src/data/portfolio.ts` apuntan a archivos que hay que
 * añadir a mano. Sin esto, cada hueco se dibuja con el icono de imagen rota
 * del navegador y el texto alternativo desbordado, que es lo que hace que un
 * portafolio a medio llenar parezca roto en vez de pendiente.
 *
 * El cambio ocurre en `onError`, así que en cuanto se coloque el archivo real
 * el marcador desaparece solo, sin tocar código.
 */
export function ProjectImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
}: ProjectImageProps) {
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-accent-soft to-line-soft",
        className,
      )}
    >
      {hasFailed ? (
        /*
          El marcador es decorativo y no aporta información, así que se oculta
          a los lectores de pantalla: el título del proyecto está justo debajo
          y anunciar "imagen pendiente" solo añadiría ruido.
        */
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <ImageIcon
            size={34}
            strokeWidth={1.25}
            className="text-accent/30"
          />
        </span>
      ) : (
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          onError={() => setHasFailed(true)}
          className={cn("object-cover", imageClassName)}
        />
      )}
    </div>
  );
}
