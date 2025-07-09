<template>
  <div class="enIconContainer">
    <svg
      :style="{
        fontSize: sizeWithUnit,
        width: sizeWithUnit,
        height: sizeWithUnit,
        color: disabled ? 'var(--b3-empty-color)' : undefined,
      }"
      class="enSyIcon"
    >
      <use :xlink:href="`#${name}`"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: String,
  size: {
    type: [Number, String],
    default: 12,
  },
  disabled: Boolean,
})

const sizeWithUnit = computed(() => {
  if (typeof props.size === 'string') {
    return props.size
  }
  return `${props.size}px`
})
</script>

<style lang="scss" scoped>
.enIconContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
