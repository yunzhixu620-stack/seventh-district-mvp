import { actions } from '../data/actions'
import type { ActionType, ParsedAction } from '../types/action'
import type { RoleId } from '../types/role'

const phrases: Record<ActionType, string[]> = {
  ask: ['ask', 'question', '问', '询问', '问问'],
  probe: ['probe', 'press', 'interrogate', '试探', '追问', '盘问'],
  disguise: ['disguise', 'pretend', 'pose as', '伪装', '假装', '冒充'],
  trade: ['trade', 'exchange', 'offer', '交换', '交易', '换取'],
  follow: ['follow', 'track', 'tail', '跟踪', '跟随', '盯住'],
  reveal: ['reveal', 'expose', 'publish', '揭示', '公开', '公布'],
  protect: ['protect', 'secure', 'seal', '保护', '封存', '护送'],
}

export const parseAction = (
  rawInput: string,
  source: ParsedAction['source'],
  selectedType?: ActionType,
  targetId?: RoleId,
): ParsedAction => {
  const normalized = rawInput.trim().toLowerCase()
  const detected = selectedType ?? (Object.entries(phrases).find(([, terms]) =>
    terms.some((term) => normalized.includes(term)),
  )?.[0] as ActionType | undefined)
  const type = detected ?? 'ask'
  const confidence = selectedType || detected ? 'high' : normalized.length > 3 ? 'medium' : 'low'

  return {
    type,
    targetId,
    rawInput,
    source,
    confidence,
    warning: actions[type].preview,
    requiresConfirmation: true,
  }
}
