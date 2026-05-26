import {
  v3CharacterLabels,
  v3PublicMessages,
  v3RuntimeRoleByActor,
} from '../data/narrative/v3'
import { roleById } from '../data/roles'
import type { RoleId } from '../types/role'
import type { SessionState } from '../types/world'
import { selectTruthBySeed } from './seedEngine'
import { createInitialStreetState } from './streetStateEngine'

export const createSession = (roleId: RoleId, seed: string): SessionState => {
  const role = roleById[roleId]
  const truth = selectTruthBySeed(seed)
  return {
    seed,
    roleId,
    role,
    truth,
    status: 'briefing',
    round: 0,
    risk: 12,
    streetState: createInitialStreetState(truth),
    autonomousActorIds: [],
    composure: role.resources.composure,
    favor: role.resources.favor,
    locationId: 'kiosk',
    knownClues: [],
    history: [],
    messages: v3PublicMessages
      .filter((message) => message.trigger === 'opening')
      .map((message) => ({
        id: message.id,
        actorId: message.sender,
        channel: message.channel,
        sender: v3RuntimeRoleByActor[message.sender] ?? 'district',
        displaySender: v3CharacterLabels[message.sender],
        round: 0,
        text: { zhCN: message.body, en: message.body },
      })),
  }
}

export const activateSession = (state: SessionState): SessionState => ({
  ...state,
  status: 'active',
  round: 1,
})
