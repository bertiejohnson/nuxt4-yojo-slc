import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

const openai = createOpenAI({
  apiKey: useRuntimeConfig().openaiApiKey,
});

export default defineEventHandler(async (event) => {
  const { prompt } = await readBody(event);

  console.log('Structured output schema set up.');
  const result = await streamText({
    model: openai('gpt-4.1'),
    prompt: prompt || 'List 5 popular programming languages with brief descriptions',
    // Use structured output to extract array data
    experimental_output: z.object({
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
      })),
      summary: z.string(),
    }),
  });

  return result.toTextStreamResponse();
});