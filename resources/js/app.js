import './bootstrap'
import '../css/app.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { i18nVue } from 'laravel-vue-i18n'
import App from '@/App.vue'
import PostCreate from '@/Components/Posts/Create.vue'
import PostIndex from '@/Components/Posts/Index.vue'

const routes = [
  { path: '/', name: 'posts.index', component: PostIndex },
  { path: '/posts/create', name: 'posts.create', component: PostCreate },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .use(i18nVue, {
    resolve: async (lang) => {
      const langs = import.meta.glob('../../lang/*.json')
      return await langs[`../../lang/${lang}.json`]()
    },
  })
  .mount('#app')
