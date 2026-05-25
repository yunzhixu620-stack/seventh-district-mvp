const MODEL = '@cf/zai-org/glm-4.7-flash'
const productionOrigin = 'https://yunzhixu620-stack.github.io'

const allowedOrigin = (origin) =>
  origin === productionOrigin ||
  origin === 'http://localhost:5173' ||
  origin === 'http://127.0.0.1:4173'

const cors = (origin) => ({
  'Access-Control-Allow-Origin': allowedOrigin(origin) ? origin : productionOrigin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
  Vary: 'Origin',
})

const takeText = (value, language) => {
  if (!value || typeof value !== 'object') return ''
  return String(value[language] ?? value.en ?? value.zhCN ?? '').slice(0, 320)
}

const cleanRequest = (value) => {
  if (!value || typeof value !== 'object') return null
  const locale = value.locale === 'en' ? 'en' : 'zhCN'
  const actionType = typeof value.actionType === 'string' ? value.actionType.slice(0, 16) : 'ask'
  const utterance = typeof value.utterance === 'string' ? value.utterance.trim().slice(0, 360) : ''
  if (!utterance) return null
  return {
    locale,
    actionType,
    utterance,
    round: Number.isFinite(value.round) ? Math.max(1, Math.min(12, value.round)) : 1,
    exposureBand: ['low', 'rising', 'high'].includes(value.exposureBand) ? value.exposureBand : 'low',
    location: takeText(value.location, locale),
    player: {
      identity: takeText(value.player?.publicIdentity, locale),
    },
    target: {
      name: takeText(value.target?.name, locale),
      identity: takeText(value.target?.publicIdentity, locale),
      posture: takeText(value.target?.posture, locale),
    },
    allowedEvidence: Array.isArray(value.allowedEvidence)
      ? value.allowedEvidence.slice(0, 4).map((text) => takeText(text, locale)).filter(Boolean)
      : [],
  }
}

const promptFor = (input) => {
  const language = input.locale === 'en' ? 'English' : 'Simplified Chinese'
  const evidence = input.allowedEvidence.length
    ? input.allowedEvidence.map((item) => `- ${item}`).join('\n')
    : '- No new verified fact may be revealed in this exchange.'
  return [
    {
      role: 'system',
      content:
        `You are an improvisational actor inside a pixel-noir social deduction game. Respond in ${language}. ` +
        'You play only the TARGET character. Be tense, human and concise. The player should feel their exact wording changed your reaction. ' +
        'Never announce game rules. Never state any factual clue unless it appears under ALLOWED EVIDENCE. ' +
        'You may hesitate, deflect, accuse, bargain or lie about your intention, but never invent events, locations, identities or evidence. ' +
        'Return JSON only with keys line, gesture, subtext, mood. mood must be guarded, shaken, warm, defiant, or calculating. ' +
        'line is 1-3 spoken sentences; gesture and subtext each one short sentence.',
    },
    {
      role: 'user',
      content:
        `SCENE: ${input.location}; round ${input.round}; exposure ${input.exposureBand}.\n` +
        `PLAYER: ${input.player.identity}.\n` +
        `TARGET: ${input.target.name}, ${input.target.identity}; posture: ${input.target.posture}.\n` +
        `TACTIC: ${input.actionType}.\nPLAYER SAYS: "${input.utterance}"\n` +
        `ALLOWED EVIDENCE:\n${evidence}\nPerform the target reaction now.`,
    },
  ]
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') ?? productionOrigin
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin) })
    }
    if (request.method !== 'POST' || new URL(request.url).pathname !== '/perform') {
      return Response.json({ error: 'Not found' }, { status: 404, headers: cors(origin) })
    }
    if (!allowedOrigin(origin)) {
      return Response.json({ error: 'Origin rejected' }, { status: 403, headers: cors(origin) })
    }

    const input = cleanRequest(await request.json().catch(() => null))
    if (!input) {
      return Response.json({ error: 'Invalid performance request' }, { status: 400, headers: cors(origin) })
    }

    const completion = await env.AI.run(MODEL, {
      messages: promptFor(input),
      response_format: {
        type: 'json_schema',
        json_schema: {
          type: 'object',
          properties: {
            line: { type: 'string' },
            gesture: { type: 'string' },
            subtext: { type: 'string' },
            mood: { type: 'string', enum: ['guarded', 'shaken', 'warm', 'defiant', 'calculating'] },
          },
          required: ['line', 'gesture', 'subtext', 'mood'],
          additionalProperties: false,
        },
      },
      max_completion_tokens: 230,
      temperature: 0.82,
      chat_template_kwargs: { enable_thinking: false },
    })
    const raw = completion?.choices?.[0]?.message?.content ?? completion?.response ?? '{}'
    const parsed = JSON.parse(typeof raw === 'string' ? raw : JSON.stringify(raw))
    const moods = new Set(['guarded', 'shaken', 'warm', 'defiant', 'calculating'])
    const result = {
      line: String(parsed.line ?? '').slice(0, 360),
      gesture: String(parsed.gesture ?? '').slice(0, 180),
      subtext: String(parsed.subtext ?? '').slice(0, 180),
      mood: moods.has(parsed.mood) ? parsed.mood : 'guarded',
      model: MODEL,
      mode: 'live',
    }
    if (!result.line || !result.gesture || !result.subtext) {
      return Response.json({ error: 'Empty actor performance' }, { status: 502, headers: cors(origin) })
    }
    return Response.json(result, { headers: cors(origin) })
  },
}
