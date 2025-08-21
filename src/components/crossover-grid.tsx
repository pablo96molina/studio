import { getTeams } from "@/lib/teams";
import { GridCell } from "./grid-cell";
import Image from "next/image";

export function CrossoverGrid() {
  const { rowTeams, colTeams } = getTeams();

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 p-2 max-w-4xl mx-auto w-full border border-border rounded-xl shadow-lg bg-card/50">
      <div />
      {colTeams.map((team) => (
        <div
          key={team.name}
          className="flex items-center justify-center p-2 rounded-lg aspect-square"
        >
          <Image
            src={team.logoUrl}
            alt={`${team.name} logo`}
            width={64}
            height={64}
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
            data-ai-hint={`${team.name} logo`}
          />
        </div>
      ))}

      {rowTeams.flatMap((rowTeam) => [
        <div
          key={rowTeam.name}
          className="flex items-center justify-center p-2 rounded-lg aspect-square"
        >
          <Image
            src={rowTeam.logoUrl}
            alt={`${rowTeam.name} logo`}
            width={64}
            height={64}
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
            data-ai-hint={`${rowTeam.name} logo`}
          />
        </div>,
        ...colTeams.map((colTeam) => (
          <div
            key={`${rowTeam.name}-${colTeam.name}`}
            className="bg-card rounded-lg aspect-square shadow-inner"
          >
            <GridCell rowTeam={rowTeam} colTeam={colTeam} />
          </div>
        )),
      ])}
    </div>
  );
}
