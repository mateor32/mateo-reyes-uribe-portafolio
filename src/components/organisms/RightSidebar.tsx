import { SocialIconLink } from "@/components/atoms/SocialIconLink";
import { socialLinks } from "@/data/profile";
import { cn } from "@/lib/utils";

export interface RightSidebarProps {
  className?: string;
}

/**
 * Columna derecha fija con los enlaces a redes.
 *
 * Es una barra estrecha: solo iconos, sin texto, centrados verticalmente en
 * la pantalla. El nombre de cada red viaja en el `aria-label` del átomo
 * `SocialIconLink`, así que la ausencia de texto visible no deja a nadie sin
 * saber adónde lleva cada enlace.
 *
 * La lista sale entera de `socialLinks` en `src/data/profile.ts`: para
 * añadir o quitar una red se edita ese archivo y nada más. GitHub y LinkedIn
 * son el mínimo que debería quedar siempre.
 *
 * Igual que la columna izquierda, usa `sticky top-0` con `h-screen` y
 * `self-start`, que evita que el estirado por defecto del contenedor flex
 * anule el recorrido del `sticky`.
 */
export function RightSidebar({ className }: RightSidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen w-[90px] shrink-0 self-start items-center justify-center border-l border-line bg-surface",
        className,
      )}
    >
      <nav aria-label="Redes sociales">
        <ul className="flex flex-col items-center gap-4">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <SocialIconLink
                icon={link.icon}
                url={link.url}
                name={link.name}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
