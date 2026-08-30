import { ChevronRight, Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function GameTeaser() {
  return (
    <section className="py-24 bg-white/[0.02] border-y border-white/10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Gamepad2 className="w-16 h-16 text-accent-blue mx-auto mb-6" />
        <h2 className="font-display text-4xl md:text-5xl uppercase text-off-white mb-4">
          Think you know your words?
        </h2>
        <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Play our Contexto-style semantic word game. The top scorer on the leaderboard gets <span className="text-accent-gold font-bold">25% off their CodeHunt 3.0 registration fee!</span>
        </p>
        
        <Link
          href="/game"
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-blue text-white font-bold text-lg rounded hover:bg-accent-blue/90 transition-all hover:scale-105 active:scale-95 shadow-xl"
        >
          Play & Win 🎮
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
