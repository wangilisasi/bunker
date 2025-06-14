"use client";

import { useState } from "react";

interface FlashcardProps {
  question: string;
  answer: string;
}

const CardFace = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full h-full border-2 border-white/30 group-hover:border-white/50 rounded-3xl p-8 sm:p-10 overflow-hidden transition-all duration-500 backdrop-blur-md bg-black/20">
    {/* Content */}
    <div className="relative w-full h-full flex items-center justify-center">
      {children}
    </div>
  </div>
);

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="group w-full max-w-3xl mx-auto cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-80 sm:h-96 transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-x-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <CardFace>
            <div className="relative text-center w-full h-full flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-relaxed font-[family-name:var(--font-inter)]">
                {question}
              </h2>
              <div className="absolute bottom-4 right-4">
                <div className="px-4 py-2 bg-transparent border border-white/40 rounded-full text-white/70 text-xs uppercase tracking-widest group-hover:bg-white/10 transition-all font-[family-name:var(--font-inter)]">
                  Click to reveal
                </div>
              </div>
            </div>
          </CardFace>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-x-180">
          <CardFace>
            <div className="relative text-center w-full h-full flex flex-col items-center justify-center">
              <div className="absolute top-4 left-4">
                <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs font-semibold uppercase tracking-widest">
                  Answer
                </div>
              </div>
              <p className="text-white text-2xl md:text-3xl leading-relaxed font-[family-name:var(--font-geist-mono)]">
                {answer}
              </p>
            </div>
          </CardFace>
        </div>
      </div>
    </div>
  );
} 