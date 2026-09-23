import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` rellena con el accent; `secondary` solo dibuja el borde. */
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
  primary: "bg-accent text-white hover:bg-accent/90",
  secondary:
    "border border-line bg-transparent text-ink hover:border-accent hover:text-accent",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-3.5 text-sm",
  md: "h-11 gap-2 px-5 text-[0.9375rem]",
};

/** Tamaño del icono en píxeles, proporcional al del botón. */
const ICON_SIZES: Record<ButtonSize, number> = {
  sm: 16,
  md: 18,
};

/**
 * Botón de acción del portafolio.
 *
 * Sigue las reglas del sistema: `rounded-md`, `shadow-sm` en reposo y
 * `shadow-md` en hover con transición de 200 ms. El anillo de foco lo aporta
 * la regla global `:focus-visible` de `globals.css`, así que aquí no se toca.
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
        "inline-flex items-center justify-center rounded-md font-medium shadow-sm transition-all duration-200 hover:shadow-md",
        "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={iconSize} aria-hidden="true" />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon size={iconSize} aria-hidden="true" />
      )}
    </button>
  );
}
