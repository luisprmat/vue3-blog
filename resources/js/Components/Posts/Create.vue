<script setup>
import { onMounted } from 'vue'
import useCategories from '@/composables/categories'

import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'
import TextareaInput from '@/Components/TextareaInput.vue'
import SelectInput from '@/Components/SelectInput.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'

const { categories, getCategories } = useCategories()

onMounted(getCategories)
</script>

<template>
  <form>
    <!-- Title -->
    <div>
      <InputLabel for="post-title" :value="$t('Title')" />

      <TextInput id="post-title" class="mt-1 block w-full" autofocus />
    </div>

    <!-- Content -->
    <div class="mt-4">
      <InputLabel for="post-content" :value="$t('Content')" />

      <TextareaInput id="post-content" class="mt-1 block w-full" />
    </div>

    <!-- Category -->
    <div class="mt-4">
      <InputLabel for="post-category" :value="$t('Category')" />

      <SelectInput id="post-category" class="mt-1 block w-full">
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
