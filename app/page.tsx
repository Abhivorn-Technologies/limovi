import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { CinematicHero } from "@/sections/CinematicHero";
import { Problem } from "@/sections/Problem";
import { Dashboard } from "@/sections/Dashboard";
import { GoldJourney } from "@/sections/GoldJourney";
import { JewelleryCloud } from "@/sections/JewelleryCloud";
import { JewelleryExperience } from "@/sections/JewelleryExperience";
import { InstantLoans } from "@/sections/InstantLoans";
import { WealthGen } from "@/sections/WealthGen";

import { GiftGold } from "@/sections/GiftGold";
import { AccessStrategies } from "@/sections/AccessStrategies";
import { MarketOpportunity } from "@/sections/MarketOpportunity";
import { Security } from "@/sections/Security";

import { Comparison } from "@/sections/Comparison";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip">
      <Navbar />
      
      <CinematicHero />

      <Problem />
      <Dashboard />
      <JewelleryCloud />
      <JewelleryExperience />
      <InstantLoans />
      <WealthGen />

      <GiftGold />
      <AccessStrategies />
      <GoldJourney />
      <Comparison />
      <Security />
      <FAQ />
      <FinalCTA />

      <Footer />
    </main>
  );
}
