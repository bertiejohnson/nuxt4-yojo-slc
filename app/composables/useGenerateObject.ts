import { experimental_useObject as useObject } from '@ai-sdk/vue'

export default async function useGenerateObject(keywordPairs) {
  const { submit, object, error, clear } = useObject({
    api: 'api/use-object',
  })

  const getObject = () => submit(keywordPairs)
  await getObject()

  if (error) {
    console.log('ERROR in useGenerateObject:', error)
  }

  return { object }
}
