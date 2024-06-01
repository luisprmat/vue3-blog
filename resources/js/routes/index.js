import { createRouter, createWebHistory } from 'vue-router'

import PostsIndex from '@/Components/Posts/Index.vue'

const routes = [
  {
    path: '/',
    name: 'posts.index',
    component: PostsIndex,
    meta: { title: 'Posts' },
  },
  {
    path: '/posts/create',
    name: 'posts.create',
    component: () => import('@/Components/Posts/Create.vue'),
    meta: { title: 'Add new Post' },
  },
  {
    path: '/posts/edit/:id',
    name: 'posts.edit',
    component: () => import('@/Components/Posts/Edit.vue'),
    meta: { title: 'Edit post' },
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
