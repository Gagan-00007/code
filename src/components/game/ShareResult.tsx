import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, X, Check } from "lucide-react";
import Leaderboard from "./Leaderboard";

type ShareResultProps = {
  isOpen: boolean;
  onClose: () => void;
  guesses: { word: string; rank: number }[];
  hints: number;
};

export default function ShareResult({ isOpen, onClose, guesses, hints }: ShareResultProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const total = guesses.length;
  
  // Calculate distribution
  const green = guesses.filter(g => g.rank <= 300).length;
  const yellow = guesses.filter(g => g.rank > 300 && g.rank <= 1500).length;
  const red = guesses.filter(g => g.rank > 1500).length;

  const shareText = `CodeHunt 3.0 — Guess the Word\nI found it in ${total} guesses (${hints} hints)\n🟩🟩 ${green}\n🟨🟨 ${yellow}\n🟥🟥 ${red}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#111] border border-white/10 p-8 rounded-xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-foreground/50 hover:text-white">
            <X size={24} />
          </button>
          
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl uppercase text-accent-gold mb-2">You found it!</h2>
            <p className="text-foreground/80">
              Score: <span className="font-bold text-off-white">{total + hints}</span> (Guesses: {total} + Hints: {hints})
            </p>
          </div>

          <div className="bg-black/50 p-6 rounded-lg mb-8 border border-white/5 font-mono text-sm whitespace-pre-line text-center">
            {shareText}
          </div>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-4 bg-accent-blue text-white font-bold rounded-lg hover:bg-accent-blue/90 transition-colors mb-12"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? "Copied to Clipboard!" : "Share Result"}
          </button>

          {/* Leaderboard Form & List Mock */}
          <Leaderboard score={total + hints} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
