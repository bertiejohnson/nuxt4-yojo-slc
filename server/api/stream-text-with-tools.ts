import { streamText, tool } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

const openai = createOpenAI({
  apiKey: useRuntimeConfig().openaiApiKey,
});

export default defineEventHandler(async (event) => {
  const { prompt } = await readBody(event);

  const result = await streamText({
    model: openai('gpt-4.1'),
    prompt: prompt || 'Generate a list of 5 healthy breakfast ideas',
    tools: {
      generateList: tool({
        description: 'Generate a structured list of items',
        parameters: z.object({
          items: z.array(z.object({
            name: z.string(),
            description: z.string(),
            tags: z.array(z.string()),
          })),
        }),
        execute: async ({ items }) => {
          // This executes on the server and returns data
          return { success: true, count: items.length, items };
        },
      }),
    },
  });

  return result.toTextStreamResponse();
});