import type { V3LocationNarrative } from '../../../types/v3Narrative'

export const v3Locations: V3LocationNarrative[] = [
  {
    id: 'seventhDistrict',
    name: '第七街区',
    body:
      `第七街区不是地图上的正式名称。\n\n` +
      `它只是几条旧街、一栋公寓、一家便利店、一间酒吧、` +
      `一处地下活动室和一套没人完全看懂的街区管理系统。\n\n` +
      `这里太小，小到每个人都能说自己只是路过。\n` +
      `这里又太复杂，复杂到没人真的只是路过。`,
    sourceSection: '6.1 第七街区',
  },
  {
    id: 'lateNightStore',
    name: '深夜便利店',
    body: `冷白色灯管把货架照得过分清楚。
收银台边缘有一道新的划痕，像有人最近反复打开过下面的暗格。

店门口的感应铃坏了。
有人进来时，它不响。
有人离开后，它偶尔会响一下。`,
    sourceSection: '6.2 深夜便利店',
  },
  {
    id: 'neonBar',
    name: '霓虹酒吧',
    body: `酒吧今天没有放音乐。
霓虹灯还亮着，但舞台是空的。

许眠坐在吧台最里侧的位置，面前放着一杯没有喝过的水。
有人说林夏昨晚也点过一样的东西。`,
    sourceSection: '6.3 霓虹酒吧',
  },
  {
    id: 'oldApartment',
    name: '旧公寓',
    body: `楼道里有潮气和外卖袋的味道。
墙上的声控灯要咳一声才亮。

林夏住的房门没有被撬开。
但门口那张小广告被人翻到了背面。
背面写着两个字：

“别找。”`,
    sourceSection: '6.4 旧公寓',
  },
  {
    id: 'districtBackend',
    name: '街区后台',
    body: `这里不是普通玩家该看到的界面。
记录被折叠成一行行灰色日志。
大多数信息都显示“已处理”。

你注意到一个问题：
有些内容不是被删除的。
它们是被改写成了“无事发生”。`,
    sourceSection: '6.5 街区后台',
  },
  {
    id: 'undergroundRoom',
    name: '地下活动室',
    body: `门口挂着棋牌室的招牌。
里面没有人在打牌。

桌上的烟灰缸是满的。
椅子却被摆得很整齐。

像是很多人刚刚离开。
也像是有人提前摆好了“很多人刚刚离开”的样子。`,
    sourceSection: '6.6 地下活动室',
  },
]
