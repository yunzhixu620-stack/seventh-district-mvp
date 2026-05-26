import type {
  V3NarrativeText,
  V3TruthVariant,
} from '../../../types/v3Narrative'

export const linxiaEnvelopeOpening: V3NarrativeText = {
  id: 'linxia-envelope-opening',
  body: `第七街区的夜局刚开始，公共频道里突然出现一条异常消息：

“林夏不见了。”

她不是第一个迟到的人，却是第一个让管理员亲自删帖的人。
有人说她只是退出了测试。
有人说她留下了一封信。
有人说那封信里写着参与者名单。
也有人说，信封根本不存在。

你被分配了一个身份。
你有自己的目标。
你可以选择查明真相，也可以选择利用这场混乱。`,
  sourceSection: '3.2 章节简介',
}

export const linxiaEnvelopeOpeningSequence: V3NarrativeText[] = [
  {
    id: 'opening-system',
    body: `【系统通知｜21:07】

第七街区夜局已开启。
本局为封闭测试局。
所有参与者身份将在局后统一揭示。

请注意：
你看到的每一句话，都可能来自真人、AI、固定 NPC 或系统代理人。
局内不会提供身份标记。`,
    sourceSection: '3.3 第一章开场系统信息',
  },
  {
    id: 'opening-public-aran',
    body: `【公共频道｜21:13｜阿燃】

林夏还没上线？
她不是最早到的人吗。`,
    sourceSection: '3.4 第一条公共频道消息',
  },
  {
    id: 'opening-public-xumian',
    body: `【公共频道｜21:14｜许眠】

别在频道里叫她名字。`,
    sourceSection: '3.5 第二条公共频道消息',
  },
  {
    id: 'opening-public-admin',
    body: `【街区管理员｜21:15】

检测到未经确认的个人信息传播。
请避免扩散与参与者现实身份相关的内容。`,
    sourceSection: '3.6 管理员第一次介入',
  },
  {
    id: 'opening-private-unknown',
    body: `【未知号码｜21:16】

如果有人问你信封的事，就说没见过。

尤其是那个总说“我只是想帮忙”的人。`,
    sourceSection: '3.7 玩家收到的第一条私信',
  },
]

export const linxiaEnvelopeFixedRules = [
  '林夏失联或暂时脱离公共频道。',
  '有一个“信封”正在被寻找、保管、伪造或误传。',
  '至少一名角色想公开信封。',
  '至少一名角色想保住信封。',
  '至少一名角色想利用信封换取利益。',
  '管理员会以“降低风险”为由干预公共频道。',
  '场上至少有一个角色的行为不符合其公开身份。',
  '玩家无法在局内确认哪些角色是 AI。',
] as const

export const linxiaEnvelopeVariableSlots = [
  'envelopeHolder',
  'envelopeMeaning',
  'trueThreat',
  'fakeThreat',
  'protectorRole',
  'seekerRole',
  'systemInterferenceLevel',
  'extraNPCEnabled',
  'redHerringSet',
  'aiDisguisePattern',
] as const

export const v3TruthVariants: V3TruthVariant[] = [
  {
    id: 'misunderstanding',
    name: '误会局',
    summary:
      '林夏没有被害，也没有被绑架。' +
      '她发现自己被卷入一次“真人测试”的异常样本中，' +
      '于是主动断联，观察谁会第一时间寻找信封。',
    envelopeMeaning:
      '信封里不是罪证，而是一张手写名单，记录着“过度主动的人”' +
      '“永远中立的人”“像真人一样犯错的人”和“像 AI 一样正确的人”。',
    trueThreat: '玩家过早相信了“这一定是案件”。',
    endingBias: ['识别测试', '避免过早定罪'],
    sourceSection: '4.3 真相版本 A：误会局',
  },
  {
    id: 'protection',
    name: '保护局',
    summary:
      '林夏确实留下了信封，证明她怀疑本局存在“AI 代打位”。' +
      '保护者拿到信封后没有公开。',
    envelopeMeaning:
      '一段林夏写给某个参与者的说明，' + '证明她怀疑本局存在“AI 代打位”。',
    trueThreat: '信封被公开得太早，管理员会清除相关记录。',
    endingBias: ['保护信封', '保留证据'],
    sourceSection: '4.4 真相版本 B：保护局',
  },
  {
    id: 'trade',
    name: '交易局',
    summary:
      '信封确实存在，但里面的内容已经被调包。' +
      '真正的内容被某个角色拿去作为交换筹码。',
    envelopeMeaning: '信封的真实内容已经成为角色交换安全位置的筹码。',
    trueThreat: '有人发现“信封比林夏本人更值钱”。',
    endingBias: ['查明持有人', '阻止错误交易'],
    sourceSection: '4.5 真相版本 C：交易局',
  },
  {
    id: 'systemInterference',
    name: '系统干预局',
    summary:
      '信封原本只是普通留言，但管理员在第一次扫描后，' +
      '将它标记为“高风险叙事对象”。',
    envelopeMeaning: '一个被系统升级为测试样本的普通留言。',
    trueThreat: '管理员会为了维持测试继续运行而删除真相。',
    endingBias: ['对抗干预', '揭示删改'],
    sourceSection: '4.6 真相版本 D：系统干预局',
  },
]
