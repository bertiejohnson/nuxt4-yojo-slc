export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      secondary: 'teal',
      neutral: 'stone'
    },
    pageHero: {
      slots: {
        title: 'text-xl sm:text-3xl font-bold',
        headline: 'mb-2 text-lg font-bold',
        container: 'sm:py-2 py-1',
        body: 'mt-0'
      }
    },
    formField: {
      slots: {
        label: 'font-bold text-slate-800'
      }
    }
  }
})
