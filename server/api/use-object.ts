import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
// import { notificationSchema } from '~/shared/notification-schema'

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({ apiKey })

  return defineEventHandler(async (event) => {
    const context = await readBody(event)
    const prompt = context.prompt ? context.prompt : `Generate short phrases of two to three sentences for each of the keyword pairs in: ${context.request}. Do not include the keyword pair itself.`

    const { object } = await generateObject({
      model: openai('gpt-4.1'),
      prompt,
      schema: z.object({
        phrases: z.array(z.string())
      })
    })
    return { object }
  })
})
