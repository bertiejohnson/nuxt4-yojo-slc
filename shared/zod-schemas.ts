import { z } from 'zod';

export const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe('Name of a fictional person.'),
      message: z.string().describe('Message. Do not use emojis or links.'),
      minutesAgo: z.number(),
    }),
  ),
});

export const phrasesSchema = z.object({
  phrases: z.array(
    z.object({
      phrase: z.string().describe('A short phrase.'),
    }),
  ),
});