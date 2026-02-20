import { date } from "zod"

export default defineEventHandler((event) => {
  console.log('New request: ' + getRequestURL(event) + Date.now().toString())
})
