import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroGold } from "@/sections/HeroGold";
import { Problem } from "@/sections/Problem";
import { GoldJourney } from "@/sections/GoldJourney";
import { JewelleryCloud } from "@/sections/JewelleryCloud";
import { Dashboard } from "@/sections/Dashboard";
import { InstantLoans } from "@/sections/InstantLoans";
import { WealthGen } from "@/sections/WealthGen";
import { GiftGold } from "@/sections/GiftGold";
import { MarketOpportunity } from "@/sections/MarketOpportunity";
import { Security } from "@/sections/Security";
import { HowItWorks } from "@/sections/HowItWorks";
import { Comparison } from "@/sections/Comparison";
import { Advantage } from "@/sections/Advantage";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-brand-dark overflow-x-clip">
      <Navbar />
      
      <HeroGold />
      <Problem />
      <HowItWorks />
      <GoldJourney />
      <JewelleryCloud />
      <Dashboard />
      <InstantLoans />
      <WealthGen />
      <GiftGold />
      <Advantage />
      <Comparison />
      <MarketOpportunity />
      <Security />
      <FAQ />
      <FinalCTA />

      <Footer />
    </main>
  );
}
