import type { LocalizedText } from './i18n'
import type { RoleId } from './role'

export type Clue = {
  id: string
  title: LocalizedText
  detail: LocalizedText
  sourceRole?: RoleId
}

export type TruthVariant = {
  id: string
  name: LocalizedText
  envelopeHolder: RoleId
  envelopeMeaning: LocalizedText
  trueThreat: LocalizedText
  fakeThreat: LocalizedText
  protectorRole: RoleId
  seekerRole: RoleId
  systemInterferenceLevel: number
  extraNPCEnabled: boolean
  redHerrings: LocalizedText[]
  publicEventTriggers: LocalizedText[]
  clues: Clue[]
  idealFinalAction: 'reveal' | 'protect'
  idealTarget: RoleId
  resolution: LocalizedText
}

export type EpisodeTemplate = {
  id: string
  title: LocalizedText
  premise: LocalizedText
  locations: string[]
  roleIds: RoleId[]
  variants: TruthVariant[]
}
