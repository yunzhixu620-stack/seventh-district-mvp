import type { ReplayReport } from '../types/replay'
import type { SessionState } from '../types/world'

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
        ? { zhCN: '你选择了正确保护方向，但未建立足够的可核验证据。', en: 'You chose the safe direction but did not establish enough verifiable evidence.' }
        : { zhCN: '你的最终行动强化了错误叙事，真正风险仍未解除。', en: 'Your final action empowered the wrong account; the genuine risk remains.' },
    actionSummary: state.history.map((action) => ({
      zhCN: `第 ${state.history.indexOf(action) + 1} 步：${action.type} ${action.targetId ?? ''}`.trim(),
      en: `Step ${state.history.indexOf(action) + 1}: ${action.type} ${action.targetId ?? ''}`.trim(),
    })),
    missedClues: state.truth.clues.filter(
      (clue) => !state.knownClues.some((known) => known.id === clue.id),
    ),
    roleOutcome: success
      ? state.role.winCondition
      : state.role.failCondition,
    replayPrompt: {
      zhCN: '换一个身份或种子重新进入街区：同样的沉默会指向另一种危险。',
      en: 'Return with another role or seed: the same silence can point to a different danger.',
    },
  }
}
