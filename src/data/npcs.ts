import type { LocalizedText } from '../types/i18n'
import type { RoleId } from '../types/role'

export const npcProfiles: Record<
  RoleId,
  { callSign: LocalizedText; posture: LocalizedText }
> = {
  investigator: {
    callSign: { zhCN: '迟未', en: 'Chiwei' },
    posture: {
      zhCN: '保持距离，记录每一句不一致。',
      en: 'Keeps distance and logs every inconsistency.',
    },
  },
  keeper: {
    callSign: { zhCN: '老周', en: 'Lao Zhou' },
    posture: {
      zhCN: '一只手始终压在档案包上。',
      en: 'Keeps one hand over the archive satchel.',
    },
  },
  seeker: {
    callSign: { zhCN: '江池', en: 'Jiang Chi' },
    posture: {
      zhCN: '雨衣上有未扫描的派送贴纸。',
      en: 'An unscanned delivery label clings to the raincoat.',
    },
  },
  protector: {
    callSign: { zhCN: '许眠', en: 'Xu Mian' },
    posture: {
      zhCN: '回答简短，总在看通往后巷的方向。',
      en: 'Answers briefly and keeps watching the back lane.',
    },
  },
  leaker: {
    callSign: { zhCN: '阿燃', en: 'A Ran' },
    posture: {
      zhCN: '头像离线，消息却准确赶在现场之前。',
      en: 'Avatar offline; messages arrive just before events.',
    },
  },
  systemProxy: {
    callSign: { zhCN: '街区管理员', en: 'District Admin' },
    posture: {
      zhCN: '只有倒计时，没有解释。',
      en: 'Offers only countdowns, never explanations.',
    },
  },
}
