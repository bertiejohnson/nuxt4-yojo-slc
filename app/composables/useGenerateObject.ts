import { experimental_useObject as useObject } from '@ai-sdk/vue'

export default async function useGenerateObject(keywordPairs) {
  const { submit, object, error, clear } = useObject({
    api: 'api/use-object',
  })
  try {
    await submit(keywordPairs)
  } catch (e) {
    console.error('ERROR in useGenerateObject:', e)
  }
  return { object }
}
