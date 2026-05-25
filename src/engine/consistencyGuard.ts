import type { Clue } from '../types/episode'
import type { SessionState } from '../types/world'

export const filterLegalClues = (state: SessionState, clues: Clue[]): Clue[] => {
  const permitted = new Set(state.truth.clues.map((clue) => clue.id))
  return clues.filter((clue) => permitted.has(clue.id))
}

export const isCanonSafe = (state: SessionState): boolean =>
  state.knownClues.every((clue) => state.truth.clues.some((truthClue) => truthClue.id === clue.id))
