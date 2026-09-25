import { ExperienceSection } from "@/components/organisms/ExperienceSection";
import { Footer } from "@/components/organisms/Footer";
import { HeroSection } from "@/components/organisms/HeroSection";
import { KnowledgeSection } from "@/components/organisms/KnowledgeSection";
import { LeftSidebar } from "@/components/organisms/LeftSidebar";
import { PortfolioSection } from "@/components/organisms/PortfolioSection";
import { RightSidebar } from "@/components/organisms/RightSidebar";

/**
 * Banco de pruebas temporal de la fase 6.
 *
 * Monta las secciones del centro entre las dos columnas fijas, que es como
 * quedarán en la plantilla definitiva. Sirve para revisar el orden, el ritmo
 * vertical y que los dos modales (biografía y detalle de proyecto) abren y
 * cierran sin estorbarse.
 */
export default function ProbeSections() {
  return (
    <div className="flex min-h-screen">
      <LeftSidebar />

      <div className="flex min-w-0 flex-1 flex-col px-8 lg:px-12">
        <main className="flex-1 divide-y divide-line">
          <HeroSection />
          <KnowledgeSection />
          <ExperienceSection />
          <PortfolioSection />
        </main>
        <Footer />
      </div>

      <RightSidebar />
    </div>
  );
}
