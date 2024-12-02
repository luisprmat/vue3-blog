<script setup>
import { trans } from 'laravel-vue-i18n'
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

const route = useRoute()
const currentPageTitle = ref('')

watch(
  () => route.meta.title,
  (current) => (currentPageTitle.value = trans(current)),
  { inmediate: true }
)
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2
        class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
      >
        {{ currentPageTitle }}
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
