import type { LocalizedText } from '../../../types/i18n'
import type { RoleId } from '../../../types/role'
import type { V3CharacterId } from '../../../types/v3Narrative'

export const v3CharacterLabels: Record<V3CharacterId, LocalizedText> = {
  linxia: { zhCN: '林夏', en: 'Linxia' },
  aRan: { zhCN: '阿燃', en: 'A Ran' },
  xuMian: { zhCN: '许眠', en: 'Xu Mian' },
  laoZhou: { zhCN: '老周', en: 'Lao Zhou' },
  jiangChi: { zhCN: '江池', en: 'Jiang Chi' },
  administrator: { zhCN: '街区管理员', en: 'District Admin' },
  fourteenthPerson: { zhCN: '第十四人', en: 'The Fourteenth' },
  unknown: { zhCN: '未知号码', en: 'Unknown Number' },
}

export const v3RuntimeRoleByActor: Partial<Record<V3CharacterId, RoleId>> = {
  aRan: 'leaker',
  jiangChi: 'seeker',
  xuMian: 'protector',
  laoZhou: 'keeper',
  administrator: 'systemProxy',
}

export const v3ActorForRuntimeRole: Partial<Record<RoleId, V3CharacterId>> = {
  keeper: 'laoZhou',
  seeker: 'jiangChi',
  protector: 'xuMian',
  leaker: 'aRan',
  systemProxy: 'administrator',
}
