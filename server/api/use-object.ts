import { createOpenAI } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { notificationSchema, phrasesSchema } from '#shared/zod-schemas'

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({ apiKey })

  return defineEventHandler(async (event: any) => {
    const context = await readBody(event)
    console.log('Context', context, context.schema, context.pair)

    // Stream generated notifications as objects
    const result = streamObject({
      model: openai('gpt-4.1'),
      prompt: `Generate 5 notifications for a messages app in this context: ${context.pair}. Use an emoji at the end of each notification. Respond in JSON format according to the provided schema.`,
      schema: context.schema === 'notificationSchema' ? notificationSchema : phrasesSchema
    })

    return result.toTextStreamResponse({
      headers: {
        'Content-Type': 'text/event-stream'
      }
    })
  })
})
