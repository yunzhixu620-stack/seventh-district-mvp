import type { SessionState } from '../types/world'

export const REQUIRED_FINALE_CLUES = 2

export type FinaleGate = {
  ready: boolean
  clueCount: number
  sourceCount: number
}

export const evaluateFinaleGate = (state: SessionState): FinaleGate => {
  const sourceCount = new Set(
    state.knownClues.map((clue) => clue.sourceRole).filter(Boolean),
  ).size

  return {
    ready: state.knownClues.length >= REQUIRED_FINALE_CLUES && sourceCount >= REQUIRED_FINALE_CLUES,
    clueCount: state.knownClues.length,
    sourceCount,
  }
}
