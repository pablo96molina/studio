
"use server";

import { crossoverData } from "@/lib/crossoverData";
import { z } from "zod";

export type ValidationState = {
  playedForBothTeams: boolean;
  player: string | null;
  reason: string | null;
};

const playerSchema = z
  .string()
  .min(1, { message: "Player name cannot be empty." });

export async function validatePlayerAction(
  team1: string,
  team2: string,
  prevState: ValidationState,
  formData: FormData
): Promise<ValidationState> {
  const validatedFields = playerSchema.safeParse(formData.get("player"));

  if (!validatedFields.success) {
    return {
      playedForBothTeams: false,
      player: null,
      reason: validatedFields.error.errors[0].message,
    };
  }

  const player = validatedFields.data;
  
  const playerTeams = crossoverData[player as keyof typeof crossoverData];

  if (!playerTeams) {
    return {
      playedForBothTeams: false,
      player: null,
      reason: `Player "${player}" not found in our database.`,
    };
  }

  const hasTeam1 = playerTeams.includes(team1);
  const hasTeam2 = playerTeams.includes(team2);

  if (hasTeam1 && hasTeam2) {
    return {
      playedForBothTeams: true,
      player: player,
      reason: `Correct! ${player} played for both ${team1} and ${team2}.`,
    };
  } else if (hasTeam1) {
     return {
      playedForBothTeams: false,
      player: null,
      reason: `Incorrect. ${player} played for ${team1}, but not ${team2}.`,
    };
  } else if (hasTeam2) {
     return {
      playedForBothTeams: false,
      player: null,
      reason: `Incorrect. ${player} played for ${team2}, but not ${team1}.`,
    };
  } else {
     return {
      playedForBothTeams: false,
      player: null,
      reason: `Incorrect. ${player} did not play for ${team1} or ${team2}.`,
    };
  }
}
