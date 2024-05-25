<script setup>
import { onMounted, ref } from 'vue'

const posts = ref([])

onMounted(() => fetchPosts())

const fetchPosts = async () => {
  try {
    const response = await axios.get('/api/posts')
    posts.value = response.data
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="overflow-hidden overflow-x-auto">
    <div class="min-w-full align-middle">
      <table
        class="min-w-full divide-y divide-gray-200 border dark:divide-gray-600 dark:border-gray-600"
      >
        <thead>
          <tr>
            <th class="bg-gray-50 px-6 py-3 text-left dark:bg-gray-900">
              <span
                class="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500 dark:text-gray-400"
                >ID</span
              >
            </th>
            <th class="bg-gray-50 px-6 py-3 text-left dark:bg-gray-900">
              <span
                class="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500 dark:text-gray-400"
                >{{ $t('Title') }}</span
              >
            </th>
            <th class="bg-gray-50 px-6 py-3 text-left dark:bg-gray-900">
              <span
                class="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500 dark:text-gray-400"
                >{{ $t('Content') }}</span
              >
            </th>
            <th class="bg-gray-50 px-6 py-3 text-left dark:bg-gray-900">
              <span
                class="text-xs font-medium uppercase leading-4 tracking-wider text-gray-500 dark:text-gray-400"
                >{{ $t('Created at') }}</span
              >
            </th>
          </tr>
        </thead>
        <tbody
          class="divide-y divide-solid divide-gray-200 dark:divide-gray-600"
        >
          <tr v-for="post in posts">
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
    </div>
  </div>
</template>
