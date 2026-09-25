"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { RefObject } from "react";

/**
 * Elementos que pueden recibir el foco con el tabulador. Se consulta en cada
 * pulsación en lugar de guardarse, porque el contenido del diálogo lo decide
 * quien lo usa y puede cambiar mientras está abierto.
 */
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * Suscripción vacía para `useSyncExternalStore`: aquí no hay nada que
 * escuchar, solo interesa que el valor del servidor difiera del del cliente.
 */
const noopSubscribe = () => () => {};

export interface UseDialogBehaviorOptions {
  isOpen: boolean;
  onClose: () => void;
}

export interface UseDialogBehavior<T extends HTMLElement> {
  /** Colócala en el panel del diálogo: es lo que se enfoca y se vigila. */
  panelRef: RefObject<T | null>;
  /**
   * `false` mientras se renderiza en el servidor y `true` una vez hidratado.
   * Los diálogos se dibujan con `createPortal` sobre `document.body`, que en
   * el servidor no existe, así que hasta entonces no deben dibujar nada.
   */
  isMounted: boolean;
}

/**
 * Comportamiento común a cualquier diálogo modal: el modal centrado del Hero
 * y del portafolio, y el menú lateral del móvil.
 *
 * Vive en un hook y no repetido en cada componente porque son cuatro reglas
 * que es fácil implementar a medias, y hacerlo mal deja fuera a quien navega
 * con teclado o con lector de pantalla:
 *
 * - Mueve el foco dentro del panel al abrir.
 * - Lo devuelve al elemento que lo abrió al cerrar, para no acabar al
 *   principio de la página.
 * - Atrapa el tabulador dentro del panel: el contenido de detrás sigue en el
 *   documento aunque no se vea, y sin trampa el foco se escaparía a él.
 * - Bloquea el desplazamiento del fondo mientras está abierto.
 *
 * El cierre con `Esc` también se resuelve aquí. Pulsar el fondo es cosa de
 * cada componente, porque cada uno dibuja el suyo.
 */
export function useDialogBehavior<T extends HTMLElement>({
  isOpen,
  onClose,
}: UseDialogBehaviorOptions): UseDialogBehavior<T> {
  const panelRef = useRef<T>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const isMounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  // Mueve el foco al panel al abrir y lo devuelve a su sitio al cerrar.
  useEffect(() => {
    if (!isOpen) return;

    openerRef.current = document.activeElement as HTMLElement | null;

    // Un frame de margen: el panel todavía no está en el DOM cuando el efecto
    // corre, porque AnimatePresence lo monta al animar la entrada.
    const frame = requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const first = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (first ?? panel).focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      openerRef.current?.focus();
    };
  }, [isOpen]);

  // Cierre con Esc y trampa de foco.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        // Descarta lo que esté oculto: un elemento sin rectángulos no se
        // puede enfocar y rompería el ciclo del tabulador.
      ).filter((element) => element.getClientRects().length > 0);

      const active = document.activeElement;

      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (active instanceof Node && !panel.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Evita que el fondo se desplace mientras el diálogo está abierto.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return { panelRef, isMounted };
}
