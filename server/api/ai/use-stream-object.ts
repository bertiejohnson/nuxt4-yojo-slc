import { createOpenAI } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { phrasesSchema, expandedPhraseSchema } from '#shared/zod-schemas'
import type { ZodObject } from 'zod'

type SchemaKeys = 'phrasesSchema' | 'expandedPhraseSchema'

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({ apiKey })

  return defineEventHandler(async (event) => {
    const context: { request?: string, prompt?: string, schema?: SchemaKeys } = await readBody(event)
    console.log('Received context:', context)

    const prompt = context.prompt ? context.prompt : `Generate a short text based on the request: ${context.request}`

    const schemaMap: Record<SchemaKeys, ZodObject> = {
      phrasesSchema: phrasesSchema,
      expandedPhraseSchema: expandedPhraseSchema
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
