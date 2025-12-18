import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({ apiKey })

  return defineEventHandler(async (event: any) => {
    const context = await readBody(event)

    console.log('Context received in use-stream-text:', context)

    const prompt = context.prompt ? context.prompt : 'sun - moon aspects in a natal chart'

    const result = streamText({
      model: openai('gpt-4.1'),
      prompt
    })

    return result.toTextStreamResponse()
  })
})
