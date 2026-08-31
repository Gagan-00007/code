export type EmbeddingMap = Record<string, number[]>;

export function normalize(vec: number[]): number[] {
  const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
  return norm === 0 ? vec : vec.map((v) => v / norm);
}

export function cosineSim(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

/**
 * Returns the full word list ranked by similarity to `targetWord`,
 * closest (rank 1) first. Call once per game session and cache the result
 * (e.g. in session/local state) — don't recompute on every guess.
 */
export function getRankedListForTarget(embeddings: EmbeddingMap, targetWord: string): string[] {
  const target = targetWord.toLowerCase();
  
  if (!embeddings[target]) {
    throw new Error(`No embedding found for target word: ${target}`);
  }

  const words = Object.keys(embeddings);
  const targetVec = normalize(embeddings[target]);

  const sims = words.map((w) => {
    const wordVec = normalize(embeddings[w]);
    return {
      word: w,
      sim: cosineSim(wordVec, targetVec),
    };
  });
  
  sims.sort((a, b) => b.sim - a.sim);
  return sims.map((s) => s.word); // index 0 === rank 1 === the target itself
}

/**
 * Given a precomputed ranked list (from getRankedListForTarget), returns the
 * 1-based rank of a guessed word, or null if the word isn't in the dictionary.
 */
export function getRankOfGuess(rankedList: string[], guess: string): number | null {
  const idx = rankedList.indexOf(guess.toLowerCase());
  return idx === -1 ? null : idx + 1;
}
