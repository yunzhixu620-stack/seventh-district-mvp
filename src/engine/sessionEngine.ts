import { openingBroadcasts, openingWhispers } from '../data/messages'
import { roleById } from '../data/roles'
import type { RoleId } from '../types/role'
import type { SessionState } from '../types/world'
import { selectTruthBySeed } from './seedEngine'

export const createSession = (roleId: RoleId, seed: string): SessionState => {
  const role = roleById[roleId]
  return {
    seed,
    roleId,
    role,
    truth: selectTruthBySeed(seed),
    status: 'briefing',
    round: 0,
    risk: 12,
    composure: role.resources.composure,
    favor: role.resources.favor,
    locationId: 'kiosk',
    knownClues: [],
    history: [],
    messages: [
      ...openingBroadcasts.map((text, index) => ({
        id: `opening-public-${index}`,
        channel: 'public' as const,
        sender: index === 0 ? ('systemProxy' as const) : ('leaker' as const),
        round: 0,
        text,
      })),
      {
        id: 'opening-private',
        channel: 'private',
        sender: roleId === 'keeper' ? 'protector' : 'keeper',
        round: 0,
        text: openingWhispers[roleId],
      },
    ],
  }
}

export const activateSession = (state: SessionState): SessionState => ({
  ...state,
  status: 'active',
  round: 1,
})
