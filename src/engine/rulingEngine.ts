import { actions } from '../data/actions'
import { dialogueProvider } from '../providers/dialogueProvider'
import type { ParsedAction } from '../types/action'
import type { Clue } from '../types/episode'
import type { GameMessage } from '../types/message'
import type { RulingResult, SessionState } from '../types/world'
import { filterLegalClues } from './consistencyGuard'
import { directNextBeat } from './directorEngine'
import { evaluateFinaleGate } from './finaleGate'
import { simulateRoleAgents } from './roleAgentEngine'

const clampRisk = (risk: number) => Math.max(0, Math.min(100, risk))

const findClue = (state: SessionState, action: ParsedAction): Clue[] => {
  if (action.type === 'disguise' || action.type === 'reveal' || action.type === 'protect') return []
  const unknown = state.truth.clues.filter(
    (clue) => !state.knownClues.some((known) => known.id === clue.id),
  )
  const targeted = unknown.find((clue) => clue.sourceRole === action.targetId)
  if (targeted) return [targeted]
  if (action.type === 'trade' || action.type === 'probe') return unknown.slice(0, 1)
  return []
}

const denialMessage = (state: SessionState): GameMessage => ({
  id: `denied-${state.round}-${Date.now()}`,
  sender: 'district',
  channel: 'system',
  round: state.round,
  text: {
    zhCN: '资源不足：你的行动没有进入记录，也未改变局势。',
    en: 'Insufficient resources: the action was not recorded and the situation did not change.',
  },
})

const lockedFinaleMessage = (state: SessionState): GameMessage => ({
  id: `finale-locked-${state.round}-${Date.now()}`,
  sender: 'district',
  channel: 'system',
  round: state.round,
  text: {
    zhCN: '终局裁定未解锁：先从至少两名不同对象处取得可核验线索，才能决定保护谁或公开揭示谁。',
    en: 'Final ruling locked: secure verifiable clues from at least two different people before choosing whom to protect or expose.',
  },
})

export const ruleAction = (state: SessionState, action: ParsedAction): RulingResult => {
  const definition = actions[action.type]
  const requiredComposure = definition.cost.composure ?? 0
  const requiredFavor = definition.cost.favor ?? 0

  if (definition.terminal && !evaluateFinaleGate(state).ready) {
    const locked = lockedFinaleMessage(state)
    return {
      actionAccepted: false,
      nextState: { ...state, messages: [...state.messages, locked] },
      addedClues: [],
      addedMessages: [locked],
      riskDelta: 0,
      resourceSpent: '',
    }
  }

  if (state.composure < requiredComposure || state.favor < requiredFavor) {
    const denied = denialMessage(state)
    return {
      actionAccepted: false,
      nextState: { ...state, messages: [...state.messages, denied] },
      addedClues: [],
      addedMessages: [denied],
      riskDelta: 0,
      resourceSpent: '',
    }
  }

  const addedClues = filterLegalClues(state, findClue(state, action))
  const nextRound = state.round + 1
  const riskDelta = definition.baseRisk + (state.round > 4 && !definition.terminal ? 5 : 0)
  const narration: GameMessage = {
    id: `action-${nextRound}`,
    sender: 'district',
    channel: 'system',
    round: nextRound,
    text: dialogueProvider.describeAction(action.type),
  }

  let nextState: SessionState = {
    ...state,
    round: nextRound,
    risk: clampRisk(state.risk + riskDelta),
    composure: state.composure - requiredComposure,
    favor: state.favor - requiredFavor,
    knownClues: [...state.knownClues, ...addedClues],
    history: [...state.history, action],
    messages: [...state.messages, narration],
    lastEffect: {
      actionType: action.type,
      riskDelta,
      spentComposure: requiredComposure,
      spentFavor: requiredFavor,
      addedClueIds: addedClues.map((clue) => clue.id),
    },
  }
  const directorMessages = directNextBeat(nextState)
  const agentMessages = simulateRoleAgents(nextState)
  const clueMessages: GameMessage[] = addedClues.map((clue) => ({
    id: `clue-${clue.id}`,
    sender: clue.sourceRole ?? 'district',
    channel: 'private',
    round: nextRound,
    text: clue.detail,
  }))
  const addedMessages = [narration, ...directorMessages, ...agentMessages, ...clueMessages]
  nextState = { ...nextState, messages: [...state.messages, ...addedMessages] }

  if (definition.terminal) {
    const rightDecision = action.type === state.truth.idealFinalAction && action.targetId === state.truth.idealTarget
    const evidenceReady = state.knownClues.length + addedClues.length >= 2
    nextState = {
      ...nextState,
      status: 'finished',
      result: rightDecision && evidenceReady ? 'success' : rightDecision ? 'partial' : 'failure',
    }
  }

  return {
    actionAccepted: true,
    nextState,
    addedClues,
    addedMessages,
    riskDelta,
    resourceSpent:
      requiredComposure > 0 ? `-${requiredComposure} composure` : requiredFavor > 0 ? `-${requiredFavor} favor` : '',
  }
}
