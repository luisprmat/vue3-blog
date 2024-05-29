<script setup>
import { ref, onMounted, watch } from 'vue'
import usePosts from '@/composables/posts'
import useCategories from '@/composables/categories'
import ColumnSort from '@/Components/ColumnSort.vue'

import { TailwindPagination } from 'laravel-vue-pagination'

const selectedCategory = ref('')
const sort = ref('-created_at')

const { posts, getPosts } = usePosts()
const { categories, getCategories } = useCategories()

onMounted(() => {
  getPosts()
  getCategories()
})

watch(selectedCategory, (current, previous) => {
  getPosts(1, current, sort.value)
})

watch(sort, (current, previous) => {
  getPosts(1, selectedCategory.value, current)
})
</script>

<template>
  <div class="overflow-hidden overflow-x-auto p-1">
    <div class="mb-4">
      <select
        v-model="selectedCategory"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:w-1/4 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
      >
        <option value="" selected>-- {{ $t('Filter by category') }} --</option>
        <option
          v-for="category in categories"
          :value="category.id"
          :key="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="min-w-full align-middle">
      <table
        class="min-w-full divide-y divide-gray-200 border dark:divide-gray-600 dark:border-gray-600"
      >
        <thead>
          <tr>
            <th class="bg-gray-50 px-6 py-3 text-left dark:bg-gray-900">
              <ColumnSort
                column="id"
                v-model="sort"
                active-classes="font-bold text-blue-500 dark:text-blue-400"
                >ID
              </ColumnSort>
            </th>
            <th class="bg-gray-50 px-6 py-3 text-left dark:bg-gray-900">
              <ColumnSort
                column="title"
                v-model="sort"
                active-classes="font-bold text-blue-500 dark:text-blue-400"
                >{{ $t('Title') }}
              </ColumnSort>
            </th>
            <th class="bg-gray-50 px-6 py-3 text-left dark:bg-gray-900">
              <ColumnSort
                column="category"
                v-model="sort"
                active-classes="font-bold text-blue-500 dark:text-blue-400"
              >
                {{ $t('Category') }}
              </ColumnSort>
            </th>
            <th class="bg-gray-50 px-6 py-3 text-left dark:bg-gray-900">
              <span
                class="text-sm font-medium uppercase leading-4 tracking-wider text-gray-500 dark:text-gray-400"
                >{{ $t('Content') }}</span
              >
            </th>
            <th class="bg-gray-50 px-6 py-3 text-left dark:bg-gray-900">
              <ColumnSort
                column="created_at"
                v-model="sort"
                active-classes="font-bold text-blue-500 dark:text-blue-400"
                >{{ $t('Created at') }}
              </ColumnSort>
            </th>
          </tr>
        </thead>
        <tbody
          class="divide-y divide-solid divide-gray-200 dark:divide-gray-600"
        >
          <tr v-for="post in posts.data">
            <td
              class="whitespace-no-wrap px-6 py-4 text-sm leading-5 text-gray-900 dark:text-gray-100"
            >
              {{ post.id }}
            </td>
            <td
              class="whitespace-no-wrap px-6 py-4 text-sm leading-5 text-gray-900 dark:text-gray-100"
            >
              {{ post.title }}
            </td>
            <td
              class="whitespace-no-wrap px-6 py-4 text-sm leading-5 text-gray-900 dark:text-gray-100"
            >
              {{ post.category }}
            </td>
            <td
              class="whitespace-no-wrap px-6 py-4 text-sm leading-5 text-gray-900 dark:text-gray-100"
            >
              {{ post.content }}
            </td>
            <td
              class="whitespace-no-wrap px-6 py-4 text-sm leading-5 text-gray-900 dark:text-gray-100"
            >
              {{ post.created_at }}
            </td>
          </tr>
        </tbody>
      </table>

      <TailwindPagination
        :data="posts"
        @pagination-change-page="
          (page) => getPosts(page, selectedCategory, sort)
        "
        class="mt-4"
        :item-classes="['dark:bg-gray-800', 'dark:border-gray-600']"
        :active-classes="['bg-blue-50', 'dark:bg-gray-700']"
      />
    </div>
  </div>
</template>
