import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `primary` rellena con el degradado del accent, `secondary` solo dibuja el
   * borde y `ghost` no dibuja nada hasta el hover.
   */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Componente de icono de lucide-react, no su nombre: se importa
   * directamente en el punto de uso (`<Button icon={Download}>`) para que el
   * empaquetador solo incluya los iconos que de verdad se usan.
   */
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children?: ReactNode;
}

const VARIANTS: Record<ButtonVariant, string> = {
  /*
   * El degradado va del accent al mismo tono más profundo, así que sigue
   * siendo un solo color de marca. Sobre un relleno plano, un degradado muy
   * corto es lo que separa un botón cuidado de uno por defecto.
   */
  primary:
    "relative overflow-hidden bg-gradient-to-br from-accent-bright via-accent to-accent-deep text-white shadow-glow hover:-translate-y-0.5 hover:brightness-110",
  secondary:
    "border border-line bg-surface text-ink-soft shadow-sm hover:border-accent/40 hover:text-accent hover:shadow-md",
  ghost: "text-ink-mute hover:bg-line-soft hover:text-ink",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-3.5 text-sm",
  md: "h-11 gap-2 px-5 text-control",
};

/** Tamaño del icono en píxeles, proporcional al del botón. */
const ICON_SIZES: Record<ButtonSize, number> = {
  sm: 15,
  md: 17,
};

/**
 * Botón de acción del portafolio.
 *
 * Sigue las reglas del sistema: `rounded-md` y transición en todo cambio de
 * estado. El anillo de foco lo aporta la regla global `:focus-visible` de
 * `globals.css`, así que aquí no se toca.
 *
 * El icono se desplaza un píxel al pasar el cursor. Es un detalle mínimo,
 * pero es lo que hace que el botón se sienta vivo al señalarlo.
 */
export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const iconSize = ICON_SIZES[size];

  return (
    <button
      type={type}
      className={cn(
        "group/btn inline-flex items-center justify-center rounded-md font-medium tracking-snug",
        "transition-all duration-200 ease-out",
        "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover/btn:animate-shine"
        />
      )}
      {Icon && iconPosition === "left" && (
        <Icon
          size={iconSize}
          aria-hidden="true"
          className="transition-transform duration-200 ease-out group-hover/btn:-translate-x-0.5"
        />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon
          size={iconSize}
          aria-hidden="true"
          className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5"
        />
      )}
    </button>
  );
}
