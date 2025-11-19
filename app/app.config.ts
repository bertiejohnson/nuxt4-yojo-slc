export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      secondary: 'teal',
      neutral: 'stone'
    },
    pageHero: {
      slots: {
        title: 'text-3xl sm:text-5xl font-extrabold',
        container: 'sm:py-2 py-1'
      }
    },
    formField: {
      slots: {
        label: 'font-bold text-slate-800'
      }
    }
  }
})
