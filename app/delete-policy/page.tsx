import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete Policy | LIMOVI",
  description: "Account & Data Deletion Policy for the LIMOVI Gold Asset Ecosystem platform.",
};

export default function DeletePolicyPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#005CB9] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Compliance &amp; Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#0A1929] mt-3 mb-4">
              Account &amp; Data Deletion Policy
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10 space-y-8 text-slate-600 font-medium leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-[#0A1929] mb-3">1. Overview</h2>
              <p>
                At LIMOVI, we are committed to respecting and protecting your privacy while ensuring full transparency regarding your personal data. This Account and Data Deletion Policy outlines how you can request the deletion of your account and personal data, what data will be deleted, and what records may be retained in accordance with applicable laws and regulatory guidelines.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A1929] mb-3">2. How to Request Account &amp; Data Deletion</h2>
              <p className="mb-3">
                You can initiate a request to delete your LIMOVI account and associated personal information through either of the following methods:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>
                  <strong className="text-slate-900">In-App Deletion:</strong> Navigate to your Account Settings &gt; Security &amp; Privacy &gt; Request Account Deletion.
                </li>
                <li>
                  <strong className="text-slate-900">Email Request:</strong> Send an email from your registered email address to{" "}
                  <a href="mailto:support@limovi.in" className="text-[#005CB9] hover:underline font-semibold">
                    support@limovi.in
                  </a>{" "}
                  with the subject line <span className="font-semibold text-slate-800">&quot;Account Deletion Request&quot;</span>.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A1929] mb-3">3. What Happens Upon Deletion Request</h2>
              <p className="mb-3">
                Upon receiving and verifying your deletion request:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your profile details, contact information, credentials, and non-statutory personal preferences will be permanently erased or anonymized from active databases.</li>
                <li>You will immediately lose access to your LIMOVI account, connected dashboard, and associated notification services.</li>
                <li>Any active or ongoing transactions, active gold loan balances, or open asset positions must be settled and closed prior to processing account deletion.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A1929] mb-3">4. Statutory &amp; Regulatory Data Retention</h2>
              <p>
                As a regulated financial technology platform operating in India, LIMOVI is subject to statutory compliance mandates governed by regulatory authorities including the Reserve Bank of India (RBI), the Securities and Exchange Board of India (SEBI), and the Prevention of Money Laundering Act (PMLA).
              </p>
              <p className="mt-3">
                Certain records—such as transaction history, KYC verification documents, anti-fraud logs, and audit trails—are legally required to be maintained for the minimum retention period stipulated by Indian law (typically 5 to 10 years). Once these statutory retention windows expire, such records will be securely purged.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A1929] mb-3">5. Processing Timeline</h2>
              <p>
                Account deletion requests will be validated and acknowledged within <strong className="text-slate-800">48 hours</strong>. Full processing and removal from active systems are completed within <strong className="text-slate-800">30 business days</strong>, subject to the resolution of any open balances or contractual obligations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A1929] mb-3">6. Contact Support</h2>
              <p>
                If you have questions, concerns, or need assistance regarding your data privacy and deletion rights, please contact our Data Protection and Compliance team at:
              </p>
              <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-slate-800 font-semibold">LIMOVI Support &amp; Compliance</p>
                <p className="text-slate-600 mt-1">Email: <a href="mailto:support@limovi.in" className="text-[#005CB9] hover:underline">support@limovi.in</a></p>
                <p className="text-slate-600">Toll-free: 1800-LIMOVI-GOLD</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
