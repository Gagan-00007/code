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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsSubmitting(true);
      setErrorMessage("");
      
      try {
        // You can replace this URL with your actual Google Apps Script URL for the game scores
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxn1gBSDXBzL1UozLqFjWNrL7syw5qoFXMSwqnVccZ7D6Y5MmJQ0qm3JWKMLUWhYO0qWg/exec"; 
        
        const payload = {
          type: "game_score", // Added a type to distinguish from registration if using the same sheet
          name: name,
          email: email,
          score: score
        };

        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(payload),
        });

        setSubmitted(true);
      } catch (error: any) {
        console.error("Submission error:", error);
        setErrorMessage("Failed to submit score. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
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
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded text-sm text-center">
              {errorMessage}
            </div>
          )}
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
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-accent-gold text-background font-bold py-3 rounded hover:bg-accent-gold/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isSubmitting ? "Submitting..." : "Submit Score"}
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
