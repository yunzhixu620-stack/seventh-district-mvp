import type { LocalizedText } from './i18n'
import type { RoleId } from './role'
import type { V3CharacterId } from './v3Narrative'

export type MessageChannel = 'public' | 'private' | 'system'
export type ActivityKind = 'movement' | 'rumor' | 'privateMove' | 'intervention'

export type GameMessage = {
  id: string
  channel: MessageChannel
  sender: RoleId | 'district'
  round: number
  text: LocalizedText
  aiMode?: 'live' | 'fallback'
  actorId?: V3CharacterId
  displaySender?: LocalizedText
  activityKind?: ActivityKind
}
