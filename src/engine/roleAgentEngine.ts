import { aiPressureByRole } from '../data/messages'
import type { GameMessage } from '../types/message'
import type { SessionState } from '../types/world'

export const simulateRoleAgents = (state: SessionState): GameMessage[] => {
  const prompts = aiPressureByRole[state.roleId]
  const index = state.round - 2
  if (index < 0 || !prompts[index]) {
    return []
  }
  return [
    {
      id: `agent-${state.roleId}-${index}`,
      sender: state.roleId === 'keeper' ? 'seeker' : index === 0 ? 'keeper' : 'protector',
      channel: index === 0 ? 'private' : 'public',
      round: state.round,
      text: prompts[index],
    },
  ]
}
