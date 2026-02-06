import { z } from 'zod'

export const phrasesSchema = z.object({
  phrases: z.array(
    z.object({
      phrase: z.string().describe('A short phrase of several sentences.')
    })
  )
})

export const expandedPhraseSchema = z.object({
  phrase: z.array(
    z.object({
      expandedPhrase: z.object({
        paragraphs: z.array(z.string()).describe('An array of paragraphs expanding on the original phrase.')
      }).describe('An expanded but brief expansion on the original phrase.')
    })
  )
})