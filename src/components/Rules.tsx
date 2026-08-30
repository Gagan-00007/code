"use client";

import { motion } from "framer-motion";

const rules = [
  {
    title: "Team participation",
    desc: "2–4 members, pre-registration mandatory, all members present for the qualification hunt.",
  },
  {
    title: "Fair play",
    desc: "cheating, plagiarism, or sabotage disqualifies the entire team.",
  },
  {
    title: "AI tools",
    desc: "not permitted in Levels 1–3, allowed only in the Level 4 IoT Finale.",
  },
  {
    title: "Campus safety",
    desc: "no running in corridors or damaging property during the hunt.",
  },
  {
    title: "Judging",
    desc: "accuracy, problem-solving, time management, innovation, creativity & currency — judged decision is final.",
  },
  {
    title: "Registration",
    desc: "closes 3 days before the event (5 Oct 2026), payment via QR/UPI only. Participation certificates for all.",
  },
];

export default function Rules() {
  return (
    <section id="rules" className="py-24 bg-white/[0.02] border-y border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm text-accent-gold font-bold uppercase tracking-widest mb-4">
            Guidelines
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-off-white">
            Rules of the Hunt
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex gap-4"
            >
              <div className="text-accent-gold font-display text-2xl pt-1">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-bold text-lg text-off-white uppercase tracking-wide mb-2">
                  {rule.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
