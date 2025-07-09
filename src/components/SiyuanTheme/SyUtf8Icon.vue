<template>
  <span 
    v-if="utf8Code"
    :style="{
      fontSize: size + 'px',
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }"
    class="sy-utf8-icon"
  >
    {{ utf8Icon }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  utf8Code?: string;
  size?: number;
}>()

const utf8Icon = computed(() => {
  if (!props.utf8Code) return ''

  return String.fromCodePoint(...props.utf8Code.split('-').map(p => parseInt(p, 16)));
})
</script>

<style scoped>
.sy-utf8-icon {
  user-select: none;
  flex-shrink: 0;
}
</style>
