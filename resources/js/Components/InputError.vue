<script setup>
defineProps({
  messages: {
    type: Array,
  },
})
</script>

<template>
  <div v-show="messages">
    <div
      v-for="message in messages"
      class="text-sm text-red-600 dark:text-red-400"
    >
      {{ message }}
    </div>
  </div>
</template>
