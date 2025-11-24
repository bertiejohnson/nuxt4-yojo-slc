export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const response = await $fetch(`http://127.0.0.1:8181/swetest.php`, {
    query
  })

  return response
})
