'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

interface QuoteData {
  quote: string;
  author: string;
}

export default function QuoteRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const quotes: QuoteData[] = [
    { quote: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { quote: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
    { quote: "Truth can only be found in one place: the code.", author: "Robert C. Martin" },
    { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { quote: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { quote: "Fix the cause, not the symptom.", author: "Steve Maguire" },
    { quote: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { quote: "The most damaging phrase in the language is.. it's always been done this way", author: "Grace Hopper" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentIndex];

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl relative overflow-hidden h-full flex flex-col justify-center">
      <Quote className="absolute top-4 left-4 text-purple-500/20 w-12 h-12" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <p className="text-xl md:text-2xl text-zinc-300 font-light italic mb-6 leading-relaxed">
            &quot;{currentQuote.quote}&quot;
          </p>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-purple-500" />
            <span className="text-purple-400 font-medium">
              {currentQuote.author}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
