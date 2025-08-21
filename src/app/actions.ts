"use server";

import { validatePlayerForTeams } from "@/ai/flows/validate-player-for-teams";
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

  try {
    const result = await validatePlayerForTeams({ player, team1, team2 });

    return {
      playedForBothTeams: result.playedForBothTeams,
      player: result.playedForBothTeams ? player : null,
      reason: result.reason,
    };
  } catch (error) {
    console.error("Validation Error:", error);
    return {
      playedForBothTeams: false,
      player: null,
      reason: "An error occurred during validation. Please try again.",
    };
  }
}
