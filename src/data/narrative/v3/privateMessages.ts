import type { V3NarrativeMessage } from '../../../types/v3Narrative'

export const v3PrivateMessages: V3NarrativeMessage[] = [
  {
    id: 'xumian-quiet',
    sender: 'xuMian',
    channel: 'private',
    trigger: 'contactXuMian',
    body: `你别在公共频道提林夏。
那里不是说真话的地方。`,
    sourceSection: '10.1 许眠给玩家',
  },
  {
    id: 'xumian-question',
    sender: 'xuMian',
    channel: 'private',
    trigger: 'contactXuMian',
    body: `如果你真的想帮她，就先别问“她在哪”。
先问“谁最想让别人去找她”。`,
    sourceSection: '10.1 许眠给玩家',
  },
  {
    id: 'laozhou-danger',
    sender: 'laoZhou',
    channel: 'private',
    trigger: 'contactLaoZhou',
    body: `我不知道你听谁说的。
但有些东西不是不想给，是给错人会出事。`,
    sourceSection: '10.2 老周给玩家',
  },
  {
    id: 'laozhou-store',
    sender: 'laoZhou',
    channel: 'private',
    trigger: 'contactLaoZhou',
    body: `你要是真为她好，就别把便利店写进频道。
他们都看得到。`,
    sourceSection: '10.2 老周给玩家',
  },
  {
    id: 'jiangchi-trade',
    sender: 'jiangChi',
    channel: 'private',
    trigger: 'contactJiangChi',
    body: `你手里有便利店那条线，对吧？
我可以拿别的信息换。
别急着拒绝。
你一个人查不完这条街。`,
    sourceSection: '10.3 江池给玩家',
  },
  {
    id: 'jiangchi-motive',
    sender: 'jiangChi',
    channel: 'private',
    trigger: 'contactJiangChi',
    body: `你以为我在找信封。
也许我只是在找那个最怕信封被找到的人。`,
    sourceSection: '10.3 江池给玩家',
  },
  {
    id: 'aran-shot',
    sender: 'aRan',
    channel: 'private',
    trigger: 'contactARan',
    body: `你想不想知道，今晚谁最先提到林夏？
我有截图。
但我不白给。`,
    sourceSection: '10.4 阿燃给玩家',
  },
  {
    id: 'aran-spread',
    sender: 'aRan',
    channel: 'private',
    trigger: 'contactARan',
    body: `如果你准备爆料，先告诉我。
我可以让它看起来像自然扩散。`,
    sourceSection: '10.4 阿燃给玩家',
  },
  {
    id: 'admin-node',
    sender: 'administrator',
    channel: 'private',
    trigger: 'highRiskNarrative',
    body: `你正在接触高风险叙事节点。

建议：
暂停传播。
确认来源。
降低情绪化判断。`,
    sourceSection: '10.5 管理员给玩家',
  },
  {
    id: 'admin-identity',
    sender: 'administrator',
    channel: 'private',
    trigger: 'guessController',
    body: `你似乎正在尝试判断谁是真人。

提醒：
本局不鼓励基于语言风格进行参与者身份攻击。`,
    sourceSection: '10.5 管理员给玩家',
  },
]
