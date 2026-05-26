import type {
  V3ClueNarrative,
  V3NarrativeText,
} from '../../../types/v3Narrative'

export const envelopeNarratives: V3NarrativeText[] = [
  {
    id: 'envelope-base',
    body: `一个没有署名的牛皮纸信封。
封口没有胶水，只被折了两下。

外侧写着一行字：

“不要交给最想证明自己清白的人。”`,
    sourceSection: '7.1 信封基础描述',
  },
  {
    id: 'envelope-list',
    body: `里面是一张手写名单。

名单上没有姓名，只有六种描述：

1. 第一个主动帮忙的人
2. 永远要求讲证据的人
3. 不承认自己认识林夏的人
4. 把所有事都说成误会的人
5. 过于像真人的人
6. 过于不像真人的人`,
    sourceSection: '7.2 信封可能内容 A：名单',
  },
  {
    id: 'envelope-note',
    body: `里面是一张被折过很多次的便签。

林夏写道：

“如果你读到这张纸，说明我暂时安全。
别急着找我。
先看他们会怎么解释我的消失。”`,
    sourceSection: '7.3 信封可能内容 B：留言',
  },
  {
    id: 'envelope-empty',
    body: `信封是空的。

但里面有明显的压痕。
曾经有一张卡片或照片被放在这里。

最麻烦的不是信封里有什么。
而是现在谁拿走了它。`,
    sourceSection: '7.4 信封可能内容 C：空信封',
  },
  {
    id: 'envelope-system-code',
    body: `信封里只有一张打印纸。

纸上是一串系统编号：

TEST-7D-HUMAN-MIXED-ROLE-SAMPLE

编号下面有一行小字：

“异常样本：行为过度接近真实参与者。”`,
    sourceSection: '7.5 信封可能内容 D：系统编号',
  },
]

export const v3Clues: V3ClueNarrative[] = [
  {
    id: 'storeReceipt',
    name: '便利店小票',
    body: `小票时间是 21:02。
购买内容只有两样：

矿泉水。
空白信封。

收银员备注栏里多打了一个字：

“等。”`,
    kind: 'clue',
    sourceSection: '8.1 线索：便利店小票',
  },
  {
    id: 'channelScreenshot',
    name: '公共频道截图',
    body: `截图里，管理员删除了一条消息。

被删除的消息只剩下前半句：

“如果林夏不是退出测试，那她是——”`,
    kind: 'clue',
    sourceSection: '8.2 线索：公共频道截图',
  },
  {
    id: 'unsentMessage',
    name: '未发送短信',
    body: `林夏手机里有一条未发送短信。

收件人未知。
内容是：

“我不怕 AI 装成人，我怕人开始装成 AI。”`,
    kind: 'clue',
    sourceSection: '8.3 线索：未发送短信',
  },
  {
    id: 'storeCompartment',
    name: '便利店暗格',
    body: `收银台下面确实有暗格。
但暗格里没有信封。

里面只有一张便利贴：

“如果你找到这里，说明有人让你来得太晚。”`,
    kind: 'clue',
    sourceSection: '8.4 线索：便利店暗格',
  },
  {
    id: 'xuMianGlass',
    name: '许眠的杯子',
    body: `许眠说她不认识林夏。
但她面前那杯水放了两片柠檬。

酒吧菜单上没有这个选项。
老板说，只有林夏会这么点。`,
    kind: 'clue',
    sourceSection: '8.5 线索：许眠的杯子',
  },
  {
    id: 'administratorLog',
    name: '管理员日志',
    body: `日志显示：

21:15 删除公共频道消息。
21:18 折叠“林夏”关键词。
21:21 降低“信封”相关内容可见度。
21:24 向一名参与者发送安抚提示。

执行理由统一为：

“避免错误叙事扩散。”`,
    kind: 'clue',
    sourceSection: '8.6 线索：管理员日志',
  },
  {
    id: 'redStain',
    name: '红色污迹',
    body: `便利店门口有一小片红色污迹。

闻起来像铁锈。
但仔细看，旁边有半个破掉的番茄酱包。

它可以证明有人匆忙离开。
但不能证明发生了暴力事件。`,
    kind: 'redHerring',
    sourceSection: '8.7 红鲱鱼：红色污迹',
  },
  {
    id: 'aRanVideo',
    name: '阿燃的偷拍视频',
    body: `阿燃声称自己拍到了林夏最后出现的画面。

视频里确实有一个像林夏的人走进巷子。
但画面太暗，声音被剪掉，时间戳也不完整。

它像证据。
也像一个很懂证据该长什么样的人做出来的东西。`,
    kind: 'redHerring',
    sourceSection: '8.8 红鲱鱼：阿燃的偷拍视频',
  },
  {
    id: 'jiangChiCommission',
    name: '江池的委托函',
    body: `江池拿出一封委托函。
纸张、格式、签名都很完整。

完整得有些不正常。

真正的委托人通常不会把每个漏洞都填得这么干净。`,
    kind: 'redHerring',
    sourceSection: '8.9 红鲱鱼：江池的委托函',
  },
]
