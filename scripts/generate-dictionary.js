import fs from 'fs';
import path from 'path';

const SECRET_WORD = 'quest';
const API_URL = `https://api.datamuse.com/words?ml=${SECRET_WORD}&max=1000`;

async function generateDictionary() {
  console.log(`Fetching semantic related words for "${SECRET_WORD}"...`);
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    // Datamuse returns words sorted by score (highest score = most related).
    // We will build a dictionary where the key is the word, and value is its rank.
    // Secret word is always rank 1.
    const ranks = {
      [SECRET_WORD]: 1
    };

    let currentRank = 2;
    for (const item of data) {
      const word = item.word.toLowerCase();
      // Skip the secret word if it appears in the results, and avoid multi-word phrases for simplicity.
      if (word !== SECRET_WORD && !word.includes(' ')) {
        // Also avoid words that are just the secret word + 's' etc to make it fair.
        ranks[word] = currentRank++;
      }
    }

    const outputPath = path.join(process.cwd(), 'src', 'lib', 'word-ranks.json');
    // Ensure lib directory exists
    const libDir = path.dirname(outputPath);
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(ranks, null, 2));
    console.log(`Successfully generated word-ranks.json with ${Object.keys(ranks).length} words!`);
  } catch (error) {
    console.error("Error generating dictionary:", error);
  }
}

generateDictionary();
