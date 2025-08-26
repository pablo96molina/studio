import { CrossoverGrid } from "@/components/crossover-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTeams } from "@/lib/teams";

export default function Home() {
  const { rowTeams, colTeams } = getTeams();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative">
      <nav className="absolute top-4 right-4 flex gap-2">
        <Button asChild variant="ghost">
          <Link href="/stats">Stats</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/admin">Admin</Link>
        </Button>
      </nav>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Fútbol Grid
        </h1>
        <p className="text-center text-muted-foreground max-w-md mx-auto">
          Challenge your football knowledge. For each cell, guess a player who has played for both intersecting teams.
        </p>
      </div>
      <CrossoverGrid rowTeams={rowTeams} colTeams={colTeams} />
    </main>
  );
}
