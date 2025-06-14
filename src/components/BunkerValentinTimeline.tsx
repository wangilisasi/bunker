'use client';

import { useState } from 'react';
import Link from 'next/link';

const timelineData = [
  {
    year: "1943",
    title: "Construction Begins",
    description:
      "The German Navy begins construction of a massive, bomb-proof U-boat shipyard. From summer 1943, around 8,000 forced laborers work on the site daily under horrific conditions.",
  },
  {
    year: "1945 (March-April)",
    title: "Construction Abandoned",
    description:
      "Allied bombing raids damage the bunker. Construction is abandoned when the site is ~80% complete. The Nazis organize 'death marches' to evacuate prisoners from the camps.",
  },
  {
    year: "1945 (May)",
    title: "Liberation",
    description:
      "British troops occupy North Bremen and the bunker site. They find two almost empty camps and the monstrous, abandoned construction site, initially unaware of the full scale of the slave labor.",
  },
  {
    year: "1960-2010",
    title: "Military Depot",
    description:
      "The West German Navy (Bundeswehr) takes over the bunker, using it as a materials depot for 50 years. During the Cold War, its location is erased from maps and there is no commemoration of the victims.",
  },
  {
    year: "1983",
    title: "First Commemoration",
    description:
      "As public consciousness grows, a monument is officially unveiled outside the bunker in a ceremony attended by former slave laborers and representatives of Bremen civil society.",
  },
  {
    year: "2010",
    title: "End of Military Use",
    description:
      "The German armed forces officially leave the bunker on December 31, 2010, transferring the building to the Institute for Federal Real Estate and paving the way for a memorial.",
  },
  {
    year: "2015",
    title: "Memorial Opens",
    description:
      "The 'Denkort Bunker Valentin' officially opens as a memorial and information center, finally recognizing the site's history and its victims after almost 70 years.",
  },
];

export default function BunkerValentinTimeline() {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(0);

  const handleEventClick = (index: number) => {
    setSelectedEventIndex(index);
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-white/30 h-full md:block hidden"></div>
          
          {/* Mobile Timeline Line */}
          <div className="absolute left-8 w-0.5 bg-white/30 h-full md:hidden block"></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineData.map((event, index) => {
              const isSelected = selectedEventIndex === index;
              const isLeft = index % 2 === 0; // Alternate sides on desktop

              return (
                <div key={index} className="relative">
                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-start">
                    {/* Left Side Event */}
                    {isLeft ? (
                      <div className="w-1/2 pr-8">
                        <div
                          className={`backdrop-blur-md bg-black/20 p-6 rounded-lg cursor-pointer transition-all duration-300 hover:bg-black/30 border-2 ${
                            isSelected ? 'border-yellow-400/60 bg-black/30' : 'border-white/30'
                          }`}
                        >
                          <div className="text-right">
                            <div className="text-yellow-400 text-lg font-bold mb-2 font-[family-name:var(--font-inter)] tracking-wide">
                              {event.year}
                            </div>
                            <h3
                              className="text-white text-xl font-bold mb-3 hover:text-yellow-300 transition-colors font-[family-name:var(--font-inter)]"
                              onClick={() => handleEventClick(index)}
                            >
                              {event.title}
                            </h3>
                            {isSelected && (
                              <p className="text-white/80 text-sm leading-relaxed animate-in fade-in duration-300 font-[family-name:var(--font-inter)]">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-1/2 pr-8"></div>
                    )}

                    {/* Timeline Node */}
                    <div className="relative z-10 flex items-center justify-center flex-shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border-4 transition-all duration-300 ${
                          isSelected
                            ? 'bg-yellow-400 border-yellow-300 scale-125'
                            : 'bg-white/40 border-white/60'
                        }`}
                      ></div>
                    </div>

                    {/* Right Side Event */}
                    {!isLeft ? (
                      <div className="w-1/2 pl-8">
                        <div
                          className={`backdrop-blur-md bg-black/20 p-6 rounded-lg cursor-pointer transition-all duration-300 hover:bg-black/30 border-2 ${
                            isSelected ? 'border-yellow-400/60 bg-black/30' : 'border-white/30'
                          }`}
                        >
                          <div className="text-left">
                            <div className="text-yellow-400 text-lg font-bold mb-2 font-[family-name:var(--font-inter)] tracking-wide">
                              {event.year}
                            </div>
                            <h3
                              className="text-white text-xl font-bold mb-3 hover:text-yellow-300 transition-colors font-[family-name:var(--font-inter)]"
                              onClick={() => handleEventClick(index)}
                            >
                              {event.title}
                            </h3>
                            {isSelected && (
                              <p className="text-white/80 text-sm leading-relaxed animate-in fade-in duration-300 font-[family-name:var(--font-inter)]">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-1/2 pl-8"></div>
                    )}
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden flex items-start">
                    {/* Timeline Node */}
                    <div className="relative z-10 flex items-center justify-center mr-6 flex-shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border-4 transition-all duration-300 ${
                          isSelected
                            ? 'bg-yellow-400 border-yellow-300 scale-125'
                            : 'bg-white/40 border-white/60'
                        }`}
                      ></div>
                    </div>

                    {/* Event Card */}
                    <div className="flex-1">
                      <div
                        className={`backdrop-blur-md bg-black/20 p-6 rounded-lg cursor-pointer transition-all duration-300 hover:bg-black/30 border-2 ${
                          isSelected ? 'border-yellow-400/60 bg-black/30' : 'border-white/30'
                        }`}
                      >
                        <div className="text-yellow-400 text-lg font-bold mb-2 font-[family-name:var(--font-inter)] tracking-wide">
                          {event.year}
                        </div>
                        <h3
                          className="text-white text-xl font-bold mb-3 hover:text-yellow-300 transition-colors font-[family-name:var(--font-inter)]"
                          onClick={() => handleEventClick(index)}
                        >
                          {event.title}
                        </h3>
                        {isSelected && (
                          <p className="text-white/80 text-sm leading-relaxed animate-in fade-in duration-300 font-[family-name:var(--font-inter)]">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Button */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/90 text-white/90 font-bold rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 ease-in-out font-[family-name:var(--font-inter)]"
          >
            ← Back to Flashcards
          </Link>
        </div>
      </div>
    </div>
  );
} 