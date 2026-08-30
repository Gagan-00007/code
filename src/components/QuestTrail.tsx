"use client";

import { motion } from "framer-motion";

const levels = [
  {
    num: "01",
    title: "Aptitude",
    desc: "Logic puzzles and timed challenges testing quantitative and analytical ability. Decode the clue to find your next location.",
  },
  {
    num: "02",
    title: "Treasure Hunt",
    desc: "A campus-wide adventure — find 4 hidden clues scattered across AIEMS. Solve the puzzle.",
  },
  {
    num: "03",
    title: "Code & Debug",
    desc: "Advanced algorithmic problems and complex debugging tasks under pressure. Clear this round to enter the grand finale.",
  },
  {
    num: "04",
    title: "Finals: IoT Innovation Finale",
    desc: "Find hidden IoT parts on campus, then design, build & present a working model. Present your demo to judges — winners are crowned.",
  },
];

export default function QuestTrail() {
  return (
    <section id="quest-trail" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm text-accent-gold font-bold uppercase tracking-widest mb-4">
            The Journey
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-off-white">
            The Quest Trail
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level, index) => (
            <motion.div
              key={level.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative group p-8 bg-white/[0.02] border border-white/10 hover:border-accent-blue/50 rounded-xl overflow-hidden transition-colors"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <span className="font-display text-7xl text-white/5 block mb-4 group-hover:text-accent-blue/10 transition-colors">
                  {level.num}
                </span>
                <h3 className="text-xl font-bold text-off-white mb-4 uppercase tracking-wide">
                  Level {level.num} <br />
                  <span className="text-accent-gold">{level.title}</span>
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {level.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
