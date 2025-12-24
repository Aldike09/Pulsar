"use client"
import { HeroSection } from "@/components/hero-section"
import { FactsSection } from "@/components/facts-section"
import { FormulasSection } from "@/components/formulas-section"
import { StarField } from "@/components/star-field"
import { MeteorShower } from "@/components/meteor-shower"
import { NebulaBackground } from "@/components/nebula-background"
import { NeutronStar3D } from "@/components/neutron-star-3d"
import { HistorySection } from "@/components/history-section"
import { DiscoverySection } from "@/components/discovery-section"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <NebulaBackground />
      <StarField />
      <MeteorShower />
      <div className="relative z-10">
        <HeroSection />
        <DiscoverySection />
        <FactsSection />
        <HistorySection />
        <FormulasSection />
        <NeutronStar3D />
      </div>
    </main>
  )
}
