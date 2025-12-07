import { createOpenAI } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { z } from 'zod'

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({ apiKey })

  return defineEventHandler(async (event) => {
    const context = await readBody(event)
    const prompt = context.prompt ? context.prompt : `Generate short phrases of two to three sentences for each of the keyword pairs in: ${context.request}. Do not include the keyword pair itself.`

    const result = await streamObject({
      model: openai('gpt-4.1'),
      prompt,
      schema: z.object({
        phrases: z.array(z.string())
      })
    })

    return result.toTextStreamResponse()
  })
})
