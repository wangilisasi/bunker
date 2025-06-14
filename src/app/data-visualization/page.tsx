import BunkerValentinDashboard from "@/components/BunkerValentinDashboard";
import Link from "next/link";

export default function DataVisualizationPage() {
  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: "url(/valentine.jpg)" }}
      />
      <div className="fixed inset-0 w-full h-full bg-black/50 -z-10" />
      
      <main className="min-h-screen p-4 sm:p-6 md:p-12">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white shadow-lg mb-4 font-[family-name:var(--font-dancing-script)] tracking-wide">
              Data Dashboard
            </h1>
            <p className="text-xl text-white/80 font-[family-name:var(--font-inter)] max-w-3xl mx-auto">
              Exploring the numbers behind Bunker Valentin&apos;s history through charts and key metrics.
            </p>
          </div>

          {/* Visualization Dashboard Component */}
          <div className="backdrop-blur-md bg-black/20 border-2 border-white/30 rounded-3xl p-2 sm:p-4">
            <BunkerValentinDashboard />
          </div>

          {/* Navigation */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/90 text-white/90 font-bold rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 ease-in-out font-[family-name:var(--font-inter)]"
            >
              ← Back to Flashcards
            </Link>
          </div>
        </div>
      </main>
    </>
  );
} 