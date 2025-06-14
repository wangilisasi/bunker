"use client";

import { useState } from "react";

interface FlashcardProps {
  question: string;
  answer: string;
}

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="group perspective-1000 w-full max-w-3xl mx-auto">
      <div
        className={`relative w-full h-80 sm:h-96 cursor-pointer transition-all duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={handleFlip}
      >
        {/* Front of card (Question) */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-xl shadow-blue-500/20 group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500 flex items-center justify-center p-8 sm:p-10">
          <div className="text-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
              {question}
            </h2>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-widest">
              Click to reveal
            </div>
          </div>
        </div>

        {/* Back of card (Answer) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl shadow-xl shadow-emerald-500/20 group-hover:shadow-2xl group-hover:shadow-green-500/20 transition-all duration-500 flex items-center justify-center p-8 sm:p-10">
          <div className="text-center">
            <div className="text-emerald-200 text-sm font-medium mb-4 uppercase tracking-wider">
              Answer
            </div>
            <p className="text-white text-2xl md:text-3xl leading-relaxed font-[family-name:var(--font-geist-mono)]">
              {answer}
            </p>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-widest">
              Click to go back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 