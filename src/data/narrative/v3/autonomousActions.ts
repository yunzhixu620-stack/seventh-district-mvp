import type { V3AutonomousAction } from '../../../types/v3Narrative'

export const v3AutonomousActions: V3AutonomousAction[] = [
  {
    actor: 'aRan',
    beats: [
      '阿燃在公共频道暗示有人去过便利店。',
      '阿燃私信玩家，要求交换截图。',
      '阿燃公开一条不完整视频，把舆论引向错误角色。',
    ],
    sourceSection: '11.1 阿燃行动',
  },
  {
    actor: 'jiangChi',
    beats: [
      '江池离开当前位置，接近信封可能出现的地点。',
      '江池向玩家提出交易，用半真半假的信息换取便利店线索。',
      '江池在公共频道质疑最情绪化的角色，转移自己动机。',
    ],
    sourceSection: '11.2 江池行动',
  },
  {
    actor: 'xuMian',
    beats: [
      '许眠私信警告玩家不要逼问老周。',
      '许眠在公共频道反击爆料者，降低其可信度。',
      '许眠尝试转移林夏相关讨论，把焦点引向管理员删帖。',
    ],
    sourceSection: '11.3 许眠行动',
  },
  {
    actor: 'laoZhou',
    beats: [
      '老周短暂关闭便利店门口的灯。',
      '老周改变说法，从“没见过林夏”变成“她只是买了水”。',
      '老周私下询问玩家是否认识许眠。',
    ],
    sourceSection: '11.4 老周行动',
  },
  {
    actor: 'administrator',
    beats: [
      '管理员折叠公共频道中的“信封”关键词。',
      '管理员发布中立提醒，但实际降低某条信息可见度。',
      '管理员将玩家标记为“高频叙事推动者”。',
    ],
    sourceSection: '11.5 管理员行动',
  },
]
