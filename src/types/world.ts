import type { ParsedAction } from './action'
import type { Clue, TruthVariant } from './episode'
import type { GameMessage } from './message'
import type { RoleId, RoleSlot } from './role'
import type { ActorPerformance } from './ai'
import type { ActionType } from './action'
import type { V3CharacterId, V3StreetMeterCopy } from './v3Narrative'

export type SessionStatus = 'briefing' | 'active' | 'finished'
export type StreetMeterId = V3StreetMeterCopy['id']
export type StreetState = Record<StreetMeterId, number>
export type IdentityGuess =
  | 'humanSlot'
  | 'aiAgent'
  | 'fixedNpc'
  | 'systemProxy'
  | 'uncertain'
export type IdentityGuesses = Partial<Record<RoleId, IdentityGuess>>

export type SessionState = {
  seed: string
  roleId: RoleId
  role: RoleSlot
  truth: TruthVariant
  status: SessionStatus
  round: number
  risk: number
  streetState: StreetState
  autonomousActorIds: V3CharacterId[]
  composure: number
  favor: number
  locationId: string
  knownClues: Clue[]
  messages: GameMessage[]
  history: ParsedAction[]
  identityGuesses: IdentityGuesses
  identityGuessSubmitted: boolean
  identityGuessSkipped: boolean
  result?: 'success' | 'partial' | 'failure'
  latestPerformance?: ActorPerformance
  lastEffect?: {
    actionType: ActionType
    riskDelta: number
    spentComposure: number
    spentFavor: number
    addedClueIds: string[]
    streetDelta: StreetState
  }
}

export type RulingResult = {
  actionAccepted: boolean
  nextState: SessionState
  addedClues: Clue[]
  addedMessages: GameMessage[]
  riskDelta: number
  resourceSpent: string
}
