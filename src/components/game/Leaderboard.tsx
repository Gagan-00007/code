import { useState } from "react";

type LeaderboardProps = {
  score: number;
};

// Mock data
const mockLeaderboard = [
  { name: "Alex Turing", score: 12 },
  { name: "Team Syntax", score: 18 },
  { name: "Sarah J.", score: 24 },
  { name: "CodeNinja", score: 45 },
];

export default function Leaderboard({ score }: LeaderboardProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      <h3 className="font-display text-2xl uppercase text-off-white mb-2 text-center border-t border-white/10 pt-8">
        Submit to Leaderboard
      </h3>
      <p className="text-center text-foreground/70 mb-6 text-sm">Your score: {score}</p>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-1">Name / Team Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 focus:border-accent-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-1">Email or Phone</label>
            <input 
              required
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 focus:border-accent-gold focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-accent-gold text-background font-bold py-3 rounded hover:bg-accent-gold/90 transition-colors">
            Submit Score
          </button>
        </form>
      ) : (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-lg text-center font-bold mb-10">
          Score submitted! We will contact you if you win.
        </div>
      )}

      <h4 className="font-bold text-sm uppercase tracking-widest text-foreground/50 mb-4 text-center">Top Players</h4>
      <div className="space-y-2">
        {mockLeaderboard.map((player, idx) => (
          <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded">
            <span className="font-bold">
              <span className="text-accent-gold mr-3">#{idx + 1}</span> {player.name}
            </span>
            <span className="text-off-white font-mono">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
