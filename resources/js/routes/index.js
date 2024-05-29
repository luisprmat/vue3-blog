import { createRouter, createWebHistory } from 'vue-router'

import PostsIndex from '@/Components/Posts/Index.vue'

const routes = [
  {
    path: '/',
    name: 'posts.index',
    component: PostsIndex,
  },
  {
    path: '/posts/create',
    name: 'posts.create',
    component: () => import('@/Components/Posts/Create.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
