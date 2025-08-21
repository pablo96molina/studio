
import { crossoverData } from './crossoverData';

export type Team = {
  name: string;
  label: string;
  logoUrl: string;
};

function getUniqueTeams(): string[] {
  const allTeams = new Set<string>();
  for (const player in crossoverData) {
    const teamsOrPlayers = crossoverData[player as keyof typeof crossoverData];
    if (Array.isArray(teamsOrPlayers)) {
      teamsOrPlayers.forEach(team => allTeams.add(team));
    } else {
        // This handles the nested object structure seen in the first entry
        for (const subPlayer in teamsOrPlayers) {
            const teams = teamsOrPlayers[subPlayer as keyof typeof teamsOrPlayers];
            if(Array.isArray(teams)) {
                teams.forEach(team => allTeams.add(team));
            }
        }
    }
  }
  return Array.from(allTeams);
}


function selectRandomTeams(teams: string[], count: number): Team[] {
  const shuffled = [...teams].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(teamName => ({
    name: teamName,
    label: teamName,
    logoUrl: `https://placehold.co/100x100.png`,
  }));
}


const uniqueTeams = getUniqueTeams();

export function getTeams() {
  const rowTeams = selectRandomTeams(uniqueTeams, 3);
  const colTeams = selectRandomTeams(uniqueTeams.filter(t => !rowTeams.some(rt => rt.name === t)), 3);
  
  return {
    rowTeams,
    colTeams,
  };
}
