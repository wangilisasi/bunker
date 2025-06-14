"use client";

import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import { bunkerValentineFlashcards } from "../data/flashcards";

const NextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ResetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>
);

export default function FlashcardApp() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize with a random card
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * bunkerValentineFlashcards.length);
    setCurrentCardIndex(randomIndex);
    setUsedIndices([randomIndex]);
  }, []);

  const getNextRandomCard = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // If we've used all cards, reset
    if (usedIndices.length === bunkerValentineFlashcards.length) {
      setUsedIndices([]);
    }
    
    let availableIndices = bunkerValentineFlashcards
      .map((_, index) => index)
      .filter(index => !usedIndices.includes(index));
    
    // If no available indices, use all indices
    if (availableIndices.length === 0) {
      availableIndices = bunkerValentineFlashcards.map((_, index) => index);
    }
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    
    setTimeout(() => {
      setCurrentCardIndex(randomIndex);
      setUsedIndices(prev => [...prev, randomIndex]);
      setIsAnimating(false);
    }, 150);
  };

  const resetProgress = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const randomIndex = Math.floor(Math.random() * bunkerValentineFlashcards.length);
    
    setTimeout(() => {
      setCurrentCardIndex(randomIndex);
      setUsedIndices([randomIndex]);
      setIsAnimating(false);
    }, 150);
  };

  const currentCard = bunkerValentineFlashcards[currentCardIndex];

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: "url(/valentine.jpg)" }}
      />
      <div className="fixed inset-0 w-full h-full bg-black/50 -z-10" />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white shadow-lg">
              Bunker Valentin
            </h1>
          </div>

          {/* Main Content Area */}
          <div className="w-full flex items-center justify-center gap-4 lg:gap-8">
            {/* Left Button (Desktop) */}
            <div className="hidden lg:block">
              <button
                onClick={resetProgress}
                disabled={isAnimating}
                aria-label="Reset progress"
                className="w-20 h-20 flex items-center justify-center bg-transparent border-2 border-slate-300/50 text-white/80 rounded-full hover:bg-white/10 hover:border-white/80 transition-all duration-300 ease-in-out disabled:opacity-50"
              >
                <ResetIcon />
              </button>
            </div>

            {/* Flashcard */}
            <div className="w-full max-w-3xl">
              <div
                className={`transition-all duration-300 ${
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                <Flashcard
                  key={currentCardIndex}
                  question={currentCard?.question || ""}
                  answer={currentCard?.answer || ""}
                />
              </div>
            </div>

            {/* Right Button (Desktop) */}
            <div className="hidden lg:block">
              <button
                onClick={getNextRandomCard}
                disabled={isAnimating}
                aria-label="Next card"
                className="w-20 h-20 flex items-center justify-center bg-transparent border-2 border-white/90 text-white/90 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 ease-in-out disabled:opacity-50"
              >
                <NextIcon />
              </button>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="lg:hidden w-full mt-10">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={getNextRandomCard}
                disabled={isAnimating}
                className="w-full sm:w-52 px-8 py-4 bg-transparent border-2 border-white/90 text-white/90 font-bold rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 ease-in-out disabled:opacity-50"
              >
                Next Card
              </button>

              <button
                onClick={resetProgress}
                disabled={isAnimating}
                className="w-full sm:w-52 px-8 py-4 bg-transparent border-2 border-slate-300/50 text-white/80 font-bold rounded-full hover:bg-white/10 hover:border-white/80 transition-all duration-300 ease-in-out disabled:opacity-50"
              >
                Reset Progress
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center text-slate-300 pt-2 h-6 flex items-center justify-center">
            {usedIndices.length === bunkerValentineFlashcards.length && (
              <p className="text-sm transition-opacity duration-300 animate-in fade-in">
                🎉 Congratulations! You&apos;ve completed all flashcards!
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 