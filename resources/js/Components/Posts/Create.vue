<script setup>
import useCategories from '@/composables/categories'
import usePosts from '@/composables/posts'
import { onMounted, reactive } from 'vue'

import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import SelectInput from '@/Components/SelectInput.vue'
import TextInput from '@/Components/TextInput.vue'
import TextareaInput from '@/Components/TextareaInput.vue'

const { categories, getCategories } = useCategories()
const { storePost, validationErrors, isLoading } = usePosts()

const post = reactive({
  title: '',
  content: '',
  category_id: '',
  thumbnail: '',
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

      <InputError class="mt-2" :messages="validationErrors?.title" />
    </div>

    <!-- Content -->
    <div class="mt-4">
      <InputLabel for="post-content" :value="$t('Content')" />

      <TextareaInput
        v-model="post.content"
        id="post-content"
        class="mt-1 block w-full"
      />

      <InputError class="mt-2" :messages="validationErrors?.content" />
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

      <InputError class="mt-2" :messages="validationErrors?.category_id" />
    </div>

    <!-- Thumbnail -->
    <div class="mt-4">
      <InputLabel for="thumbnail" :value="$t('Thumbnail')" />

      <input
        @change="post.thumbnail = $event.target.files[0]"
        type="file"
        id="thumbnail"
        class="mt-1"
      />

      <InputError class="mt-2" :messages="validationErrors?.thumbnail" />
    </div>

    <!-- Buttons -->
    <div class="mt-4">
      <PrimaryButton :disabled="isLoading">
        <span
          v-show="isLoading"
          class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-b-2 border-l-2 border-r-2 border-t-2 border-b-white border-l-blue-600 border-r-white border-t-white"
        ></span>
        <span v-if="isLoading">{{ $t('Processing') }}...</span>
        <span v-else>{{ $t('Save') }}</span>
      </PrimaryButton>
    </div>
  </form>
</template>
