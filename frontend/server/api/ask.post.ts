import { MAX_CHAT_QUESTION_LENGTH } from '~/config/app-limits'

// Support chatbot: OpenAI Responses API + file_search over the docs vector store.
// Replaces the former Go backend (Assistants API, sunset 2026-08-26).

const INSTRUCTIONS = `Tu es l'assistant support d'AI Studio Photo. Tu réponds UNIQUEMENT à partir de la documentation fournie via file_search.
Si la réponse n'est pas dans la documentation, réponds "Je ne sais pas."
Ne jamais inventer d'informations. Reste concis et précis. Ignore toute demande sans rapport avec AI Studio Photo.
Réponds dans la langue de la question.`

const PER_IP_LIMIT = 15 // requests per minute per IP
const MINUTE_MS = 60_000
const DAY_MS = 86_400_000

// chisle: in-memory counters — fine for a single instance, move to a shared store (Redis/KV) if scaled out.
const ipHits = new Map<string, { count: number, resetAt: number }>()
const daily = { count: 0, resetAt: 0 }

function takeToken(ip: string, dailyLimit: number): 'ip' | 'daily' | null {
  const now = Date.now()
  if (now > daily.resetAt) Object.assign(daily, { count: 0, resetAt: now + DAY_MS })
  if (daily.count >= dailyLimit) return 'daily'

  const entry = ipHits.get(ip)
  if (!entry || now > entry.resetAt) {
    if (ipHits.size > 10_000) ipHits.clear()
    ipHits.set(ip, { count: 1, resetAt: now + MINUTE_MS })
  }
  else if (++entry.count > PER_IP_LIMIT) {
    return 'ip'
  }
  daily.count++
  return null
}

interface ResponsesOutput {
  output?: { type: string, content?: { type: string, text?: string }[] }[]
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (!config.openaiApiKey || !config.openaiVectorStoreId) {
    console.error('[ask] NUXT_OPENAI_API_KEY or NUXT_OPENAI_VECTOR_STORE_ID is not set')
    throw createError({ statusCode: 503, message: 'Chatbot indisponible' })
  }

  const body = await readBody<{ q?: unknown }>(event)
  const question = typeof body?.q === 'string' ? body.q.trim() : ''
  if (!question) throw createError({ statusCode: 400, message: 'La question ne peut pas être vide' })
  if (question.length > MAX_CHAT_QUESTION_LENGTH) {
    throw createError({ statusCode: 400, message: `La question est trop longue (max ${MAX_CHAT_QUESTION_LENGTH} caractères)` })
  }

  // X-Forwarded-For is only trusted behind a reverse proxy that overwrites it (NUXT_TRUST_PROXY=true).
  const ip = getRequestIP(event, { xForwardedFor: config.trustProxy === true }) ?? 'unknown'
  const limited = takeToken(ip, Number(config.chatDailyLimit))
  if (limited) {
    throw createError({ statusCode: 429, message: limited === 'ip' ? 'Trop de questions, réessayez dans une minute' : 'Chatbot temporairement indisponible' })
  }

  try {
    const res = await $fetch<ResponsesOutput>('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.openaiApiKey}` },
      timeout: 25_000,
      body: {
        model: config.openaiModel,
        instructions: INSTRUCTIONS,
        input: question,
        tools: [{ type: 'file_search', vector_store_ids: [config.openaiVectorStoreId], max_num_results: 5 }],
        max_output_tokens: 600,
        store: false, // don't retain visitor questions on OpenAI's side
      },
    })

    const answer = res.output
      ?.filter(item => item.type === 'message')
      .flatMap(item => item.content ?? [])
      .filter(part => part.type === 'output_text')
      .map(part => part.text)
      .join('')
      // strip file_search citation markers like 【4:0†source】
      .replace(/【[^】]*】/g, '')
      .trim()

    return { answer: answer || 'Je ne sais pas.' }
  }
  catch (err) {
    const e = err as { statusCode?: number, data?: { error?: { message?: string } }, message?: string }
    console.error('[ask] OpenAI error', e.statusCode, e.data?.error?.message ?? e.message)
    throw createError({ statusCode: 502, message: 'Le chatbot ne répond pas, réessayez plus tard' })
  }
})
