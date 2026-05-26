import type { V3ExtraNpc } from '../../../types/v3Narrative'

export const fourteenthPerson: V3ExtraNpc = {
  id: 'fourteenthPerson',
  name: '第十四人',
  activationRules: [
    '玩家在前半局多次追问“谁是 AI”。',
    '管理员关注达到高以上。',
    '信封内容版本为系统编号。',
    '玩家成功识别两名异常角色。',
    '公共频道中“真人”“AI”“测试”等关键词过热。',
  ],
  entranceMessage: `【公共频道｜未知用户】

你们少算了一个人。`,
  anomalyText: `角色列表刷新了一次。
人数没有变化。

但你确信，刚才多了一张脸。`,
  privateMessage: `你一直在问谁是 AI。

那你有没有想过：
如果一个人知道自己是 AI，
他还会不会努力装成人？`,
  purpose: [
    '第七街区不只有固定六人局。',
    'AI 角色可能意识到自己正在被观察。',
    '后续版本会出现更多异常参与者。',
    '玩家发现“多出来的人”本身就是高阶彩蛋。',
  ],
  sourceSection: '16. 彩蛋 NPC：多出来的人',
}
