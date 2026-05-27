import type { GameMessage } from '../types/message'
import type { RoleId } from '../types/role'
import type { SessionState } from '../types/world'

export type IdentityReadingSignal =
  | 'possibleInfluence'
  | 'privateApproach'
  | 'proceduralPressure'
  | 'publicPresence'
  | 'insufficient'

export type IdentityEvidence = {
  roleId: RoleId
  publicMessageCount: number
  privateActionCount: number
  activityMessages: GameMessage[]
  latestObservation?: GameMessage
  signal: IdentityReadingSignal
}

export const buildIdentityEvidence = (
  state: SessionState,
  roleId: RoleId,
): IdentityEvidence => {
  const roleMessages = state.messages.filter(
    (message) => message.sender === roleId,
  )
  const activityMessages = roleMessages.filter(
    (message) => message.activityKind !== undefined,
  )
  const hasRumor = activityMessages.some(
    (message) => message.activityKind === 'rumor',
  )
  const hasPrivateApproach = activityMessages.some(
    (message) => message.activityKind === 'privateMove',
  )
  const hasIntervention = activityMessages.some(
    (message) => message.activityKind === 'intervention',
  )

  const signal: IdentityReadingSignal =
    roleMessages.length === 0
      ? 'insufficient'
      : hasRumor
        ? 'possibleInfluence'
        : hasPrivateApproach
          ? 'privateApproach'
          : hasIntervention
            ? 'proceduralPressure'
            : 'publicPresence'

  return {
    roleId,
    publicMessageCount: roleMessages.filter(
      (message) => message.channel === 'public',
    ).length,
    privateActionCount: activityMessages.filter(
      (message) => message.activityKind === 'privateMove',
    ).length,
    activityMessages,
    latestObservation: roleMessages[roleMessages.length - 1],
    signal,
  }
}
