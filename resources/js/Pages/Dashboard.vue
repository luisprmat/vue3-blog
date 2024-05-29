<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import PostsIndex from '../Components/Posts/Index.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2
        class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
      >
        {{ $t('Dashboard') }}
      </h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
        >
          <div class="p-6 text-gray-900 dark:text-gray-100">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
