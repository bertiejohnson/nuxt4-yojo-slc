import { experimental_useObject as useObject } from '@ai-sdk/vue'
import { phrasesSchema } from '@/../shared/zod-schemas'

export default async function useGenerateObject(keywordPairs) {
  const { submit, object, error, clear } = useObject({
    api: '/api/generate-object',
    schema: phrasesSchema,
  })
  try {
    await submit(keywordPairs)
  } catch (e) {
    console.error('ERROR in useGenerateObject:', e)
  }
  return { object }
}
