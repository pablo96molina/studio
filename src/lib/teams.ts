
export type Team = {
  name: string;
  label: string;
  logoUrl: string;
};

const teams: Team[] = [
  { name: 'Real Madrid', label: 'Real Madrid', logoUrl: 'https://placehold.co/100x100.png' },
  { name: 'FC Barcelona', label: 'Barcelona', logoUrl: 'https://placehold.co/100x100.png' },
  { name: 'Manchester United', label: 'Man United', logoUrl: 'https://placehold.co/100x100.png' },
  { name: 'Liverpool FC', label: 'Liverpool', logoUrl: 'https://placehold.co/100x100.png' },
  { name: 'Juventus FC', label: 'Juventus', logoUrl: 'https://placehold.co/100x100.png' },
  { name: 'Inter Milan', label: 'Inter Milan', logoUrl: 'https://placehold.co/100x100.png' },
];

export function getTeams() {
  // Provides teams for a 3x3 grid
  return {
    rowTeams: teams.slice(0, 3),
    colTeams: teams.slice(3, 6),
  };
}
