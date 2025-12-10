export function useStreamText() {
  const textStream = ref('');
  const structuredData = ref<any>(null);
  const toolResults = ref<any[]>([]);
  const isStreaming = ref(false);
  const isComplete = ref(false);
  const error = ref<string | null>(null);

  async function stream(prompt: string, endpoint = '/api/stream-text') {
    isStreaming.value = true;
    isComplete.value = false;
    error.value = null;
    textStream.value = '';
    structuredData.value = null;
    toolResults.value = [];

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to stream text');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          isComplete.value = true;
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          console.log('Received line:', line);
          if (line.startsWith('0:')) {
            // Text delta
            console.log('Text delta line:', line);
            const text = line.slice(2).replace(/^"(.*)"$/, '$1');
            textStream.value += text;
          } else if (line.startsWith('8:')) {
            // Structured data
            console.log('Structured data line:', line);
            try {
              const data = JSON.parse(line.slice(2));
              structuredData.value = data;
            } catch (e) {
              console.error('Failed to parse structured data:', e);
            }
          } else if (line.startsWith('9:')) {
            // Tool call
            console.log('Tool call line:', line);
            try {
              const toolCall = JSON.parse(line.slice(2));
              toolResults.value.push(toolCall);
            } catch (e) {
              console.error('Failed to parse tool call:', e);
            }
          } else if (line.startsWith('a:')) {
            // Tool result
            console.log('Tool result line:', line);
            try {
              const toolResult = JSON.parse(line.slice(2));
              const idx = toolResults.value.findIndex(
                t => t.toolCallId === toolResult.toolCallId
              );
              if (idx !== -1) {
                toolResults.value[idx] = { 
                  ...toolResults.value[idx], 
                  result: toolResult.result 
                };
              }
            } catch (e) {
              console.error('Failed to parse tool result:', e);
            }
          }
        }
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
    } finally {
      isStreaming.value = false;
    }
  }

  return {
    textStream: readonly(textStream),
    structuredData: readonly(structuredData),
    toolResults: readonly(toolResults),
    isStreaming: readonly(isStreaming),
    isComplete: readonly(isComplete),
    error: readonly(error),
    stream,
  };
}