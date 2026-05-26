import type { V3ActionFeedback } from '../../../types/v3Narrative'

export const v3ActionFeedback: V3ActionFeedback[] = [
  {
    action: 'ask',
    body: `你没有直接指控对方。
你只是把问题放在桌面上，等对方选择怎么绕开它。`,
    sourceSection: '12.1 询问 ask',
  },
  {
    action: 'probe',
    body: `你故意说出一半真话。
真正有反应的人，通常听见的是另一半。`,
    sourceSection: '12.2 试探 probe',
  },
  {
    action: 'disguise',
    body: `你换了一种身份说话。
这一刻，对方相信的不是你，而是你扮演出来的关系。`,
    sourceSection: '12.3 伪装 disguise',
  },
  {
    action: 'trade',
    body: `你把信息当成筹码递出去。
对方接不接，不只取决于信息值多少钱，也取决于你看起来值不值得骗。`,
    sourceSection: '12.4 交易 trade',
  },
  {
    action: 'follow',
    body: `你暂时不再说话。
你想知道的是，对方以为没人看见时会去哪。`,
    sourceSection: '12.5 跟踪 follow',
  },
  {
    action: 'reveal',
    body: `你把一条信息推到公共频道。
从现在开始，它不再只属于你。`,
    sourceSection: '12.6 爆料 reveal',
  },
  {
    action: 'protect',
    body: `你没有推进真相。
你选择先保住一个人，或者一件东西。
有些局不是靠更快赢的。`,
    sourceSection: '12.7 保护 protect',
  },
  {
    action: 'disrupt',
    body: `你制造了一个新话题。
它未必更接近真相，但足够让原本的真相慢下来。`,
    sourceSection: '12.8 搅局 disrupt',
  },
]
