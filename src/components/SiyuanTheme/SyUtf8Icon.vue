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
  
  // If it's already a valid UTF8 character, return it directly
  if (props.utf8Code.length === 1) {
    return props.utf8Code
  }
  
  // If it's a unicode code point (like "1f4c4"), convert it to character
  if (/^[0-9a-fA-F]+$/.test(props.utf8Code)) {
    try {
      const codePoint = parseInt(props.utf8Code, 16)
      return String.fromCodePoint(codePoint)
    } catch (e) {
      console.warn('Invalid UTF8 code:', props.utf8Code)
      return ''
    }
  }
  
  // If it's already a character or emoji, return as is
  return props.utf8Code
})
</script>

<style scoped>
.sy-utf8-icon {
  user-select: none;
  flex-shrink: 0;
}
</style>
