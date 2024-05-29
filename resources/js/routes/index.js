import { createRouter, createWebHistory } from 'vue-router'

import PostsIndex from '@/Components/Posts/Index.vue'
import PostsCreate from '@/Components/Posts/Create.vue'

const routes = [
  {
    path: '/',
    name: 'posts.index',
    component: PostsIndex,
  },
  {
    path: '/posts/create',
    name: 'posts.create',
    component: PostsCreate,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
