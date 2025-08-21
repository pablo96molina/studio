export type Team = {
  name: string;
  logoUrl: string;
};

const teams: Team[] = [
  { name: 'Real Madrid', logoUrl: 'https://placehold.co/100x100.png' },
  { name: 'FC Barcelona', logoUrl: 'https://placehold.co/100x100.png' },
  { name: 'Manchester United', logoUrl: 'https://placehold.co/100x100.png' },
  { name: 'Liverpool FC', logoUrl: 'https://placehold.co/100x100.png' },
  { name: 'Juventus FC', logoUrl: 'https://placehold.co/100x100.png' },
  { name: 'Inter Milan', logoUrl: 'https://placehold.co/100x100.png' },
];

export function getTeams() {
  // Provides teams for a 3x3 grid
  return {
    rowTeams: teams.slice(0, 3),
    colTeams: teams.slice(3, 6),
  };
}
