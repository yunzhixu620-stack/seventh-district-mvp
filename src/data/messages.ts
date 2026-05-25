import type { ActionType } from '../types/action'
import type { LocalizedText } from '../types/i18n'
import type { RoleId } from '../types/role'

export const openingBroadcasts: LocalizedText[] = [
  {
    zhCN: '应急端 07：失联事件已登记。信封状态未确认，请勿传播未经验证的地址。',
    en: 'Terminal 07: Contact-loss incident logged. Envelope status unverified; do not circulate unchecked addresses.',
  },
  {
    zhCN: '频点 7：有人最后一次看见林夏在公共终端附近。谁拿到了信封？',
    en: 'Frequency 7: Someone last saw Linxia near the public kiosk. Who has the envelope?',
  },
]

export const openingWhispers: Record<RoleId, LocalizedText> = {
  investigator: {
    zhCN: '何岚：如果你真在帮她，先证明你能保守一条路线。',
    en: 'He Lan: If you are really helping her, prove you can keep one route private.',
  },
  keeper: {
    zhCN: '赵静：不要回应任何要求你读出信封背面的消息。',
    en: 'Zhao Jing: Do not answer anyone asking you to read the back of the envelope.',
  },
  seeker: {
    zhCN: '未知联系人：你的派送编号出现在一条你没有发送的请求里。',
    en: 'Unknown contact: Your courier code appears in a request you did not send.',
  },
  protector: { zhCN: '保持路线离线。', en: 'Keep the route offline.' },
  leaker: { zhCN: '这次消息必须先发出去。', en: 'This time the message must go first.' },
  systemProxy: { zhCN: '记录同步待完成。', en: 'Record synchronization pending.' },
}

export const actionResponses: Record<ActionType, LocalizedText> = {
  ask: { zhCN: '你的问题进入公共频道，回应刻意避开了地址。', en: 'Your question reaches the public feed; the response carefully avoids an address.' },
  probe: { zhCN: '短暂沉默之后，对方发来一项可核验的细节。', en: 'After a pause, the contact sends one detail that can be verified.' },
  disguise: { zhCN: '你的新说辞被暂时接受，视线从你身上移开。', en: 'Your new cover is provisionally accepted; attention shifts away.' },
  trade: { zhCN: '交易完成，但公共频道出现了关于私下接触的影射。', en: 'The exchange succeeds, but the public feed hints at private contact.' },
  follow: { zhCN: '你记录下一段移动轨迹，对方也注意到了脚步。', en: 'You log a movement trail; the target notices footsteps too.' },
  reveal: { zhCN: '你把判断写入公开记录，终端停止接受新的证词。', en: 'You submit your judgment to the public record; the terminal closes testimony.' },
  protect: { zhCN: '你启动安全程序，信封状态转为封存待审。', en: 'You initiate safe procedure; the envelope is sealed for review.' },
}

export const aiPressureByRole: Record<RoleId, LocalizedText[]> = {
  investigator: [
    { zhCN: '何岚：我的窗口记录没有公开目的地。', en: 'He Lan: My desk log contains no public destination.' },
    { zhCN: '阿屿：路线可以核验，但我要知道我被怀疑的理由。', en: 'Ayu: My route can be verified, but I want to know why I am suspect.' },
  ],
  keeper: [
    { zhCN: '阿屿：这是我的派件，请把交接还给正常流程。', en: 'Ayu: This is my delivery. Return the handoff to normal procedure.' },
    { zhCN: '频点 7：不公开信封的人，是否也在阻止救援？', en: 'Frequency 7: Is whoever hides the envelope also blocking help?' },
  ],
  seeker: [
    { zhCN: '应急端 07：你的派送编号出现重复登录。', en: 'Terminal 07: Your courier code shows a duplicate login.' },
    { zhCN: '赵静：真正的交接不要求你先问地址。', en: 'Zhao Jing: A legitimate handoff would not ask for the address first.' },
  ],
  protector: [],
  leaker: [],
  systemProxy: [],
}
