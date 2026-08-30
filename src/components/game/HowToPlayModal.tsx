import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function HowToPlayModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-[#111] border border-white/10 p-8 rounded-xl max-w-lg w-full shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-foreground/50 hover:text-white">
              <X size={24} />
            </button>
            <h2 className="font-display text-3xl uppercase text-off-white mb-6">How to play</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>Find the secret word. You have unlimited guesses.</p>
              <p>The words were sorted by an artificial intelligence algorithm according to how similar they were to the secret word.</p>
              <p>After submitting a word, you will see its position. The secret word is number 1.</p>
              <p>The algorithm analyzed thousands of texts. It uses the context in which words are used to calculate the similarity between them.</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
