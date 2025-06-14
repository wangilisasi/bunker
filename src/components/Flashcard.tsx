"use client";

import { useState, useEffect } from "react";

const animations = ["flip-horizontal", "flip-vertical", "fade-slide"] as const;
type AnimationStyle = (typeof animations)[number];

// These components now only define the *look* of the card, not its positioning.
const FrontCard = ({ question }: { question: string }) => (
  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-xl shadow-blue-500/20 group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500 flex items-center justify-center p-8 sm:p-10">
    <div className="relative text-center w-full h-full flex items-center justify-center">
      <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
        {question}
      </h2>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-widest">
        Click to reveal
      </div>
    </div>
  </div>
);

const BackCard = ({ answer }: { answer: string }) => (
  <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl shadow-xl shadow-emerald-500/20 group-hover:shadow-2xl group-hover:shadow-green-500/20 transition-all duration-500 flex items-center justify-center p-8 sm:p-10">
    <div className="relative text-center w-full h-full flex flex-col items-center justify-center">
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