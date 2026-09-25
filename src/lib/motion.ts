import type { Transition, Variants } from "framer-motion";

/**
 * Variantes de entrada compartidas por las moléculas animadas.
 *
 * Viven aquí y no dentro de cada componente para que todas las secciones
 * entren con la misma distancia y la misma curva: si mañana se decide que el
 * desplazamiento es de 24 px en vez de 16, se cambia en un solo sitio.
 */

/**
 * Configuración de viewport para las animaciones disparadas por scroll.
 *
 * `once: true` evita que el contenido vuelva a animarse cada vez que se pasa
 * por encima, que resulta molesto al navegar arriba y abajo. `amount` es la
 * fracción del elemento que debe verse para disparar la animación.
 */
export const VIEWPORT_ONCE = { once: true, amount: 0.25 } as const;

/** Entrada desde abajo con desvanecido. Usada en las cards de conocimientos. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/** Entrada lateral desde la izquierda. Usada en la línea de formación. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

/**
 * Variantes neutras para quien pide `prefers-reduced-motion`.
 *
 * La regla de `globals.css` que anula las animaciones solo alcanza a las de
 * CSS: Framer Motion anima desde JavaScript y se la salta, así que cada
 * componente elige estas variantes cuando `useReducedMotion()` da `true`.
 * El contenido aparece directamente en su sitio, sin desplazamiento.
 *
 * Fija explícitamente cada propiedad que tocan las demás variantes: en el
 * primer render `useReducedMotion()` todavía no conoce la preferencia, así que
 * el HTML sale con el estado `hidden` animado (desplazado, borroso) y, si
 * estas variantes no lo deshacen, el contenido se queda así.
 */
const RESTING = {
  opacity: 1,
  x: 0,
  y: 0,
  rotate: 0,
  filter: "blur(0px)",
  transition: { duration: 0 },
};

export const noMotion: Variants = {
  hidden: RESTING,
  visible: RESTING,
};

/**
 * Contenedor que escalona la entrada de sus hijos.
 *
 * Los hijos solo declaran `variants`, nunca `initial` ni `whileInView`: en
 * Framer Motion el estado de animación se hereda por contexto y un hijo que
 * define los suyos deja de escuchar al padre, con lo que el escalonado no
 * llegaría a ocurrir.
 */
export function staggerContainer(
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/** Transición de entrada sin retardo, para los hijos de un contenedor escalonado. */
export const ENTRANCE_TRANSITION: Transition = {
  duration: 0.45,
  ease: "easeOut",
};

/**
 * Transición de entrada con retardo escalonado según la posición del elemento
 * en su lista.
 *
 * El retardo se limita a los primeros elementos porque en una rejilla larga
 * un escalonado sin tope dejaría las últimas cards esperando varios segundos.
 */
export function entranceTransition(index = 0): Transition {
  return {
    duration: 0.45,
    ease: "easeOut",
    delay: Math.min(Math.max(index, 0), 8) * 0.07,
  };
}
