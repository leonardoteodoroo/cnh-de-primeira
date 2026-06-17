import { DiagnosticShift } from "@/components/sales-page/DiagnosticShift";
import { FAQAndClose } from "@/components/sales-page/FAQAndClose";
import { ForceTop } from "@/components/sales-page/ForceTop";
import { InstructorSection } from "@/components/sales-page/InstructorSection";
import { OfferStack } from "@/components/sales-page/OfferStack";
import { SalesHero } from "@/components/sales-page/SalesHero";
import { StudentResultsStepper } from "@/components/sales-page/StudentResultsStepper";
import { WallOfLove } from "@/components/sales-page/WallOfLove";

export default function Step10SalesPage() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-[oklch(0.985_0.003_85)] text-[oklch(0.15_0.01_250)]">
      <ForceTop />
      <SalesHero />
      <DiagnosticShift />
      <OfferStack />
      <InstructorSection />
      <StudentResultsStepper />
      <WallOfLove />
      <FAQAndClose />
    </main>
  );
}
