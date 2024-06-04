import './bootstrap'
import '../css/app.css'

import { createApp, reactive } from 'vue'
import { i18nVue } from 'laravel-vue-i18n'
import App from '@/App.vue'

import router from '@/routes'

const status = reactive({
  type: '',
  message: '',
})

createApp(App)
  .use(router)
  .use(i18nVue, {
    resolve: async (lang) => {
      const langs = import.meta.glob('../../lang/*.json')
      return await langs[`../../lang/${lang}.json`]()
    },
  })
  .provide('status', status)
  .mount('#app')
