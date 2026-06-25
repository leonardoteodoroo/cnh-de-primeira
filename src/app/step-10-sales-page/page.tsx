import { DiagnosticShift } from "@/components/sales-page/DiagnosticShift";
import { FAQAndClose } from "@/components/sales-page/FAQAndClose";
import { ForceTop } from "@/components/sales-page/ForceTop";
import { InstructorSection } from "@/components/sales-page/InstructorSection";
import { OfferStack } from "@/components/sales-page/OfferStack";
import { PriceSpoilerCard } from "@/components/sales-page/PriceSpoilerCard";
import { SalesHero } from "@/components/sales-page/SalesHero";
import { ApprovedStudentsStepper } from "@/components/sales-page/ApprovedStudentsStepper";
// import { WallOfLove } from "@/components/sales-page/WallOfLove";
import { GuaranteeSection } from "@/components/sales-page/GuaranteeSection";
import { ClosingCTA } from "@/components/sales-page/ClosingCTA";
import { LegalFooter } from "@/components/sales-page/LegalFooter";
import { CourseModules } from "@/components/sales-page/CourseModules";
import { OfferBuildUp } from "@/components/sales-page/OfferBuildUp";
import { ExitIntent } from "@/components/sales-page/ExitIntent";

export default function Step10SalesPage() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-[oklch(0.985_0.003_85)] text-[oklch(0.15_0.01_250)]">
      <ForceTop />
      {/* 1. Reconexão com o Quiz */}
      <SalesHero />
      {/* 2. Quebra de crenças: "Não é estudar mais, é estudar certo" */}
      <DiagnosticShift />
      {/* 3. O método simplificado: Descubra → Treine → Chegue pronto */}
      <OfferStack />
      {/* 4. O que tem dentro: módulos do curso */}
      <CourseModules />
      {/* 5. Prova social visual: fotos de aprovados + métricas */}
      <ApprovedStudentsStepper />
      {/* 6. Ancoragem de valor e justificativa do preço escondido */}
      <OfferBuildUp />
      {/* 7. O preço (ÚNICO bloco interativo com spoiler e timer) */}
      <PriceSpoilerCard />
      {/* 6. Reforço emocional: depoimentos textuais para o cético */}
      {/* <WallOfLove /> */}
      {/* 7. Autoridade: o rosto do Anderson */}
      <InstructorSection />
      {/* 8. Risco zero: garantia de 15 dias */}
      <GuaranteeSection />
      {/* 10. FAQ com última quebra de objeções racionais */}
      <FAQAndClose />
      {/* 11. O empurrão final para quem rolou até o fim */}
      <ClosingCTA />
      {/* 12. Rodapé com Aviso Legal e Modais (sem ponto de fuga) */}
      <LegalFooter />
      <ExitIntent />
    </main>
  );
}
