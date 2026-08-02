import { Endo } from "@src/types";

interface GameState {}

export const tick: Endo<GameState> = (gameState: GameState) => {
  return gameState;
};
