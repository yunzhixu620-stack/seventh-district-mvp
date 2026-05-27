import {
  v3ActorForRuntimeRole,
  v3CharacterLabels,
  v3Endings,
  v3PostGameHeading,
  v3PostGameIntro,
  v3RoleForRuntimeId,
  v3TruthVariants,
} from '../data/narrative/v3'
import { npcProfiles } from '../data/npcs'
import type { RoleId } from '../types/role'
import type { ReplayReport, V3RevealControlType } from '../types/replay'
import type {
  V3ControlType,
  V3EndingNarrative,
  V3TruthVariant,
} from '../types/v3Narrative'
import type { IdentityGuess, SessionState } from '../types/world'

const reportRoles: RoleId[] = [
  'investigator',
  'keeper',
  'seeker',
  'protector',
  'leaker',
  'systemProxy',
]

const v3TruthIdByRuntimeTruth: Record<string, V3TruthVariant['id']> = {
  'quiet-exit': 'protection',
  'borrowed-name': 'systemInterference',
  'false-alarm': 'misunderstanding',
  'shelter-route': 'protection',
}

const controlTypeByRole: Record<
  Exclude<RoleId, 'investigator'>,
  V3ControlType
> = {
  keeper: 'fixedNpc',
  seeker: 'aiAgent',
  protector: 'vacantHumanSlot',
  leaker: 'aiAgent',
  systemProxy: 'systemProxy',
}

const v3TruthFor = (state: SessionState): V3TruthVariant =>
  v3TruthVariants.find(
    (truth) => truth.id === v3TruthIdByRuntimeTruth[state.truth.id],
  ) ?? v3TruthVariants[0]

const controlTypeFor = (
  state: SessionState,
  roleId: RoleId,
): V3RevealControlType => {
  if (roleId === state.roleId) return 'player'
  if (roleId === 'investigator') return 'fixedNpc'
  return controlTypeByRole[roleId]
}

const guessMatchingControlType = (
  controlType: V3RevealControlType,
): IdentityGuess | undefined => {
  if (controlType === 'player') return undefined
  if (controlType === 'vacantHumanSlot') return 'humanSlot'
  return controlType
}

const guessResultFor = (
  state: SessionState,
  roleId: RoleId,
  controlType: V3RevealControlType,
) => {
  if (roleId === state.roleId) return undefined
  const guess = state.identityGuesses[roleId] ?? 'uncertain'

  if (guess === 'uncertain') return 'uncertain' as const
  return guess === guessMatchingControlType(controlType)
    ? ('correct' as const)
    : ('incorrect' as const)
}

const identitySummaryFor = (state: SessionState) =>
  reportRoles.reduce(
    (summary, roleId) => {
      const result = guessResultFor(state, roleId, controlTypeFor(state, roleId))
      if (result) summary[result] += 1
      return summary
    },
    { correct: 0, incorrect: 0, uncertain: 0 },
  )

const v3EndingFor = (state: SessionState): V3EndingNarrative => {
  const finalAction = state.history[state.history.length - 1]
  const identitySummary = identitySummaryFor(state)
  const evaluatedGuesses = identitySummary.correct + identitySummary.incorrect
  let endingId = 'envelopeTraded'

  if (state.truth.id === 'borrowed-name' && state.result !== 'success') {
    endingId = 'administratorTakesOver'
  } else if (
    state.result === 'success' &&
    evaluatedGuesses === 3 &&
    identitySummary.correct === 2
  ) {
    endingId = 'identifiedHumanTest'
  } else if (finalAction?.type === 'protect' && state.result === 'success') {
    endingId = 'protectedLinxia'
  } else if (finalAction?.type === 'reveal') {
    endingId = 'truthLostPerson'
  }

  return v3Endings.find((ending) => ending.id === endingId) ?? v3Endings[0]
}

const achievedGoal = (state: SessionState, roleId: RoleId): boolean => {
  const finalAction = state.history[state.history.length - 1]

  if (roleId === state.roleId) return state.result === 'success'
  if (roleId === 'keeper') {
    return finalAction?.type === 'protect' && finalAction.targetId !== 'seeker'
  }
  if (roleId === 'seeker') {
    return finalAction?.type === 'protect' && finalAction.targetId === 'seeker'
  }
  if (roleId === 'protector') {
    return (
      finalAction?.type === 'protect' && finalAction.targetId === 'protector'
    )
  }
  if (roleId === 'leaker') return state.streetState.publicOpinion >= 25
  return state.streetState.streetHeat < 75
}

