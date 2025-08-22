
import { crossoverData } from './crossoverData';

export type Team = {
  name: string;
  label: string;
  logoUrl: string;
};

function getUniqueTeams(): string[] {
  const allTeams = new Set<string>();
  for (const player in crossoverData) {
    const teams = crossoverData[player as keyof typeof crossoverData];
    if (Array.isArray(teams)) {
      teams.forEach(team => allTeams.add(team));
    }
  }
  return Array.from(allTeams);
}


function selectRandomTeams(teams: string[], count: number, exclude: string[] = []): Team[] {
  const availableTeams = teams.filter(t => !exclude.includes(t));
  const shuffled = [...availableTeams].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(teamName => ({
    name: teamName,
    label: teamName,
    logoUrl: `https://placehold.co/100x100.png`,
  }));
}


const uniqueTeams = getUniqueTeams();

export function getTeams() {
  const rowTeams = selectRandomTeams(uniqueTeams, 3);
  const colTeams = selectRandomTeams(uniqueTeams, 3, rowTeams.map(t => t.name));
  
  return {
    rowTeams,
    colTeams,
  };
}
