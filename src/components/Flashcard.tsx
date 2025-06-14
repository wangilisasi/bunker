"use client";

import { useState, useEffect } from "react";

const animations = ["flip-horizontal", "flip-vertical", "fade-slide"] as const;
type AnimationStyle = (typeof animations)[number];

// These components now only define the *look* of the card, not its positioning.
const FrontCard = ({ question }: { question: string }) => (
  <div className="w-full h-full bg-black/20 backdrop-blur-lg border-2 border-white/30 group-hover:border-white/50 rounded-3xl transition-all duration-500 flex items-center justify-center p-8 sm:p-10">
    <div className="relative text-center w-full h-full flex items-center justify-center">
      <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
        {question}
      </h2>
      <div className="absolute bottom-4 right-4">
        <div className="px-4 py-2 bg-transparent border border-white/40 rounded-full text-white/70 text-xs uppercase tracking-widest group-hover:bg-white/10 transition-all">
          Click to reveal
        </div>
      </div>
    </div>
  </div>
);

const BackCard = ({ answer }: { answer: string }) => (
  <div className="w-full h-full bg-black/20 backdrop-blur-lg border-2 border-white/30 group-hover:border-white/50 rounded-3xl transition-all duration-500 flex items-center justify-center p-8 sm:p-10">
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
  </div>
);

interface FlashcardProps {
  question: string;
  answer: string;
}

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animationStyle, setAnimationStyle] = useState<AnimationStyle>("flip-horizontal");

  useEffect(() => {
    setAnimationStyle(animations[Math.floor(Math.random() * animations.length)]);
  }, [question]);

  const handleFlip = () => setIsFlipped(!isFlipped);

  // The main container sets the size for all animation types
  return (
    <div
      className="group w-full max-w-3xl mx-auto cursor-pointer"
      onClick={handleFlip}
    >
      <div className="relative w-full h-80 sm:h-96">
        {animationStyle === "fade-slide" ? (
          <>
            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                isFlipped
                  ? "opacity-0 transform -translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              <FrontCard question={question} />
            </div>
            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                isFlipped
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-4"
              }`}
            >
              <BackCard answer={answer} />
            </div>
          </>
        ) : (
          <div
            className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped
                ? animationStyle === "flip-horizontal"
                  ? "rotate-y-180"
                  : "rotate-x-180"
                : ""
            }`}
          >
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <FrontCard question={question} />
            </div>
            <div
              className={`absolute inset-0 w-full h-full backface-hidden ${
                animationStyle === "flip-horizontal"
                  ? "rotate-y-180"
                  : "rotate-x-180"
              }`}
            >
              <BackCard answer={answer} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 