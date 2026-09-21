import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/**
 * Sistema de diseño del portafolio.
 *
 * Los mismos valores viven como variables CSS en `src/app/globals.css`
 * (`--color-*`) para poder usarlos desde CSS plano; aquí se declaran en hex
 * para que Tailwind pueda generar modificadores de opacidad (`bg-accent/10`).
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Texto principal y secundario
        ink: {
          DEFAULT: "#14161A",
          soft: "#3A3D45",
        },
        // Texto de apoyo
        muted: "#6B7280",
        // Bordes y separadores
        line: "#E7E8EC",
        // Superficie de las cards
        surface: "#FFFFFF",
        // Fondo general
        bg: "#F6F7F9",
        // Único color saturado permitido: CTAs, links, progreso, hover
        accent: {
          DEFAULT: "#4F46E5",
          soft: "#EEF2FF",
        },
        // Estado "disponible"
        success: "#16A34A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      /**
       * Elevación del sistema: `shadow-sm` en reposo, `shadow-md` en hover.
       * Tintadas con el color de tinta para evitar grises sucios.
       */
      boxShadow: {
        sm: "0 1px 2px 0 rgb(20 22 26 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(20 22 26 / 0.07), 0 1px 2px -1px rgb(20 22 26 / 0.05)",
        md: "0 4px 12px -2px rgb(20 22 26 / 0.08), 0 2px 6px -2px rgb(20 22 26 / 0.05)",
        lg: "0 12px 28px -6px rgb(20 22 26 / 0.10), 0 4px 10px -4px rgb(20 22 26 / 0.05)",
      },
      ringColor: {
        DEFAULT: "#4F46E5",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          lg: "2rem",
        },
        screens: {
          "2xl": "1152px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
