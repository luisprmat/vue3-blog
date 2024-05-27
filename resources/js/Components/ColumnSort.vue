<script setup>
import { computed } from 'vue'

const props = defineProps({
  column: {
    type: String,
    required: true,
  },
  activeClasses: {
    type: String,
  },
})

const sort = defineModel({
  type: String,
  required: true,
})

const orderColumn = computed(() =>
  sort.value[0] === '-' ? sort.value.slice(1) : sort.value
)
const orderDirection = computed(() => (sort.value[0] === '-' ? 'desc' : 'asc'))

const selectedColumnClasses = computed(() =>
  orderColumn.value === props.column ? props.activeClasses : ''
)

const ascendingClasses = computed(() => [
  orderDirection.value === 'asc' && orderColumn.value === props.column
    ? props.activeClasses
    : '',
  orderDirection.value !== '' &&
  orderDirection.value !== 'asc' &&
  orderColumn.value === props.column
    ? 'hidden'
    : '',
])

const descendingClasses = computed(() => [
  orderDirection.value === 'desc' && orderColumn.value === props.column
    ? props.activeClasses
    : '',
  orderDirection.value !== '' &&
  orderDirection.value !== 'desc' &&
  orderColumn.value === props.column
    ? 'hidden'
    : '',
])

const updateOrdering = (sortColumn) => {
  if (orderColumn.value === sortColumn) {
    sort.value = sort.value === sortColumn ? '-' + sortColumn : sortColumn
  } else {
    sort.value = sortColumn
  }
}
</script>

<template>
  <div
    class="flex cursor-pointer flex-row items-center justify-between text-sm font-medium uppercase leading-4 tracking-wider text-gray-500 dark:text-gray-400"
    @click="updateOrdering(column)"
  >
    <div :class="selectedColumnClasses">
      <slot />
    </div>
    <div class="select-none">
      <span :class="ascendingClasses">&uarr;</span>
      <span :class="descendingClasses">&darr;</span>
    </div>
  </div>
</template>
