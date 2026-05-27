import type { Clue, TruthVariant } from './episode'
import type { LocalizedText } from './i18n'
import type { RoleId } from './role'
import type {
  V3ControlType,
  V3EndingNarrative,
  V3TruthVariant,
} from './v3Narrative'
import type { IdentityGuess, SessionState } from './world'

export type V3RevealControlType = V3ControlType | 'player'

export type V3RoleReveal = {
  roleId: RoleId
  actorName: LocalizedText
  roleName: string
  controlType: V3RevealControlType
  goal: string
  achieved: boolean
  misledPlayer: boolean
  guess?: IdentityGuess
  guessResult?: 'correct' | 'incorrect' | 'uncertain'
}

export type V3MisdirectionSource = {
  actorName: LocalizedText
  evidence: LocalizedText
}

export type ReplayReport = {
  result: SessionState['result']
  heading: LocalizedText
  truth: TruthVariant
  outcome: LocalizedText
  actionSummary: LocalizedText[]
  missedClues: Clue[]
  roleOutcome: LocalizedText
  replayPrompt: LocalizedText
  v3Reveal: {
    heading: string
    intro: string
    truth: V3TruthVariant
    ending: V3EndingNarrative
    roles: V3RoleReveal[]
    misdirectionSources: V3MisdirectionSource[]
    identityJudgmentRecorded: boolean
    identityGuessSkipped: boolean
    identitySummary: {
      correct: number
      incorrect: number
      uncertain: number
    }
  }
}
