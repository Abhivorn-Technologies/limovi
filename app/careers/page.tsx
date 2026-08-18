import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function CareersPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 flex-1">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1929] mb-6">
            Join Our <span className="text-[#005CB9]">Team</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Help us build the future of India's gold ecosystem. We're looking for passionate builders, thinkers, and innovators to join our journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#0A1929] mb-8">Open Positions</h3>
          <div className="space-y-4">
            {[
              { role: "Senior Jewellery Designer", dept: "Design", loc: "Mumbai" },
              { role: "Gold Appraiser & Valuer", dept: "Operations", loc: "Bengaluru" },
              { role: "Luxury Client Advisor", dept: "Customer Experience", loc: "Mumbai" },
              { role: "Vault Security Manager", dept: "Security", loc: "Bengaluru" },
            ].map((job, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#005CB9] transition-colors cursor-pointer group">
                <div>
                  <h4 className="text-lg font-bold text-[#0A1929] group-hover:text-[#005CB9] transition-colors">{job.role}</h4>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500 mt-2">
                    <span className="bg-slate-100 px-2.5 py-1 rounded-md">{job.dept}</span>
                    <span>•</span>
                    <span>{job.loc}</span>
                  </div>
                </div>
                <button className="text-sm font-bold text-[#005CB9] bg-[#EBF5FF] px-5 py-2.5 rounded-full hover:bg-[#D6EBFF] transition-colors whitespace-nowrap">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
