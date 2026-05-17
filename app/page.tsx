import { Suspense } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { FounderSection } from "@/components/sections/founder-section";
import { FounderPhotoSection } from "@/components/sections/founder-photo-section";
import { HerzSection } from "@/components/sections/herz-section";
import { DesiresSection } from "@/components/sections/desires-section";
import { ProgrammeSection } from "@/components/sections/programme-section";
import { ProgrammeSectionSkeleton } from "@/components/sections/programme-section-skeleton";
import { SternstundeSection } from "@/components/sections/sternstunde-section";
import { RetreatsSection } from "@/components/sections/retreats-section";
import { BewegungSection } from "@/components/sections/bewegung-section";
import { VisionSection } from "@/components/sections/vision-section";
import { KontaktSection } from "@/components/sections/kontakt-section";
import { CoachingSection } from "@/components/sections/coaching-section";
import { SponsorsSection } from "@/components/sections/sponsors-section";

/** Kursliste kommt aus der DB und soll nicht beim Build „eingefroren“ werden. */
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <SiteNav />
      <HeroSection />
      <MissionSection />
      <FounderSection />
      <FounderPhotoSection />
      <HerzSection />
      <DesiresSection />
      <Suspense fallback={<ProgrammeSectionSkeleton />}>
        <ProgrammeSection />
      </Suspense>
      <SternstundeSection />
      <RetreatsSection />
      <BewegungSection />
      <VisionSection />
      <KontaktSection />
      <CoachingSection />
      <SponsorsSection />
      <SiteFooter />
    </>
  );
}
