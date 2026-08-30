import json
import os
import sys

# We check if gensim is installed; if not, we instruct how to run this.
try:
    import gensim.downloader as api
except ImportError:
    print("Please install gensim: pip install gensim")
    sys.exit(1)

SECRET_WORD = "quest"
VOCAB_SIZE = 30000

def main():
    print("Loading GloVe 50d embeddings (this may take a minute if downloading for the first time)...")
    # glove-wiki-gigaword-50 contains 400,000 words. It's ~66MB.
    model = api.load("glove-wiki-gigaword-50")
    print("Model loaded successfully.")

    if SECRET_WORD not in model.key_to_index:
        print(f"Error: Secret word '{SECRET_WORD}' not found in GloVe vocabulary.")
        sys.exit(1)

    print(f"Calculating cosine similarity for the top {VOCAB_SIZE} words against '{SECRET_WORD}'...")
    
    # Get the top N most frequent words from the model
    # gensim's index_to_key is ordered by frequency (most frequent first)
    vocab = model.index_to_key[:VOCAB_SIZE]

    # Calculate similarity for each word
    similarities = []
    for word in vocab:
        # Ignore punctuation/weird tokens and single letters (except 'a', 'i')
        if not word.isalpha():
            continue
        if len(word) == 1 and word not in ["a", "i"]:
            continue
            
        sim = model.similarity(SECRET_WORD, word)
        similarities.append((word, sim))

    # Sort descending by similarity
    similarities.sort(key=lambda x: x[1], reverse=True)

    # Build the rank table (Rank 1 is the secret word)
    # Note: the secret word will naturally have similarity 1.0 and be at the very top.
    rank_table = {}
    current_rank = 1
    
    for word, sim in similarities:
        # Avoid duplicate variants if we want to be strict, but keeping it simple.
        rank_table[word] = current_rank
        current_rank += 1

    # Ensure secret word is rank 1 just in case
    rank_table[SECRET_WORD] = 1

    # Output to the next.js lib folder
    out_path = os.path.join(os.path.dirname(__file__), "..", "src", "lib", "word-ranks.json")
    out_path = os.path.abspath(out_path)
    
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(rank_table, f, indent=2)
        
    print(f"Successfully wrote {len(rank_table)} ranked words to {out_path}.")
    print(f"Rank 1: {SECRET_WORD}")
    print("Top 10 closest words:")
    for i in range(10):
        if i < len(similarities):
            print(f"  {i+1}. {similarities[i][0]} (sim: {similarities[i][1]:.4f})")

if __name__ == "__main__":
    main()
