import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function PressPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 flex-1">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1929] mb-6">
            Press & <span className="text-[#005CB9]">Media</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Read the latest news, announcements, and coverage of Limovi from top publications.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { date: "October 12, 2025", tag: "Press Release", title: "Limovi Launches India's First 360° Gold Asset Ecosystem", excerpt: "The revolutionary platform allows users to convert physical gold into a digital balance, unlocking instant liquidity, luxury jewellery subscriptions, and wealth generation." },
            { date: "September 05, 2025", tag: "News", title: "Limovi Secures $15M Series A to Expand Jewellery Cloud", excerpt: "Funding led by top fintech investors will accelerate the expansion of Limovi's vaulting infrastructure and the onboarding of premium jewellery design partners." },
            { date: "August 20, 2025", tag: "Coverage", title: "How Limovi is Changing the Way We Think About Idle Gold", excerpt: "An in-depth look into how the new Limovi platform is providing an alternative to traditional bank lockers by putting gold to work for the consumer." },
          ].map((article, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-500 mb-4">
                <span className="text-[#005CB9]">{article.tag}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>{article.date}</span>
              </div>
              <h3 className="text-2xl font-black text-[#0A1929] group-hover:text-[#005CB9] transition-colors mb-3">
                {article.title}
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                {article.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-2 text-[#005CB9] font-bold text-sm uppercase tracking-wider">
                Read Full Story <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
