"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Laptop, ChevronRight } from "lucide-react";
import { REGISTER_URL } from "@/lib/Constants";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target: Oct 5, 2026 (Registration Deadline)
    const targetDate = new Date("2026-10-05T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Decorative ASCII/Halftone element (simulated with CSS grid/dots) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl flex flex-col items-center"
        >

          <p className="text-sm md:text-base text-accent-blue font-bold uppercase tracking-widest mb-6">
            Welcome to the Ultimate Challenge &mdash; TECHNO QUEST 3.0
          </p>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-none uppercase text-off-white mb-8 tracking-tight">
            Code Hunt
          </h1>

          <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-3xl leading-relaxed">
            Where logic meets innovation and bugs stand no chance. A brain-teasing, code-crunching marathon where debugging legends are born.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
              <Calendar size={16} className="text-accent-gold" />
              <span>8–9 Oct 2026 &middot; AIEMS Bidadi, Bengaluru</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
              <Users size={16} className="text-accent-gold" />
              <span>Juniors: 10th & PUC</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
              <Laptop size={16} className="text-accent-gold" />
              <span>Seniors: BCA / BE / Masters</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
              <Users size={16} className="text-accent-gold" />
              <span>Teams of 2–4</span>
            </div>
          </div>

          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-3 md:gap-6">
              {[
                { label: "DAYS", value: timeLeft.days },
                { label: "HOURS", value: timeLeft.hours },
                { label: "MINUTES", value: timeLeft.minutes },
                { label: "SECONDS", value: timeLeft.seconds },
              ].map((unit, idx, arr) => (
                <div key={unit.label} className="flex items-center gap-3 md:gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-20 md:w-24 md:h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl">
                      <span className="font-display text-3xl md:text-5xl text-off-white font-bold tracking-widest">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] md:text-sm text-foreground/70 uppercase tracking-[0.2em] font-medium">
                      {unit.label}
                    </span>
                  </div>
                  
                  {/* Colons */}
                  {idx !== arr.length - 1 && (
                    <div className="flex flex-col gap-2 md:gap-4 -mt-8">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/40" />
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-accent-gold text-background font-bold text-lg rounded hover:bg-accent-gold/90 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Register Now
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#quest-trail"
              className="px-8 py-4 bg-transparent border-2 border-white/20 text-off-white font-bold text-lg rounded hover:border-accent-blue hover:text-accent-blue transition-all w-full sm:w-auto text-center"
            >
              See the Quest Trail
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
