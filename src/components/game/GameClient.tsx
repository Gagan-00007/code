"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Lightbulb, HelpCircle, Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import wordRanksData from "@/lib/word-ranks.json";
import HowToPlayModal from "./HowToPlayModal";
import ShareResult from "./ShareResult";

const wordRanks = wordRanksData as Record<string, number>;

type Guess = {
  word: string;
  rank: number;
};

export default function GameClient() {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [input, setInput] = useState("");
  const [isWon, setIsWon] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const maxRank = useMemo(() => Object.keys(wordRanks).length, []);

  const rankToWord = useMemo(() => {
    const map = new Map<number, string>();
    for (const [word, rank] of Object.entries(wordRanks)) {
      map.set(rank, word);
    }
    return map;
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const word = input.trim().toLowerCase();
    if (!word) return;

    if (guesses.some((g) => g.word === word)) {
      setInput("");
      return; // Already guessed
    }

    // Determine rank
    const rank = wordRanks[word];
    if (rank === undefined) {
      setErrorMsg("I don't know this word.");
      setTimeout(() => setErrorMsg(""), 2000);
      return;
    }
    
    const newGuesses = [...guesses, { word, rank }];
    setGuesses(newGuesses);
    setInput("");

    if (rank === 1) {
      setIsWon(true);
      setShowShare(true);
    }
  };

  const handleHint = () => {
    if (isWon) return;
    
    const guessedWords = new Set(guesses.map((g) => g.word));
    
    let targetRank = 300; // Default hint if no guesses
    if (guesses.length > 0) {
      const bestRank = Math.min(...guesses.map(g => g.rank));
      targetRank = Math.max(2, Math.floor(bestRank / 2));
    }

    let hintWord = "";
    let hintRank = 0;
    let offset = 0;
    
    while (offset < maxRank) {
      // Check lower rank first (closer to answer)
      const lowerRank = targetRank - offset;
      if (lowerRank >= 2 && rankToWord.has(lowerRank)) {
        const word = rankToWord.get(lowerRank)!;
        if (!guessedWords.has(word)) {
          hintWord = word;
          hintRank = lowerRank;
          break;
        }
      }
      
      // Check higher rank
      const upperRank = targetRank + offset;
      if (upperRank <= maxRank && rankToWord.has(upperRank)) {
        const word = rankToWord.get(upperRank)!;
        if (!guessedWords.has(word)) {
          hintWord = word;
          hintRank = upperRank;
          break;
        }
      }
      offset++;
    }

    if (hintWord) {
      setHintsUsed((prev) => prev + 1);
      setGuesses((prev) => [...prev, { word: hintWord, rank: hintRank }]);
      
      const currentBest = guesses.length > 0 ? Math.min(...guesses.map(g => g.rank)) : 300;
      if (hintRank > currentBest) {
        setInfoMsg("Revealing missed words...");
        setTimeout(() => setInfoMsg(""), 3000);
      }
    }
  };

  // Sort guesses closest to 1 at top
  const sortedGuesses = [...guesses].sort((a, b) => a.rank - b.rank);

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-green-500 border-green-400";
    if (rank <= 150) return "bg-green-500/20 border-green-500/50";
    if (rank <= 1500) return "bg-yellow-500/20 border-yellow-500/50";
    return "bg-red-500/20 border-red-500/50";
  };

  const getRankBarWidth = (rank: number) => {
    if (rank === 1) return "100%";
    const percentage = Math.max(5, 100 - (rank / maxRank) * 100);
    return `${percentage}%`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-foreground/50 hover:text-accent-gold transition-colors flex items-center gap-2">
            <ArrowLeft size={20} /> Home
          </Link>
          <div className="flex gap-4">
            <button onClick={() => setShowHowToPlay(true)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <HelpCircle size={24} />
            </button>
            {isWon && (
              <button onClick={() => setShowShare(true)} className="p-2 text-accent-gold hover:bg-white/5 rounded-full transition-colors">
                <Trophy size={24} />
              </button>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display text-5xl uppercase text-off-white mb-2">Guess the Word</h1>
          <p className="text-foreground/60 mb-6">Find the secret word. Unlimited guesses.</p>
          
          <div className="flex justify-center gap-8 text-lg font-bold">
            <div className="flex flex-col items-center">
              <span className="text-3xl text-off-white">{guesses.length}</span>
              <span className="text-xs uppercase tracking-widest text-foreground/50">Guesses</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl text-off-white">{hintsUsed}</span>
              <span className="text-xs uppercase tracking-widest text-foreground/50">Hints</span>
            </div>
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleGuess} className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isWon}
            placeholder={isWon ? "You found it!" : "Type a word and press enter"}
            className={`w-full bg-white/5 border rounded-lg py-4 pl-12 pr-4 text-lg text-off-white focus:outline-none transition-colors disabled:opacity-50 ${errorMsg ? 'border-red-500' : 'border-white/10 focus:border-accent-gold'}`}
            autoFocus
          />
          <AnimatePresence>
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 -bottom-8 text-red-500 text-sm font-bold"
              >
                {errorMsg}
              </motion.div>
            )}
            {infoMsg && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 -bottom-8 text-accent-blue text-sm font-bold"
              >
                {infoMsg}
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleHint}
            disabled={isWon}
            className="flex items-center gap-2 text-sm text-accent-blue hover:text-accent-blue/80 disabled:opacity-50 transition-colors font-bold uppercase tracking-wider"
          >
            <Lightbulb size={16} /> Get Hint
          </button>
        </div>

        {/* Guesses List */}
        <div className="space-y-3">
          <AnimatePresence>
            {sortedGuesses.map((g) => (
              <motion.div
                key={g.word}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative overflow-hidden border rounded-lg p-4 flex justify-between items-center ${getRankColor(g.rank)}`}
              >
                {/* Progress Bar Background */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-white/10 -z-10 transition-all duration-1000"
                  style={{ width: getRankBarWidth(g.rank) }}
                />
                
                <span className="font-bold text-lg capitalize">{g.word}</span>
                <span className="font-display tracking-wider text-xl">{g.rank}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
      <ShareResult isOpen={showShare} onClose={() => setShowShare(false)} guesses={guesses} hints={hintsUsed} />
    </div>
  );
}
