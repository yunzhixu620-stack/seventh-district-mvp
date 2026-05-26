import type {
  V3ControlType,
  V3NarrativeText,
} from '../../../types/v3Narrative'

export const v3PostGameHeading: V3NarrativeText = {
  id: 'post-game-heading',
  body: '本局揭示',
  sourceSection: '15.1 标题',
}

export const v3PostGameIntro: V3NarrativeText = {
  id: 'post-game-intro',
  body: `局内不会告诉你谁是真人。
但结算会。`,
  sourceSection: '15.2 身份揭示文案',
}

export const v3RevealFields = [
  '角色',
  '局内公开身份',
  '本局控制类型',
  '本局真实目标',
  '是否完成目标',
  '你是否误判',
  '误导来源',
] as const

export const v3ControlTypeCopy: Record<V3ControlType, string> = {
  aiAgent: 'AI Agent：由系统根据角色目标和局势自动扮演。',
  fixedNpc: '固定 NPC：负责提供街区背景、资源和稳定叙事支点。',
  systemProxy: '系统代理：不一定追求个人胜利，而是维护局面可控。',
  vacantHumanSlot:
    '真人位空缺：该角色位未来可由真人玩家接管，本局由 AI 代打。',
}

export const v3MisjudgmentExamples: V3NarrativeText[] = [
  {
    id: 'mistake-jiangchi',
    body: `你把江池判断为真人。
原因：他的发言有犹豫、交易和自我保护，看起来不像模板角色。
揭示：江池本局由 AI Agent 扮演。`,
    sourceSection: '15.5 玩家误判文案',
  },
  {
    id: 'mistake-administrator',
    body: `你把管理员判断为普通 NPC。
原因：它的提醒过于中立，没有明显个人目标。
揭示：管理员是系统代理。`,
    sourceSection: '15.5 玩家误判文案',
  },
  {
    id: 'mistake-aran',
    body: `你认为阿燃在搅局。
这一点是对的。
但搅局不等于他知道真相。`,
    sourceSection: '15.5 玩家误判文案',
  },
]
