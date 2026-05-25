import type { LocalizedText } from './i18n'
import type { RoleId } from './role'

export type MessageChannel = 'public' | 'private' | 'system'

export type GameMessage = {
  id: string
  channel: MessageChannel
  sender: RoleId | 'district'
  round: number
  text: LocalizedText
  aiMode?: 'live' | 'fallback'
}
