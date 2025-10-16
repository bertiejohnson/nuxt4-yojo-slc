export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    pageHero: {
      slots: {
        title: 'text-3xl sm:text-5xl font-extrabold',
        container: 'sm:py-2 py-1'
      }
    }
  }
})
