"use client";

import { motion } from "framer-motion";
import { Trophy, CalendarClock, Target, Zap } from "lucide-react";

const facts = [
  {
    icon: <Zap className="w-8 h-8 text-accent-gold" />,
    label: "Event Name",
    value: "CodeHunt 3.0",
  },
  {
    icon: <CalendarClock className="w-8 h-8 text-accent-gold" />,
    label: "Date",
    value: "8–9 Oct 2026",
  },
  {
    icon: <Target className="w-8 h-8 text-accent-gold" />,
    label: "Format",
    value: "4-level campus tech quest",
  },
  {
    icon: <Trophy className="w-8 h-8 text-accent-gold" />,
    label: "Prize Pool",
    value: "₹30,000 / Fee ₹399–₹499",
  },
];

export default function QuickFacts() {
  return (
    <section className="py-12 border-y border-white/10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-start gap-4 p-6 rounded-lg bg-background border border-white/5 hover:border-accent-gold/30 hover:bg-white/[0.04] transition-all"
            >
              <div className="p-3 bg-accent-gold/10 rounded-md">
                {fact.icon}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/60 font-bold mb-1">
                  {fact.label}
                </p>
                <p className="text-lg font-bold text-off-white">{fact.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
