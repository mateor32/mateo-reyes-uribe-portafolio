import { SectionHeading } from "@/components/atoms/SectionHeading";
import { LeftSidebar } from "@/components/organisms/LeftSidebar";
import { RightSidebar } from "@/components/organisms/RightSidebar";

/**
 * Banco de pruebas temporal de la fase 5.
 *
 * El contenido central es deliberadamente largo: sirve para comprobar que
 * las dos columnas se quedan fijas mientras el centro se desplaza, y que la
 * izquierda gestiona su propio scroll cuando la ficha no cabe en pantalla.
 */
export default function ProbeSidebars() {
  return (
    <div className="flex min-h-screen">
      <LeftSidebar />

      <main className="flex-1 px-10 py-12">
        <SectionHeading
          title="Columnas fijas"
          subtitle="Desplaza la página: las dos barras laterales deben quedarse en su sitio."
        />

        <div className="mt-10 space-y-6">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="rounded-xl border border-line bg-surface p-8 shadow-sm"
            >
              <h2 className="text-base font-semibold text-ink">
                Bloque de relleno {index + 1}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Contenido de prueba para dar altura a la página y poder
                verificar el comportamiento fijo de las columnas laterales.
              </p>
            </div>
          ))}
        </div>
      </main>

      <RightSidebar />
    </div>
  );
}
