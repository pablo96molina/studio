import { CrossoverGrid } from "@/components/crossover-grid";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Crossover XI
        </h1>
        <p className="text-center text-muted-foreground max-w-md mx-auto">
          Challenge your football knowledge. For each cell, guess a player who has played for both intersecting teams.
        </p>
      </div>
      <CrossoverGrid />
    </main>
  );
}
