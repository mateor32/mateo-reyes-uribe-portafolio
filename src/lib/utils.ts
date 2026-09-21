import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases condicionales con `clsx` y resuelve los conflictos entre
 * utilidades de Tailwind con `tailwind-merge`, de modo que la última clase
 * declarada gane (`cn("p-2", "p-4") === "p-4"`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
