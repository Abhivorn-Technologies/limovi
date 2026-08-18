import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 flex-1">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1929] mb-6">
            About <span className="text-[#005CB9]">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            We are redefining how India interacts with its most trusted asset. Limovi transforms idle gold into a dynamic engine for wealth, luxury, and liquidity.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-[#EBF5FF] rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#005CB9]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0A1929] mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              To unlock the true potential of gold. We believe gold shouldn't sit idle in lockers—it should work for you, providing instant liquidity, opening doors to luxury experiences, and generating passive wealth.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-[#FFF8E6] rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0A1929] mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              To build a global 360° ecosystem where every gram of gold is fully utilized, seamlessly integrating finance, luxury, and technology to empower individuals and families.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
