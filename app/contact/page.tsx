import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-slate-50">
      <Navbar />
      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 flex-1">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1929] mb-6">
            Get in <span className="text-[#005CB9]">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Have questions about the Gold Ecosystem? We're here to help you navigate your journey.
          </p>
        </div>
          
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
            <h3 className="text-2xl font-bold text-[#0A1929] mb-6">Send us a Message</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">First Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005CB9] transition-all" placeholder="John" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Last Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005CB9] transition-all" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005CB9] transition-all" placeholder="john@example.com" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Message</label>
                <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005CB9] transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-[#005CB9] hover:bg-[#004791] text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Offices */}
          <div className="flex flex-col justify-center space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-[#0A1929] mb-4">Direct Contact</h3>
              <p className="text-slate-600 font-medium mb-2">For general inquiries and support:</p>
              <a href="mailto:support@limovi.in" className="text-[#005CB9] text-xl font-black hover:underline block mb-1">
                support@limovi.in
              </a>
              <p className="text-slate-500 font-medium">1800-LIMOVI-GOLD</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0A1929] mb-4">Our Offices</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5FF] flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#005CB9]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1929] text-lg">Mumbai HQ</h4>
                    <p className="text-slate-600 font-medium leading-snug">Limovi Tower, BKC<br/>Bandra East, Mumbai 400051</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5FF] flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#005CB9]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1929] text-lg">Bengaluru</h4>
                    <p className="text-slate-600 font-medium leading-snug">Limovi Tech Hub, HSR Layout<br/>Bengaluru 560102</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
