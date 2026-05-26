import type { V3StreetMeterCopy } from '../../../types/v3Narrative'

export const v3StreetStateCopy: V3StreetMeterCopy[] = [
  {
    id: 'streetHeat',
    name: '街区热度',
    levels: [
      {
        label: '平静',
        body: '街区还把这当成一次普通迟到。',
      },
      {
        label: '升温',
        body: '越来越多人开始围绕林夏和信封发言。',
      },
      {
        label: '紧绷',
        body: '公共频道已经不再讨论事实，只在讨论谁有问题。',
      },
      {
        label: '失控',
        body: '管理员开始频繁折叠消息。有人正在利用混乱行动。',
      },
    ],
    sourceSection: '13.1 街区热度',
  },
  {
    id: 'adminAttention',
    name: '管理员关注',
    levels: [
      {
        label: '低',
        body: '管理员只发布常规提醒。',
      },
      {
        label: '中',
        body: '管理员开始主动纠正部分说法。',
      },
      {
        label: '高',
        body: '管理员正在降低某些话题可见度。',
      },
      {
        label: '异常',
        body: '管理员不再解释，只开始处理。',
      },
    ],
    sourceSection: '13.2 管理员关注',
  },
  {
    id: 'evidenceRisk',
    name: '证据风险',
    levels: [
      {
        label: '安全',
        body: '关键物还没有被大多数人确认。',
      },
      {
        label: '不稳',
        body: '至少两名角色已经意识到关键物存在。',
      },
      {
        label: '危险',
        body: '有人正在接近关键物或持有人。',
      },
      {
        label: '临界',
        body: '如果不行动，关键物可能在结算前消失。',
      },
    ],
    sourceSection: '13.3 证据风险',
  },
  {
    id: 'publicOpinion',
    name: '公共舆论',
    levels: [
      {
        label: '分散',
        body: '话题尚未形成一致指向。',
      },
      {
        label: '偏移',
        body: '一个说法正在获得更多响应。',
      },
      {
        label: '定向',
        body: '公共频道正把压力集中到一个对象。',
      },
      {
        label: '裹挟',
        body: '舆论已经足以迫使角色改变行动。',
      },
    ],
    sourceSection:
      'V3 Non-negotiable Acceptance Gate；派生状态文案，非剧情事实',
  },
]
