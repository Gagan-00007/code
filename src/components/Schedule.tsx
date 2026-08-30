"use client";

import { motion } from "framer-motion";

const schedule = [
  {
    day: "Day 1",
    date: "8 Oct",
    events: [
      { time: "Morning", title: "Check-in & Briefing" },
      { time: "Round 1", title: "L1 Aptitude" },
      { time: "Round 2", title: "L2 Treasure Hunt" },
      { time: "Midday", title: "Lunch Break" },
      { time: "Round 3", title: "L3 Code & Debug", subtitle: "(Results for qualifiers)" },
    ],
  },
  {
    day: "Day 2",
    date: "9 Oct",
    subtitle: "(Qualifiers only)",
    events: [
      { time: "Finale", title: "L4 IoT Finale", subtitle: "Presentations & Demos" },
      { time: "Closing", title: "Winner Announcement & Prize Distribution" },
    ],
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm text-accent-gold font-bold uppercase tracking-widest mb-4">
            Itinerary
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-off-white">
            Run of Show
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {schedule.map((dayData, index) => (
            <motion.div
              key={dayData.day}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="mb-8 pb-4 border-b-2 border-white/10">
                <h3 className="font-display text-4xl text-accent-gold uppercase tracking-wide">
                  {dayData.day} <span className="text-white/30 text-2xl ml-2">— {dayData.date}</span>
                </h3>
                {dayData.subtitle && (
                  <p className="text-accent-blue font-bold mt-2 uppercase text-sm tracking-widest">
                    {dayData.subtitle}
                  </p>
                )}
              </div>

              <div className="space-y-6">
                {dayData.events.map((event, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-24 shrink-0 text-sm font-bold text-foreground/50 uppercase tracking-wider pt-1 group-hover:text-accent-gold transition-colors">
                      {event.time}
                    </div>
                    <div className="flex-1 pb-6 border-b border-white/5 last:border-0">
                      <h4 className="text-lg font-bold text-off-white">{event.title}</h4>
                      {event.subtitle && (
                        <p className="text-sm text-foreground/60 mt-1">{event.subtitle}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
