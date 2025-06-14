import BunkerValentinTimeline from "../../components/BunkerValentinTimeline";

export default function TimelinePage() {
  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: "url(/valentine.jpg)" }}
      />
      <div className="fixed inset-0 w-full h-full bg-black/50 -z-10" />
      
      <main className="min-h-screen">
        {/* Header */}
        <div className="text-center pt-16 pb-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white shadow-lg font-[family-name:var(--font-dancing-script)] tracking-wide">
            Bunker Valentin Timeline
          </h1>
        </div>

        {/* Timeline Component */}
        <div className="relative z-10">
          <BunkerValentinTimeline />
        </div>
      </main>
    </>
  );
} 