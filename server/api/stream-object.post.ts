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

    // Create a custom stream that sends partial objects
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()

        for await (const partialObject of result.partialObjectStream) {
          const data = JSON.stringify(partialObject) + '\n'
          controller.enqueue(encoder.encode(data))
        }

        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })
  })
})
