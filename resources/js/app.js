import './bootstrap'
import '../css/app.css'

import { createApp } from 'vue'
import { i18nVue } from 'laravel-vue-i18n'
import App from './App.vue'

createApp(App)
  .use(i18nVue, {
    resolve: async (lang) => {
      const langs = import.meta.glob('../../lang/*.json')
      return await langs[`../../lang/${lang}.json`]()
    },
  })
  .mount('#app')
