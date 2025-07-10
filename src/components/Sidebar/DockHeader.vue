<template>
  <div class="dock-header">
    <!-- Mobile layout -->
    <div v-if="isMobile" class="toolbar toolbar--border toolbar--dark">
      <svg class="toolbar__icon">
        <use xlink:href="#iconDock"></use>
      </svg>
      <div class="toolbar__text">{{ title }}</div>
      <span class="fn__flex-1"></span>
      <span 
        data-type="add-section" 
        class="toolbar__icon b3-tooltips b3-tooltips__sw" 
        aria-label="Add new section"
        @click="$emit('add-section')"
      >
        <svg class="toolbar__icon">
          <use xlink:href="#iconAdd"></use>
        </svg>
      </span>
      <span 
        data-type="min" 
        class="toolbar__icon b3-tooltips b3-tooltips__sw" 
        aria-label="Min Ctrl+W"
        @click="$emit('minimize')"
      >
        <svg class="toolbar__icon">
          <use xlink:href="#iconMin"></use>
        </svg>
      </span>
    </div>
    
    <!-- Desktop layout -->
    <div v-else class="block__icons">
      <div class="block__logo">
        <svg class="block__logoicon">
          <use xlink:href="#iconDock"></use>
        </svg>
        {{ title }}
      </div>
      <span class="fn__flex-1 fn__space"></span>
      <span 
        data-type="add-section" 
        class="block__icon b3-tooltips b3-tooltips__sw" 
        aria-label="Add new section"
        @click="$emit('add-section')"
      >
        <svg class="block__logoicon">
          <use xlink:href="#iconAdd"></use>
        </svg>
      </span>
      <span 
        data-type="min" 
        class="block__icon b3-tooltips b3-tooltips__sw" 
        aria-label="Min Ctrl+W"
        @click="$emit('minimize')"
      >
        <svg class="block__logoicon">
          <use xlink:href="#iconMin"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getFrontend } from 'siyuan'

interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Sidebar'
})

defineEmits<{
  'add-section': []
  'minimize': []
}>()

const isMobile = computed(() => {
  const frontEnd = getFrontend()
  return frontEnd === "mobile" || frontEnd === "browser-mobile"
})
</script>

<style scoped>
.dock-header {
  /* Inherit existing styles from SiYuan theme */
}

/* Ensure mobile toolbar buttons are properly styled */
.toolbar {
  display: flex;
  align-items: center;
  padding: 8px;
}

.toolbar__text {
  flex: 1;
  margin: 0 8px;
}

.toolbar__icon {
  cursor: pointer;
  padding: 4px;
  margin: 0 2px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.toolbar__icon:hover {
  background-color: var(--b3-theme-surface-lighter);
}

.fn__flex-1 {
  flex: 1;
}
</style>
