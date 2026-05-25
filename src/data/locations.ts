import type { LocalizedText } from '../types/i18n'

export const locations: Record<string, { name: LocalizedText; atmosphere: LocalizedText }> = {
  kiosk: {
    name: { zhCN: '七街公共终端亭', en: 'Seventh Street Public Kiosk' },
    atmosphere: { zhCN: '雨水顺着屏幕边沿滑落，失真的警报仍在刷新。', en: 'Rain slips down the display while distorted alerts keep refreshing.' },
  },
  arcade: {
    name: { zhCN: '闭灯商业廊', en: 'Darkened Arcade' },
    atmosphere: { zhCN: '卷帘门之后传来短促脚步，像一次被打断的交接。', en: 'Brief footsteps behind shutters suggest an interrupted hand-off.' },
  },
  footbridge: {
    name: { zhCN: '高架步行桥', en: 'Elevated Footbridge' },
    atmosphere: { zhCN: '列车停运后的轨道反着冷光，没有人愿意久留。', en: 'Idle rails return cold light after service stops; nobody lingers.' },
  },
}
