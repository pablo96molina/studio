"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Team } from "@/lib/teams";
import { validatePlayerAction, type ValidationState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, SendHorizonal } from "lucide-react";

const initialState: ValidationState = {
  playedForBothTeams: false,
  player: null,
  reason: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="sm">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Checking...
        </>
      ) : (
        <>
          Guess <SendHorizonal className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function GridCell({
  rowTeam,
  colTeam,
}: {
  rowTeam: Team;
  colTeam: Team;
}) {
  const [state, formAction] = useFormState(
    validatePlayerAction.bind(null, rowTeam.name, colTeam.name),
    initialState
  );

  const [correctPlayer, setCorrectPlayer] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.reason && !state.playedForBothTeams) {
      toast({
        variant: "destructive",
        title: "Incorrect Guess",
        description: state.reason,
      });
    }
    if (state.playedForBothTeams && state.player) {
      setCorrectPlayer(state.player);
    }
    if (!state.playedForBothTeams && formRef.current) {
      formRef.current.reset();
    }
  }, [state, toast]);

  if (correctPlayer) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-2 bg-primary/20 rounded-lg h-full animate-in fade-in zoom-in-95">
        <Image
          src={`https://placehold.co/64x64.png`}
          alt={correctPlayer}
          width={64}
          height={64}
          className="rounded-full border-2 border-primary"
          data-ai-hint="football player"
        />
        <p className="font-bold text-sm md:text-base text-center text-primary-foreground">
          {correctPlayer}
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col items-center justify-center gap-2 md:gap-4 p-2 h-full"
    >
      <Input
        name="player"
        placeholder="Player Name"
        className="text-center bg-background/50 border-border h-9 text-sm"
        autoComplete="off"
      />
      <SubmitButton />
    </form>
  );
}
