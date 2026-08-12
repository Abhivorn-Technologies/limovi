"use client";

import { useEffect } from "react";

export default function RegisterPage() {
  useEffect(() => {
    const webappUrl = process.env.NEXT_PUBLIC_WEBAPP_URL;
    if (webappUrl) {
      window.location.href = `${webappUrl}/login`;
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-600 font-sans">
      <p className="animate-pulse font-semibold">Redirecting to Limovi WebApp Registration...</p>
    </div>
  );
}
