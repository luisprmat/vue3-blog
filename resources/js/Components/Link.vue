<script setup>
import { RouterLink } from 'vue-router'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  ...RouterLink.props,
  inactiveClass: {
    type: String,
  },
})
</script>

<template>
  <RouterLink v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </RouterLink>
</template>
