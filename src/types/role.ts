import type { ActionType } from './action'
import type { LocalizedText } from './i18n'

export type RoleId =
  | 'investigator'
  | 'keeper'
  | 'seeker'
  | 'protector'
  | 'leaker'
  | 'systemProxy'

export type RoleSlot = {
  id: RoleId
  name: LocalizedText
  publicIdentity: LocalizedText
  hiddenIdentity: LocalizedText
  personalGoal: LocalizedText
  possibleFaction: LocalizedText
  privateKnowledge: LocalizedText[]
  resources: { composure: number; favor: number }
  weaknesses: LocalizedText[]
  playableActions: ActionType[]
  winCondition: LocalizedText
  failCondition: LocalizedText
  aiControlPolicy: LocalizedText
  humanControlPolicy: LocalizedText
  roleDifficulty: LocalizedText
  roleFantasy: LocalizedText
  replayValue: LocalizedText
  selectable: boolean
}