const misdirectionSourcesFor = (state: SessionState) => {
  const seekerActor = v3ActorForRuntimeRole[state.truth.seekerRole]
  const misleadingActors = new Set([seekerActor, 'aRan', 'administrator'])
  const seenActors = new Set<string>()

  return state.messages.flatMap((message) => {
    if (
      !message.actorId ||
      !misleadingActors.has(message.actorId) ||
      !message.activityKind ||
      seenActors.has(message.actorId)
    ) {
      return []
    }

    seenActors.add(message.actorId)
    return [
      {
        actorName: v3CharacterLabels[message.actorId],
        evidence: message.text,
      },
    ]
  })
}

const buildV3Reveal = (state: SessionState): ReplayReport['v3Reveal'] => {
  const misdirectionSources = misdirectionSourcesFor(state)
  const identitySummary = identitySummaryFor(state)
  const identityJudgmentRecorded =
    state.identityGuessSubmitted &&
    !state.identityGuessSkipped &&
    identitySummary.correct + identitySummary.incorrect > 0

  return {
    heading: v3PostGameHeading.body,
    intro: v3PostGameIntro.body,
    truth: v3TruthFor(state),
    ending: v3EndingFor(state),
    roles: reportRoles.map((roleId) => {
      const actorId = v3ActorForRuntimeRole[roleId]
      const controlType = controlTypeFor(state, roleId)
      const guess = state.identityGuesses[roleId]

      return {
        roleId,
        actorName: actorId
          ? v3CharacterLabels[actorId]
          : npcProfiles[roleId].callSign,
        roleName: v3RoleForRuntimeId(roleId).name,
        controlType,
        goal: v3RoleForRuntimeId(roleId).personalGoalText,
        achieved: achievedGoal(state, roleId),
        misledPlayer:
          actorId !== undefined &&
          misdirectionSources.some(
            (source) => source.actorName === v3CharacterLabels[actorId],
          ),
        guess,
        guessResult: guessResultFor(state, roleId, controlType),
      }
    }),
    misdirectionSources,
    identityJudgmentRecorded,
    identityGuessSkipped: state.identityGuessSkipped,
    identitySummary,
  }
}

export const buildReplayReport = (state: SessionState): ReplayReport => {
  const success = state.result === 'success'
  const partial = state.result === 'partial'
  return {
    result: state.result,
    heading: success
      ? { zhCN: '安全结案', en: 'Safe Resolution' }
      : partial
        ? { zhCN: '方向正确，证据不足', en: 'Right Direction, Thin Evidence' }
        : { zhCN: '信任链断裂', en: 'Trust Chain Broken' },
    truth: state.truth,
    outcome: success
      ? state.truth.resolution
      : partial
        ? {
            zhCN: '你选择了正确保护方向，但未建立足够的可核验证据。',
            en: 'You chose the safe direction but did not establish enough verifiable evidence.',
          }
        : {
            zhCN: '你的最终行动强化了错误叙事，真正风险仍未解除。',
            en: 'Your final action empowered the wrong account; the genuine risk remains.',
          },
    actionSummary: state.history.map((action) => ({
      zhCN: `第 ${state.history.indexOf(action) + 1} 步：${action.type} ${action.targetId ?? ''}`.trim(),
      en: `Step ${state.history.indexOf(action) + 1}: ${action.type} ${action.targetId ?? ''}`.trim(),
    })),
    missedClues: state.truth.clues.filter(
      (clue) => !state.knownClues.some((known) => known.id === clue.id),
    ),
    roleOutcome: success ? state.role.winCondition : state.role.failCondition,
    replayPrompt: {
      zhCN: '换一个身份或种子重新进入街区：同样的沉默会指向另一种危险。',
      en: 'Return with another role or seed: the same silence can point to a different danger.',
    },
    v3Reveal: buildV3Reveal(state),
  }
}
