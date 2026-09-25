import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/**
 * Sistema de diseño del portafolio.
 *
 * Los mismos valores viven como variables CSS en `src/app/globals.css`
 * (`--color-*`) para poder usarlos desde CSS plano; aquí se declaran en hex
 * para que Tailwind pueda generar modificadores de opacidad (`bg-accent/10`).
 */

/**
 * Medidas de la estructura de la página.
 *
 * Están aquí y no repartidas en clases arbitrarias (`w-[300px]`) porque las
 * usan varios componentes a la vez: la columna izquierda y el menú móvil
 * comparten ancho, y la rejilla de tres columnas tiene que coincidir con
 * ambas barras. Con un solo origen, cambiar la maqueta es cambiar este
 * objeto.
 */
const LAYOUT = {
  /** Columna izquierda y ancho del menú desplegable. */
  sidebar: "300px",
  /** Columna derecha, solo iconos. */
  social: "90px",
  /** Ancho máximo del contenido central. */
  content: "988px",
  /** Card del carrusel de portafolio, en móvil y en escritorio. */
  card: "280px",
  cardLg: "340px",
} as const;

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /*
         * Escala de neutros de ocho pasos. La versión anterior tenía cuatro y
         * se quedaba corta: sin tonos intermedios, un título, una etiqueta y
         * un texto de apoyo acababan pesando lo mismo.
         */
        ink: {
          DEFAULT: "#0B0D10", // titulares
          soft: "#1C1F26", // texto de lectura
          mute: "#454A55", // etiquetas y texto terciario
        },
        muted: "#5D6473", // texto de apoyo
        line: {
          DEFAULT: "#E4E6EB", // bordes visibles
          soft: "#F0F1F4", // separadores y pistas de progreso
        },
        surface: "#FFFFFF",
        bg: "#E9ECF2",
        // Único color de marca, en una escala del mismo tono. `bright` solo
        // sirve para degradados y texto grande; `night` para bloques oscuros.
        accent: {
          DEFAULT: "#4F46E5",
          bright: "#6366F1",
          deep: "#4338CA",
          night: "#1E1B4B",
          soft: "#EEF2FF",
        },
        // Estado "disponible". Oscurecido dos veces por contraste, para
        // cumplir AA tanto sobre las cards como sobre el fondo; ver globals.css.
        success: "#147235",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      /**
       * Escala tipográfica del proyecto.
       *
       * Los tamaños grandes usan `clamp()` en lugar de una cadena de
       * variantes (`text-4xl sm:text-5xl lg:text-6xl`): así el titular crece
       * de forma continua con el ancho de la ventana y no da saltos en los
       * puntos de corte.
       *
       * Se declaran como cadenas y no como tupla para que solo fijen
       * `font-size` y sigan respetando el `leading-*` de cada componente.
       */
      fontSize: {
        /** Nombre del Hero. */
        display: "clamp(2.75rem, 6vw, 4.25rem)",
        /** Títulos de sección (`SectionHeading`). */
        title: "clamp(1.875rem, 3.2vw, 2.5rem)",
        /** Entradilla del Hero. */
        lead: "clamp(1.0625rem, 1.4vw, 1.1875rem)",
        /** Etiquetas en versales sobre los títulos. */
        eyebrow: "0.6875rem",
        /** Texto de los controles de tamaño medio (`Button`). */
        control: "0.9375rem",
      },
      /**
       * Interlineados del sistema. Los titulares se aprietan por debajo de 1
       * para que las dos líneas del nombre formen un bloque compacto; el
       * texto largo se abre a 1.75, que es lo que hace cómoda una columna de
       * lectura.
       */
      lineHeight: {
        display: "0.95",
        heading: "1.1",
        reading: "1.75",
      },
      /**
       * Los titulares grandes necesitan tracking negativo: a 68 px, el
       * espaciado por defecto de Inter deja el texto suelto y descuidado.
       */
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
        /** Ajuste mínimo para textos de interfaz de 13 a 16 px. */
        snug: "-0.01em",
        eyebrow: "0.18em",
      },
      spacing: {
        sidebar: LAYOUT.sidebar,
        social: LAYOUT.social,
        card: LAYOUT.card,
        "card-lg": LAYOUT.cardLg,
      },
      maxWidth: {
        content: LAYOUT.content,
        /** Tope del menú lateral en pantallas estrechas. */
        drawer: "85vw",
        /** Medida de lectura cómoda para los párrafos largos. */
        measure: "62ch",
      },
      maxHeight: {
        /** Tope de los diálogos, para que siempre quepan en la ventana. */
        dialog: "85vh",
      },
      gridTemplateColumns: {
        /**
         * Estructura de escritorio. La pista central usa `minmax(0, 1fr)` y
         * no `1fr` porque, por defecto, una pista no encoge por debajo de su
         * contenido y el carrusel de portafolio empujaría la columna derecha
         * fuera de la pantalla.
         */
        shell: `${LAYOUT.sidebar} minmax(0, 1fr) ${LAYOUT.social}`,
      },
      aspectRatio: {
        /** Proporción de las capturas en las cards de portafolio. */
        card: "16 / 10",
      },
      /**
       * Elevación del sistema: `shadow-sm` en reposo, `shadow-md` en hover.
       * Tintadas con el color de tinta y con un radio amplio y poca opacidad,
       * que es lo que distingue una sombra cuidada de un borde gris.
       */
      boxShadow: {
        sm: "0 1px 2px 0 rgb(11 13 16 / 0.04), 0 1px 3px -1px rgb(11 13 16 / 0.03)",
        DEFAULT:
          "0 2px 6px -1px rgb(11 13 16 / 0.06), 0 1px 3px -1px rgb(11 13 16 / 0.04)",
        md: "0 8px 24px -8px rgb(11 13 16 / 0.12), 0 3px 8px -4px rgb(11 13 16 / 0.06)",
        lg: "0 24px 56px -16px rgb(11 13 16 / 0.16), 0 8px 20px -12px rgb(11 13 16 / 0.08)",
        /** Resplandor del accent para el botón principal y las cards en hover. */
        glow: "0 10px 30px -8px rgb(79 70 229 / 0.55), 0 4px 12px -6px rgb(79 70 229 / 0.35)",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
        shine: {
          from: { transform: "translateX(-120%) skewX(-20deg)" },
          to: { transform: "translateX(220%) skewX(-20deg)" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 8s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        shine: "shine 0.9s ease-out",
      },
      ringColor: {
        DEFAULT: "#4F46E5",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        /** Salida suave, para que los hovers no se sientan mecánicos. */
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
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
