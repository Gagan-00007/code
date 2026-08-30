"use client";

import { motion } from "framer-motion";

const prizes = [
  {
    category: "Juniors",
    eligible: "10th, PUC (all streams)",
    fee: "₹399",
    totalPool: "₹10,000",
    breakdown: [
      { place: "1st", amount: "₹5,000" },
      { place: "2nd", amount: "₹3,000" },
      { place: "3rd", amount: "₹2,000" },
    ],
    accent: "border-accent-blue",
    textAccent: "text-accent-blue",
  },
  {
    category: "Seniors",
    eligible: "BCA, BE, Masters (all streams)",
    fee: "₹499",
    totalPool: "₹20,000",
    breakdown: [
      { place: "1st", amount: "₹10,000" },
      { place: "2nd", amount: "₹7,000" },
      { place: "3rd", amount: "₹3,000" },
    ],
    accent: "border-accent-gold",
    textAccent: "text-accent-gold",
  },
];

export default function Prizes() {
  return (
    <section id="prizes" className="py-24 bg-white/[0.02] border-y border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm text-accent-gold font-bold uppercase tracking-widest mb-4">
            Rewards
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-off-white">
            Categories & Prizes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`p-8 md:p-12 rounded-2xl bg-background border-t-4 ${prize.accent} shadow-2xl relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className={`font-display text-8xl ${prize.textAccent}`}>₹</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="font-display text-4xl text-off-white mb-2 uppercase">
                  {prize.category}
                </h3>
                <p className="text-foreground/70 mb-8">{prize.eligible}</p>

                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-foreground/50 font-bold mb-1">
                      Registration Fee
                    </p>
                    <p className="text-2xl font-bold text-off-white">{prize.fee}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm uppercase tracking-widest text-foreground/50 font-bold mb-1">
                      Total Prize Pool
                    </p>
                    <p className={`text-3xl font-display ${prize.textAccent}`}>
                      {prize.totalPool}
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {prize.breakdown.map((item) => (
                    <li key={item.place} className="flex justify-between items-center bg-white/5 px-6 py-4 rounded-lg">
                      <span className="font-bold text-off-white uppercase">{item.place} Place</span>
                      <span className="font-bold text-accent-gold text-lg">{item.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
