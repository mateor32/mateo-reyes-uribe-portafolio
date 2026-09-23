"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

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

export interface ModalProps {
  /** Controla la visibilidad. El estado vive fuera, en el organismo. */
  isOpen: boolean;
  /** Se llama al cerrar con Esc, con el fondo o con el botón de cierre. */
  onClose: () => void;
  /** Título visible. Además nombra el diálogo para los lectores de pantalla. */
  title?: string;
  /** Nombre accesible alternativo cuando no hay título visible. */
  ariaLabel?: string;
  children: ReactNode;
  /** Clases del panel, por ejemplo para ensancharlo (`max-w-3xl`). */
  className?: string;
  /** Etiqueta accesible del botón de cierre. */
  closeLabel?: string;
}

/**
 * Diálogo genérico y reutilizable.
 *
 * No sabe nada de su contenido: recibe `children`, así que sirve igual para
 * la biografía del Hero que para el detalle de un proyecto del portafolio.
 * Lo único que impone es el marco (fondo, panel, botón de cierre) y el
 * comportamiento accesible.
 *
 * Qué resuelve:
 *
 * - Se cierra con `Esc`, pulsando el fondo o el botón de cierre.
 * - Atrapa el foco: el tabulador circula dentro del panel y no se escapa al
 *   contenido de detrás, que sigue ahí aunque no se vea.
 * - Devuelve el foco al elemento que lo abrió, para que quien navega con
 *   teclado no acabe al principio de la página.
 * - Bloquea el desplazamiento del fondo mientras está abierto.
 *
 * Se dibuja con `createPortal` sobre `document.body` y no en el sitio donde
 * se declara: si quedara dentro de una card, cualquier ancestro con
 * `transform` (por ejemplo el `hover:-translate-y-1` de las cards) crearía un
 * nuevo contexto de posicionamiento y el `fixed` del fondo dejaría de cubrir
 * la pantalla.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  ariaLabel,
  children,
  className,
  closeLabel = "Cerrar",
}: ModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  /**
   * El portal necesita `document.body`, que no existe al renderizar en el
   * servidor: hasta que no se hidrata en el navegador, el diálogo no dibuja
   * nada. Se resuelve con `useSyncExternalStore` (que devuelve `false` en el
   * servidor y `true` en el cliente) en lugar de un `useEffect` que llame a
   * `setState`, porque eso provocaría un render en cascada tras la hidratación.
   */
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

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Fondo. Es decorativo: el cierre por teclado ya lo cubre Esc. */}
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : ariaLabel}
            tabIndex={-1}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-surface p-6 shadow-lg outline-none sm:p-8",
              className,
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-line/60 hover:text-ink"
            >
              <X size={18} aria-hidden="true" />
            </button>

            {title && (
              <h2
                id={titleId}
                className="pr-10 text-lg font-semibold text-ink sm:text-xl"
              >
                {title}
              </h2>
            )}

            <div className={cn(title && "mt-4")}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
