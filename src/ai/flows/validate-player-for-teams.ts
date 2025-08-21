'use server';
/**
 * @fileOverview Validates whether a player has played for two given teams.
 *
 * - validatePlayerForTeams - A function that validates if a player played for both teams.
 * - ValidatePlayerForTeamsInput - The input type for the validatePlayerForTeams function.
 * - ValidatePlayerForTeamsOutput - The return type for the validatePlayerForTeams function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidatePlayerForTeamsInputSchema = z.object({
  player: z.string().describe('The name of the player to validate.'),
  team1: z.string().describe('The name of the first team.'),
  team2: z.string().describe('The name of the second team.'),
});
export type ValidatePlayerForTeamsInput = z.infer<typeof ValidatePlayerForTeamsInputSchema>;

const ValidatePlayerForTeamsOutputSchema = z.object({
  playedForBothTeams: z
    .boolean()
    .describe('Whether the player has played for both teams.'),
  reason: z.string().describe('The reasoning behind the validation result.'),
});
export type ValidatePlayerForTeamsOutput = z.infer<typeof ValidatePlayerForTeamsOutputSchema>;

export async function validatePlayerForTeams(
  input: ValidatePlayerForTeamsInput
): Promise<ValidatePlayerForTeamsOutput> {
  return validatePlayerForTeamsFlow(input);
}

const validatePlayerForTeamsPrompt = ai.definePrompt({
  name: 'validatePlayerForTeamsPrompt',
  input: {schema: ValidatePlayerForTeamsInputSchema},
  output: {schema: ValidatePlayerForTeamsOutputSchema},
  prompt: `Given the following player and two teams, determine if the player has played for both teams.

Player: {{{player}}}
Team 1: {{{team1}}}
Team 2: {{{team2}}}

Return a JSON object with a boolean indicating whether the player played for both teams and a brief explanation.
`,
});

const validatePlayerForTeamsFlow = ai.defineFlow(
  {
    name: 'validatePlayerForTeamsFlow',
    inputSchema: ValidatePlayerForTeamsInputSchema,
    outputSchema: ValidatePlayerForTeamsOutputSchema,
  },
  async input => {
    const {output} = await validatePlayerForTeamsPrompt(input);
    return output!;
  }
);
