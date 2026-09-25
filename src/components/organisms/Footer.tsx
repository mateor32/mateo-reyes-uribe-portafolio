import { SocialIconLink } from "@/components/atoms/SocialIconLink";
import { profile, socialLinks } from "@/data/profile";
import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

/**
 * Pie de página: aviso de copyright y versión pequeña de los enlaces a redes.
 *
 * En pantallas estrechas esta fila de iconos hace además el papel de la
 * columna derecha, que ahí no se muestra.
 *
 * Nota sobre el año: la página se genera de forma estática, así que
 * `getFullYear()` se evalúa al compilar y no en cada visita. Para un
 * portafolio es suficiente, pero si pasa un cambio de año sin desplegar, el
 * pie seguirá mostrando el anterior hasta la siguiente compilación.
 */
export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("pb-12 pt-4", className)}>
      {/* Filete que se desvanece, en vez de un borde de lado a lado. */}
      <span aria-hidden="true" className="block h-px w-full rule-fade" />

      <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium tracking-snug text-ink-soft">
            {profile.name}
          </p>
          <p className="mt-1 text-xs text-muted">
            © {year} · All rights reserved
          </p>
        </div>

        {/*
          Aquí no hay `<nav>` a propósito, aunque la columna derecha sí lo use:
          estos enlaces repiten los mismos destinos y ya viven dentro del
          landmark del pie, así que envolverlos crearía un segundo punto de
          navegación con el mismo nombre y duplicaría la lista de landmarks.
        */}
        <ul className="flex items-center gap-2.5">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <SocialIconLink
                icon={link.icon}
                url={link.url}
                name={link.name}
                size={34}
              />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
