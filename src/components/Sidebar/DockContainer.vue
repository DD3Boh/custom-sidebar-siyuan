<template>
  <div class="dock-container" :class="{ 'mobile-layout': isMobile }">
    <DockHeader 
      :title="title"
      @add-section="handleAddSection"
      @minimize="handleMinimize"
    />
    <div class="fn__flex-1 custom-dock-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getFrontend } from 'siyuan'
import DockHeader from './DockHeader.vue'

interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Custom Dock'
})

const emit = defineEmits<{
  'add-section': []
  'minimize': []
}>()

const isMobile = computed(() => {
  const frontEnd = getFrontend()
  return frontEnd === "mobile" || frontEnd === "browser-mobile"
})

const handleAddSection = () => {
  emit('add-section')
}

const handleMinimize = () => {
  emit('minimize')
}
</script>

<style scoped>
.dock-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dock-container:not(.mobile-layout) {
}

.custom-dock-content {
  flex: 1;
  overflow-y: auto;
}
</style>
