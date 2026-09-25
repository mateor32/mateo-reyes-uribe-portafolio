import { ContactSection } from "@/components/organisms/ContactSection";
import { ExperienceSection } from "@/components/organisms/ExperienceSection";
import { Footer } from "@/components/organisms/Footer";
import { HeroSection } from "@/components/organisms/HeroSection";
import { KnowledgeSection } from "@/components/organisms/KnowledgeSection";
import { PortfolioSection } from "@/components/organisms/PortfolioSection";
import { MainLayout } from "@/components/templates/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      {/*
        Separadores muy tenues: cada sección ya se anuncia con su etiqueta
        numerada, así que una línea marcada duplicaría el corte.
      */}
      <main className="divide-y divide-line-soft">
        <HeroSection />
        <KnowledgeSection />
        <ExperienceSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </MainLayout>
  );
}
