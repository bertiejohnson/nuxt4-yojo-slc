import { Chat } from '@ai-sdk/vue'
import { experimental_useObject as useObject } from '@ai-sdk/vue'
// import { notificationSchema } from '~/shared/notification-schema';

const chat = new Chat({})

export default async () => {
  try {
    const data = await import('~/assets/json/planet-keywords.json')

    // await chat.sendMessage({ text: 'How are you?' })
    // console.log('Chat Messages', chat.messages)

    return data.default
  } catch (error) {
    return null
  }
}
