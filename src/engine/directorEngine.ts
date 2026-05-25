import type { GameMessage } from '../types/message'
import type { SessionState } from '../types/world'

export const directNextBeat = (state: SessionState): GameMessage[] => {
  const triggerIndex = state.round >= 4 ? 1 : state.round >= 2 ? 0 : -1
  if (triggerIndex < 0 || state.messages.some((message) => message.id === `event-${triggerIndex}`)) {
    return []
  }
  return [
    {
      id: `event-${triggerIndex}`,
      sender: 'systemProxy',
      channel: 'system',
      round: state.round,
      text: state.truth.publicEventTriggers[triggerIndex],
    },
  ]
}
