<script setup>
import { onMounted, reactive } from 'vue'
import useCategories from '@/composables/categories'
import usePosts from '@/composables/posts'

import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'
import TextareaInput from '@/Components/TextareaInput.vue'
import SelectInput from '@/Components/SelectInput.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'

const { categories, getCategories } = useCategories()
const { storePost } = usePosts()

const post = reactive({
  title: '',
  content: '',
  category_id: '',
})

onMounted(getCategories)
</script>

<template>
  <form @submit.prevent="storePost(post)">
    <!-- Title -->
    <div>
      <InputLabel for="post-title" :value="$t('Title')" />

      <TextInput
        v-model="post.title"
        id="post-title"
        class="mt-1 block w-full"
        autofocus
      />
    </div>

    <!-- Content -->
    <div class="mt-4">
      <InputLabel for="post-content" :value="$t('Content')" />

      <TextareaInput
        v-model="post.content"
        id="post-content"
        class="mt-1 block w-full"
      />
    </div>

    <!-- Category -->
    <div class="mt-4">
      <InputLabel for="post-category" :value="$t('Category')" />

      <SelectInput
        v-model="post.category_id"
        id="post-category"
        class="mt-1 block w-full"
      >
        <option value="" selected>-- {{ $t('Choose category') }} --</option>
        <option v-for="category in categories" :value="category.id">
          {{ category.name }}
        </option>
      </SelectInput>
    </div>

    <!-- Buttons -->
    <div class="mt-4">
      <PrimaryButton>{{ $t('Save') }}</PrimaryButton>
    </div>
  </form>
</template>
