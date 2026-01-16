import { createOpenAI } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { phrasesSchema, expandedPhraseSchema } from '#shared/zod-schemas'

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({ apiKey })

  return defineEventHandler(async (event: any) => {
    const context = await readBody(event)
    console.log('Context received in use-stream-object:', context)
    const prompt = context.prompt ? context.prompt : 'sun - moon aspects in a natal chart'
    const schemaMap: Record<string, any> = {
      'phrasesSchema': phrasesSchema,
      'expandedPhraseSchema': expandedPhraseSchema
    }

    // Validate schema
    if (!context.schema || !schemaMap[context.schema]) {
      throw new Error('Invalid or missing schema in context')
    }
    const schema = schemaMap[context.schema]

    // Stream generated notifications as objects
    const result = streamObject({
      model: openai('gpt-4.1'),
      prompt,
      schema: schema
    })

    return result.toTextStreamResponse({
      headers: {
        'Content-Type': 'text/event-stream'
      }
    })
  })
})
