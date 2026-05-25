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
  ask: { zhCN: '你故意让每个人都听见这个问题。雨棚下短暂安静下来，但回答绕开了最要命的地址。', en: 'You make sure everyone hears the question. The awning falls quiet, but the reply circles around the one address that matters.' },
  probe: { zhCN: '你把声音压低，逼对方在沉默和露怯之间选一个。几秒后，一项能核验的细节落进你的手里。', en: 'You lower your voice and make them choose between silence and a tell. Seconds later, one verifiable detail falls into your hand.' },
  disguise: { zhCN: '你把谎话说得像旧事一样自然。对方暂时接受了这个身份，盯着你的视线松开了一寸。', en: 'You tell the lie as if it were an old memory. For now, they accept the identity and their gaze loosens by an inch.' },
  trade: { zhCN: '你递出一部分筹码，换来另一部分真相。可雨夜传言跑得更快，私下会面的痕迹已经被人看见。', en: 'You put one piece on the table and receive another. But rumor runs faster in the rain; someone has noticed the private exchange.' },
  follow: { zhCN: '你踩着积水后的脚印追了半条街，记下了路线。转角处的人没有回头，却突然停了一步。', en: 'You follow wet footprints for half a block and memorize the route. At the corner, the figure does not turn, but misses a single step.' },
  reveal: { zhCN: '你把判断说给全场听。话音落下，所有退路都变成了证词。', en: 'You speak your judgment before everyone. Once the words land, every escape route becomes testimony.' },
  protect: { zhCN: '你将信封推入保护流程，封条在灯下重新压紧。若你判断错了，现在也没有轻易回头的机会。', en: 'You place the envelope into protection and watch the seal press tight beneath the light. If you are wrong, there is no easy retreat now.' },
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
