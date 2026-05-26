import type { V3NarrativeText } from '../../../types/v3Narrative'

export const v3HomeCopy: Record<
  'title' | 'subtitle' | 'intro' | 'enter' | 'footer',
  V3NarrativeText
> = {
  title: {
    id: 'home-title',
    body: '第七街区：真人测试',
    sourceSection: '2.1 首页主标题',
  },
  subtitle: {
    id: 'home-subtitle',
    body: '一场真人与 AI 混入的都市夜局。',
    sourceSection: '2.2 首页副标题',
  },
  intro: {
    id: 'home-intro',
    body: `欢迎进入第七街区夜局。

今晚共有六名参与者入场。
有人是真人，有人是 AI，有人会假装成另一个身份。
你不会知道谁在演你。

林夏失联了。
一封信正在街区里流转。
但这不一定是案件，也可能只是一次测试。

选择你的身份。
完成你的目标。
判断谁是真人。
别让别人看穿你。`,
    sourceSection: '2.3 首页主文案',
  },
  enter: {
    id: 'home-enter',
    body: '进入夜局',
    sourceSection: '2.4 首页按钮文案',
  },
  footer: {
    id: 'home-footer',
    body:
      '提示：局内不会标注谁是 AI。' +
      '你只能通过发言、行动、矛盾和局后报告判断。',
    sourceSection: '2.5 首页底部提示',
  },
}
