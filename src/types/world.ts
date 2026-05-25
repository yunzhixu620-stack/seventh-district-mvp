import type { ParsedAction } from './action'
import type { Clue, TruthVariant } from './episode'
import type { GameMessage } from './message'
import type { RoleId, RoleSlot } from './role'
import type { ActorPerformance } from './ai'
import type { ActionType } from './action'

export type SessionStatus = 'briefing' | 'active' | 'finished'

export type SessionState = {
  seed: string
  roleId: RoleId
  role: RoleSlot
  truth: TruthVariant
  status: SessionStatus
  round: number
  risk: number
  composure: number
  favor: number
  locationId: string
  knownClues: Clue[]
  messages: GameMessage[]
  history: ParsedAction[]
  result?: 'success' | 'partial' | 'failure'
  latestPerformance?: ActorPerformance
  lastEffect?: {
    actionType: ActionType
    riskDelta: number
    spentComposure: number
    spentFavor: number
    addedClueIds: string[]
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
