"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { REGISTER_URL } from "@/lib/Constants";

export default function RegisterBand() {
  return (
    <section className="py-24 bg-accent-gold relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-display text-5xl md:text-7xl uppercase text-background mb-6">
          Registration closes 5 Oct 2026
        </h2>
        <p className="text-xl font-medium text-background/80 mb-10 uppercase tracking-widest">
          3 days before the event
        </p>
        
        <Link
          href={REGISTER_URL}
          className="group inline-flex items-center justify-center gap-2 px-12 py-5 bg-background text-off-white font-bold text-xl rounded hover:bg-[#1a1a1a] transition-all hover:scale-105 active:scale-95 shadow-xl"
        >
          Register Now
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <p className="mt-8 text-background/70 font-bold uppercase tracking-widest text-sm">
          Payment via QR/UPI only
        </p>
      </div>
    </section>
  );
}
