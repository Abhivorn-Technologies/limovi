import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-[#0A1929] mb-6">
            Privacy Policy
          </h1>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              This document is currently being finalized by our legal and compliance teams. The comprehensive privacy policy and data protection guidelines will be published here prior to the official launch of the platform.
            </p>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mt-4">
              We are committed to protecting your personal information and your right to privacy. If you have any immediate questions or concerns, please contact us.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
