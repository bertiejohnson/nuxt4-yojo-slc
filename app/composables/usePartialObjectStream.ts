export function usePartialObjectStream<T = any>() {
  const partialObject = ref<Partial<T>>({})
  const isStreaming = ref(false)
  const isComplete = ref(false)
  const error = ref<string | null>(null)

  async function stream(prompt: string) {
    isStreaming.value = true
    isComplete.value = false
    error.value = null
    partialObject.value = {}

    try {
      const response = await fetch('/api/use-object', { // /api/generate
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })

      if (!response.ok) {
        throw new Error('Failed to stream object')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No reader available')
      }

      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          isComplete.value = true
          break
        }

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')

        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.trim()) {
            try {
              const partial = JSON.parse(line)
              partialObject.value = partial
            } catch (e) {
              console.error('Failed to parse partial:', e)
            }
          }
        }
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isStreaming.value = false
    }
  }

  return {
    partialObject: readonly(partialObject),
    isStreaming: readonly(isStreaming),
    isComplete: readonly(isComplete),
    error: readonly(error),
    stream
  }
}
