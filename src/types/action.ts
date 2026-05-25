import type { LocalizedText } from './i18n'
import type { RoleId } from './role'

export type ActionType =
  | 'ask'
  | 'probe'
  | 'disguise'
  | 'trade'
  | 'follow'
  | 'reveal'
  | 'protect'

export type ActionDefinition = {
  id: ActionType
  label: LocalizedText
  description: LocalizedText
  preview: LocalizedText
  cost: { composure?: number; favor?: number }
  baseRisk: number
  terminal: boolean
}

export type ParsedAction = {
  type: ActionType
  targetId?: RoleId
  rawInput: string
  source: 'recommended' | 'freeText'
  confidence: 'high' | 'medium' | 'low'
  warning: LocalizedText
  requiresConfirmation: true
}
