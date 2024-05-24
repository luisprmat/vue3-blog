<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  classes: {
    type: String,
  },
})
</script>

<template>
  <a :href="href" :class="classes">
    <slot />
  </a>
</template>
