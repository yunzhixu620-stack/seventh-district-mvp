import type { ActorPerformance, PerformanceRequest } from '../types/ai'
import { localize } from '../types/i18n'

const endpoint =
  (import.meta.env.VITE_AI_ENDPOINT as string | undefined) ??
  'https://seventh-district-actor.yunzhixu620.workers.dev/perform'

const fallbackPerformance = (request: PerformanceRequest): ActorPerformance => ({
  line:
    request.locale === 'zhCN'
      ? `“你把话说得太直了。”${localize(request.target.name, 'zhCN')}压低声音，“先告诉我，你打算拿这句话换什么？”`
      : `"You said that too plainly." ${localize(request.target.name, 'en')} lowers their voice. "Tell me what you hope to buy with it."`,
  gesture:
    request.locale === 'zhCN'
      ? '对方的手停在衣袋边缘，没有真正放松。'
      : 'Their hand pauses at the pocket edge without truly relaxing.',
  subtext:
    request.locale === 'zhCN' ? '这是一段离线替补表演；真实 AI 通道暂未响应。' : 'This is an offline fallback performance; the live AI channel did not respond.',
  mood: 'guarded',
  model: 'authored-fallback',
  mode: 'fallback',
})

export const requestActorPerformance = async (request: PerformanceRequest): Promise<ActorPerformance> => {
  if (!endpoint) return fallbackPerformance(request)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
    if (!response.ok) return fallbackPerformance(request)
    return (await response.json()) as ActorPerformance
  } catch {
    return fallbackPerformance(request)
  }
}
