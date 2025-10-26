<template>
  <div class="dock-container" :class="{ 'mobile-layout': isMobile }">
    <DockHeader 
      :title="actualTitle"
      @add-section="handleAddSection"
      @minimize="handleMinimize"
      @refresh="handleRefresh"
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
import { useI18n } from '@/utils/i18n'
import { rebuildDataIndex } from '@/api'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Sidebar'
})

const { i18n } = useI18n()

// Use reactive title that falls back to i18n if no title provided
const actualTitle = computed(() => props.title === 'Sidebar' ? i18n('sidebar') : props.title)

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

const handleRefresh = () => {
  rebuildDataIndex()
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
