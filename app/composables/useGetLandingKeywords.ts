export const useGetLandingKeywords = async (kwps) => await useState('landing-kwp', async () => { // keyword pairs
  const response = await useGenerateObject(kwps)
  // console.log('useGetLW', response, kwps)
})
