import {
  v3AutonomousActions,
  v3ActorForRuntimeRole,
  v3CharacterLabels,
  v3PrivateMessages,
  v3PublicMessages,
  v3RuntimeRoleByActor,
} from '../data/narrative/v3'
import type { ParsedAction } from '../types/action'
import type { GameMessage, MessageChannel } from '../types/message'
import type { V3CharacterId } from '../types/v3Narrative'
import type { SessionState } from '../types/world'
import { streetLevelIndex } from './streetStateEngine'

const activeActors: V3CharacterId[] = ['aRan', 'jiangChi', 'xuMian', 'laoZhou']

const privateTriggerByActor: Partial<Record<V3CharacterId, string>> = {
  aRan: 'contactARan',
  jiangChi: 'contactJiangChi',
  xuMian: 'contactXuMian',
  laoZhou: 'contactLaoZhou',
}

const asMessage = (
  id: string,
  actorId: V3CharacterId,
  channel: MessageChannel,
  round: number,
  body: string,
  activityKind: GameMessage['activityKind'],
): GameMessage => ({
  id,
  actorId,
  sender: v3RuntimeRoleByActor[actorId] ?? 'district',
  displaySender: v3CharacterLabels[actorId],
  channel,
  round,
  text: { zhCN: body, en: body },
  activityKind,
})

const selectActor = (
  state: SessionState,
  action: ParsedAction,
): V3CharacterId => {
  const playerActor = v3ActorForRuntimeRole[state.roleId]
  const targetActor = action.targetId
    ? v3ActorForRuntimeRole[action.targetId]
    : undefined
  const truthActors = [
    v3ActorForRuntimeRole[state.truth.seekerRole],
    v3ActorForRuntimeRole[state.truth.protectorRole],
    v3ActorForRuntimeRole[state.truth.envelopeHolder],
  ]
  const eligible = [...new Set([targetActor, ...truthActors, ...activeActors])]
    .filter((actor): actor is V3CharacterId => Boolean(actor))
    .filter((actor) => actor !== playerActor)
  const unacted = eligible.find(
    (actor) => !state.autonomousActorIds.includes(actor),
  )

  return unacted ?? eligible[(state.round - 1) % eligible.length] ?? 'aRan'
}

const activityChannel = (beat: string): MessageChannel =>
  beat.includes('私信') || beat.includes('私下')
    ? 'private'
    : beat.includes('公共') || beat.includes('公开')
      ? 'public'
      : 'system'

const publicTriggerFor = (
  state: SessionState,
  action: ParsedAction,
): string | undefined => {
  if (action.type === 'reveal') return 'playerReveal'
  if (streetLevelIndex(state.streetState.adminAttention) >= 2) {
    return 'adminAttentionUp'
  }
  if (streetLevelIndex(state.streetState.evidenceRisk) >= 2) {
    return 'evidenceRiskUp'
  }
  if (action.targetId === 'keeper') return 'approachStore'
  return undefined
}

export const simulateRoleAgents = (
  state: SessionState,
  action: ParsedAction,
): { messages: GameMessage[]; actorIds: V3CharacterId[] } => {
  const actorId = selectActor(state, action)
  const activity = v3AutonomousActions.find((entry) => entry.actor === actorId)
  const pressureLevel = Math.max(
    streetLevelIndex(state.streetState.streetHeat),
    streetLevelIndex(state.streetState.evidenceRisk),
  )
  const beat = activity?.beats[Math.min(pressureLevel, 2)]
  const messages: GameMessage[] = []

  if (beat) {
    const channel = activityChannel(beat)
    messages.push(
      asMessage(
        `autonomous-${state.round}-${actorId}`,
        actorId,
        channel,
        state.round,
        beat,
        channel === 'private'
          ? 'privateMove'
          : channel === 'public'
            ? 'rumor'
            : 'movement',
      ),
    )
  }

  const publicTrigger = publicTriggerFor(state, action)
  const publicMessage = v3PublicMessages.find(
    (message) =>
      message.trigger === publicTrigger &&
      (message.sender === actorId || message.sender === 'administrator'),
  )

  if (publicMessage) {
    messages.push(
      asMessage(
        `public-${state.round}-${publicMessage.id}`,
        publicMessage.sender,
        publicMessage.channel,
        state.round,
        publicMessage.body,
        publicMessage.sender === 'administrator' ? 'intervention' : 'rumor',
      ),
    )
  }

  const privateTrigger = privateTriggerByActor[actorId]
  const privateMessage =
    action.targetId &&
    v3ActorForRuntimeRole[action.targetId] === actorId &&
    v3PrivateMessages.find((message) => message.trigger === privateTrigger)

  if (privateMessage && messages.length < 3) {
    messages.push(
      asMessage(
        `private-${state.round}-${privateMessage.id}`,
        privateMessage.sender,
        'private',
        state.round,
        privateMessage.body,
        'privateMove',
      ),
    )
  }

  return {
    messages: messages.slice(0, 3),
    actorIds: state.autonomousActorIds.includes(actorId)
      ? state.autonomousActorIds
      : [...state.autonomousActorIds, actorId],
  }
}
