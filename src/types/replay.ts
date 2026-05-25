import type { Clue, TruthVariant } from './episode'
import type { LocalizedText } from './i18n'
import type { SessionState } from './world'

export type ReplayReport = {
  result: SessionState['result']
  heading: LocalizedText
  truth: TruthVariant
  outcome: LocalizedText
  actionSummary: LocalizedText[]
  missedClues: Clue[]
  roleOutcome: LocalizedText
  replayPrompt: LocalizedText
}
