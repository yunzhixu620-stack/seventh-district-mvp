import type { ActionType } from './action'
import type { Language, LocalizedText } from './i18n'
import type { RoleId } from './role'

export type ActorMood = 'guarded' | 'shaken' | 'warm' | 'defiant' | 'calculating'

export type PerformanceRequest = {
  locale: Language
  actionType: ActionType
  utterance: string
  round: number
  exposureBand: 'low' | 'rising' | 'high'
  location: LocalizedText
  player: {
    roleId: RoleId
    publicIdentity: LocalizedText
  }
  target: {
    roleId: RoleId
    name: LocalizedText
    publicIdentity: LocalizedText
    posture: LocalizedText
  }
  allowedEvidence: LocalizedText[]
}

export type ActorPerformance = {
  line: string
  gesture: string
  subtext: string
  mood: ActorMood
  model: string
  mode: 'live' | 'fallback'
}
