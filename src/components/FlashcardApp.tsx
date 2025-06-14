"use client";

import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import { bunkerValentineFlashcards } from "../data/flashcards";

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
  const progress = (usedIndices.length / bunkerValentineFlashcards.length) * 100;

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: "url(/valentine.jpg)" }}
      />
      <div className="fixed inset-0 w-full h-full bg-black/50 -z-10" />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-3xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white shadow-lg">
              Bunker Valentin
            </h1>
          </div>

          {/* Flashcard */}
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

          {/* Controls and Progress */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto">
              <div className="flex justify-between text-sm text-slate-200 mb-2">
                <span>Progress</span>
                <span>
                  {usedIndices.length} / {bunkerValentineFlashcards.length}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button
                onClick={getNextRandomCard}
                disabled={isAnimating}
                className="w-full sm:w-52 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Next Card
              </button>

              <button
                onClick={resetProgress}
                disabled={isAnimating}
                className="w-full sm:w-52 px-8 py-4 bg-transparent border-2 border-slate-300/50 text-white/80 font-bold rounded-full hover:bg-white/10 hover:border-white/80 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset Progress
              </button>
            </div>

            {/* Stats */}
            <div className="text-center text-slate-300 pt-2">
              <p className="text-sm transition-opacity duration-300">
                {usedIndices.length === bunkerValentineFlashcards.length
                  ? "🎉 Congratulations! You've completed all flashcards!"
                  : `${
                      bunkerValentineFlashcards.length - usedIndices.length
                    } cards remaining`}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 